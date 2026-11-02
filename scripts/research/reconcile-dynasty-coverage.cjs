#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- Node.js CommonJS CLI (.cjs). */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const ts = require("typescript");

const ASSESSMENTS = new Set(["covered", "corrected", "partial", "uncertain", "not-covered", "not-needed"]);
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const keyOf = (file, paragraph) => `${file}#${paragraph}`;
const countBy = (values, key) => values.reduce((out, value) => {
  const item = key(value);
  out[item] = (out[item] || 0) + 1;
  return out;
}, {});
const slash = value => value.replace(/\\/g, "/");

function parseTranscript(text) {
  const anchors = [...text.matchAll(/<a id="(P\d+)"><\/a>/g)];
  const lineAt = offset => text.slice(0, offset).split("\n").length;
  return anchors.map((anchor, index) => {
    const start = anchor.index + anchor[0].length;
    let chunk = text.slice(start, anchors[index + 1]?.index ?? text.length);
    // The last paragraph ends before the editorial tables, not at the end of the file.
    const footer = chunk.search(/^(?:---[ \t]*\r?$|##[ \t]+)/m);
    if (footer >= 0) chunk = chunk.slice(0, footer);
    const body = chunk.replace(/<!--[\s\S]*?-->/g, "").trim();
    const positions = chunk.replace(/<!--[\s\S]*?-->/g, comment => comment.replace(/[^\n]/g, " "));
    const first = positions.search(/\S/);
    const last = positions.search(/\s*$/);
    const bodyStartLine = first < 0 ? null : lineAt(start + first);
    const bodyEndLine = first < 0 ? null : lineAt(start + last - 1);
    const rawChars = chunk.match(/<!--\s*RAW_CHARS:\s*(\d+):(\d+)\s*-->/);
    return {
      paragraph: anchor[1], text: body, sha256: sha256(body), anchorLine: lineAt(anchor.index),
      bodyStartLine, bodyEndLine, bodyLineCount: first < 0 ? 0 : bodyEndLine - bodyStartLine + 1,
      rawChars: rawChars ? { start: +rawChars[1], end: +rawChars[2] } : null,
    };
  });
}

function mergeAssessments(records) {
  if (!records.length) return { status: "baseline-only", adopted: false, fullReview: false, unresolved: false };
  const needed = records.filter(r => r.assessment !== "not-needed");
  if (!needed.length) return { status: "review-not-needed", adopted: false, fullReview: false, unresolved: false };
  const full = needed.filter(r => ["covered", "corrected"].includes(r.assessment) && r.mappingValid);
  const unresolved = needed.some(r => !["covered", "corrected"].includes(r.assessment) || !r.mappingValid);
  const adopted = needed.some(r => ["covered", "corrected", "partial"].includes(r.assessment) && r.mappingValid);
  if (full.length && unresolved) return { status: "review-mixed", adopted, fullReview: false, unresolved: true };
  if (full.length) return {
    status: full.some(r => r.assessment === "corrected") ? "review-corrected" : "review-covered",
    adopted: true, fullReview: true, unresolved: false,
  };
  if (needed.some(r => r.assessment === "partial" && r.mappingValid)) {
    return { status: "review-partial", adopted, fullReview: false, unresolved: true };
  }
  if (needed.some(r => ["covered", "corrected", "partial"].includes(r.assessment) && !r.mappingValid)) {
    return { status: "review-invalid-mapping", adopted: false, fullReview: false, unresolved: true };
  }
  return {
    status: needed.some(r => r.assessment === "uncertain") ? "review-uncertain" : "review-not-covered",
    adopted: false, fullReview: false, unresolved: true,
  };
}

// Read only literal data and local named imports; never execute the application's modules.
function createLiteralReader() {
  const cache = new Map();
  const origins = new WeakMap();
  function read(file) {
    file = path.resolve(file);
    if (cache.has(file)) return cache.get(file);
    const text = fs.readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const declarations = new Map();
    const imports = new Map();
    const values = new Map();
    const result = { text, source, sections: new Map(), get };
    cache.set(file, result);
    for (const statement of source.statements) {
      if (ts.isImportDeclaration(statement) && statement.importClause && !statement.importClause.isTypeOnly) {
        const specifier = statement.moduleSpecifier.text;
        const bindings = statement.importClause.namedBindings;
        if (!specifier.startsWith(".") || !bindings || !ts.isNamedImports(bindings)) {
          throw new Error(`Unsupported data import: ${file}: ${specifier}`);
        }
        for (const element of bindings.elements) imports.set(element.name.text, {
          file: path.resolve(path.dirname(file), `${specifier}.ts`),
          name: element.propertyName?.text ?? element.name.text,
        });
      }
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) declarations.set(declaration.name.text, declaration.initializer);
        }
      }
    }
    function get(name) {
      if (values.has(name)) return values.get(name);
      const dependency = imports.get(name);
      if (dependency) return read(dependency.file).get(dependency.name);
      if (!declarations.has(name)) throw new Error(`Unknown data identifier: ${file}: ${name}`);
      const value = evaluate(declarations.get(name));
      values.set(name, value);
      if (value && typeof value === "object") origins.set(value, { file, exportName: name });
      return value;
    }
    function evaluate(node) {
      if (!node) throw new Error(`Missing literal initializer: ${file}`);
      if (ts.isStringLiteralLike(node)) return node.text;
      if (ts.isNumericLiteral(node)) return +node.text;
      if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
      if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
      if (node.kind === ts.SyntaxKind.NullKeyword) return null;
      if (ts.isIdentifier(node)) return get(node.text);
      if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) return evaluate(node.expression);
      if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) return -evaluate(node.operand);
      if (ts.isArrayLiteralExpression(node)) return node.elements.flatMap(item =>
        ts.isSpreadElement(item) ? evaluate(item.expression) : [evaluate(item)]);
      if (ts.isObjectLiteralExpression(node)) {
        const value = {};
        for (const property of node.properties) {
          if (ts.isSpreadAssignment(property)) Object.assign(value, evaluate(property.expression));
          else if (ts.isPropertyAssignment(property)) value[property.name.text] = evaluate(property.initializer);
          else if (ts.isShorthandPropertyAssignment(property)) value[property.name.text] = get(property.name.text);
          else throw new Error(`Unsupported object property: ${file}`);
        }
        if (typeof value.id === "string" && Array.isArray(value.paragraphs) && Array.isArray(value.transcripts)) {
          result.sections.set(value.id, {
            start: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
            end: source.getLineAndCharacterOfPosition(node.end).line + 1,
          });
        }
        return value;
      }
      throw new Error(`Unsupported data expression: ${file}: ${ts.SyntaxKind[node.kind]}`);
    }
    return result;
  }
  read.originOf = value => origins.get(value);
  read.snapshots = () => [...cache].map(([file, data]) => ({ file, sha256: sha256(data.text) }));
  return read;
}

function audit(options = {}) {
  const repo = path.resolve(options.repo ?? path.join(__dirname, "../.."));
  const sourceDir = path.resolve(options.sourceDir ?? "D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty");
  const researchDir = path.join(repo, "docs/research/dynasty-narratives");
  const baselinePath = path.join(researchDir, "baseline.json");
  const indexPath = path.join(repo, "data/narratives/index.ts");
  const baselineBytes = fs.readFileSync(baselinePath);
  const baseline = JSON.parse(baselineBytes.toString("utf8"));
  const indexBefore = sha256(fs.readFileSync(indexPath));
  const issues = [];
  const issue = (code, detail, severity = "error") => issues.push({ code, severity, ...detail });
  const rows = baseline.rows.map(row => ({
    file: row.file, paragraph: row.paragraph, baselineVerdict: row.verdict,
    baseline: { ...row }, current: null, bodyMappings: [], reviewRecords: [], latestReviewRecordIds: [],
  }));
  const rowsByKey = new Map();
  for (const row of rows) {
    const key = keyOf(row.file, row.paragraph);
    if (rowsByKey.has(key)) issue("duplicate-baseline-row", { file: row.file, paragraph: row.paragraph });
    rowsByKey.set(key, row);
  }
  const files = baseline.files.map(file => {
    const sourcePath = path.join(sourceDir, file.file);
    const bytes = fs.readFileSync(sourcePath);
    const text = bytes.toString("utf8");
    const paragraphs = parseTranscript(text);
    const currentSha256 = sha256(bytes);
    const metadata = {
      baseline: { ...file }, currentSha256, fileHashMatches: currentSha256 === file.sha256,
      currentParagraphCount: paragraphs.length, paragraphCountMatches: paragraphs.length === file.paragraphs,
      currentLineCount: text.split("\n").length - (text.endsWith("\n") ? 1 : 0),
      paragraphHashMismatches: [], missingBaselineParagraphs: [], extraCurrentParagraphs: [],
    };
    if (!metadata.fileHashMatches) issue("file-hash-mismatch", { file: file.file, expected: file.sha256, actual: currentSha256 });
    if (!metadata.paragraphCountMatches) issue("paragraph-count-mismatch", { file: file.file, expected: file.paragraphs, actual: paragraphs.length });
    const seen = new Set();
    for (const paragraph of paragraphs) {
      if (seen.has(paragraph.paragraph)) issue("duplicate-current-anchor", { file: file.file, paragraph: paragraph.paragraph });
      seen.add(paragraph.paragraph);
      const row = rowsByKey.get(keyOf(file.file, paragraph.paragraph));
      if (!row) {
        metadata.extraCurrentParagraphs.push(paragraph.paragraph);
        issue("extra-current-paragraph", { file: file.file, paragraph: paragraph.paragraph });
        continue;
      }
      const { text: omittedText, ...current } = paragraph;
      void omittedText;
      row.current = { ...current, hashMatches: paragraph.sha256 === row.baseline.sha256 };
      if (!row.current.hashMatches) {
        metadata.paragraphHashMismatches.push(paragraph.paragraph);
        issue("paragraph-hash-mismatch", { file: file.file, paragraph: paragraph.paragraph, expected: row.baseline.sha256, actual: paragraph.sha256 });
      }
    }
    for (const row of rows.filter(row => row.file === file.file)) {
      if (!row.current) {
        metadata.missingBaselineParagraphs.push(row.paragraph);
        issue("missing-current-paragraph", { file: file.file, paragraph: row.paragraph });
      }
    }
    return metadata;
  });

  const read = createLiteralReader();
  const index = read(indexPath);
  const registered = index.get("narratives");
  const stories = [];
  const storyBySlug = new Map();
  for (const narrative of registered) {
    if (storyBySlug.has(narrative.slug)) issue("duplicate-registered-slug", { storySlug: narrative.slug });
    const origin = read.originOf(narrative);
    if (!origin) throw new Error(`Missing registered story origin: ${narrative.slug}`);
    const filename = origin.file;
    const data = read(filename);
    const story = {
      slug: narrative.slug, seriesId: narrative.seriesId, title: narrative.title,
      exportName: origin.exportName,
      file: slash(path.relative(repo, filename)), sha256: sha256(data.text),
      sections: narrative.sections.map(section => ({
        id: section.id, title: section.title, lines: data.sections.get(section.id),
        hasBody: section.paragraphs.some(value => typeof value === "string" && value.trim().length > 0),
        bodySha256: sha256(JSON.stringify({ paragraphs: section.paragraphs, poem: section.poem ?? null })),
        transcripts: section.transcripts,
      })),
      reviewFiles: [], reviewRecordCount: 0, latestReviewRecordCount: 0, unreviewedBodyMappingCount: 0,
    };
    stories.push(story);
    storyBySlug.set(story.slug, story);
    const ids = new Set();
    for (const section of story.sections) {
      if (ids.has(section.id)) issue("duplicate-section-id", { storySlug: story.slug, sectionId: section.id });
      ids.add(section.id);
      for (const range of section.transcripts) {
        if (!Number.isInteger(range.start) || !Number.isInteger(range.end) || range.start < 1 || range.end < range.start) {
          issue("invalid-body-range", { storySlug: story.slug, sectionId: section.id, range });
          continue;
        }
        for (let p = range.start; p <= range.end; p++) {
          const paragraph = `P${String(p).padStart(3, "0")}`;
          const row = rowsByKey.get(keyOf(range.file, paragraph));
          if (!row) {
            issue("body-reference-outside-baseline", { storySlug: story.slug, sectionId: section.id, file: range.file, paragraph });
            continue;
          }
          row.bodyMappings.push({
            storySlug: story.slug, storyFile: story.file, sectionId: section.id,
            sectionLines: section.lines, bodySha256: section.bodySha256, transcriptRange: { ...range },
            hasBody: section.hasBody,
          });
        }
      }
    }
  }

  const reviewFiles = [];
  const excludedReviewRecords = [];
  const unknownReviewRecords = [];
  for (const filename of fs.readdirSync(researchDir).filter(name => name.endsWith("-review.json")).sort()) {
    const bytes = fs.readFileSync(path.join(researchDir, filename));
    const ledger = JSON.parse(bytes.toString("utf8"));
    if (!Array.isArray(ledger.rows)) {
      issue("review-missing-rows", { reviewFile: filename });
      continue;
    }
    let registeredCount = 0;
    ledger.rows.forEach((original, rowIndex) => {
      const story = storyBySlug.get(original.storySlug);
      const recordId = `${filename}#rows[${rowIndex}]`;
      if (!story) {
        excludedReviewRecords.push({ recordId, reason: "story-not-registered", record: original });
        return;
      }
      registeredCount++;
      const row = rowsByKey.get(keyOf(original.file, original.paragraph));
      if (!row) {
        unknownReviewRecords.push({ recordId, record: original });
        issue("review-reference-outside-baseline", { recordId, storySlug: original.storySlug, file: original.file, paragraph: original.paragraph });
        return;
      }
      const validAssessment = ASSESSMENTS.has(original.assessment);
      if (!validAssessment) issue("unknown-assessment", { recordId, assessment: original.assessment });
      const mappings = (original.sectionIds ?? []).map(sectionId => {
        const section = story.sections.find(section => section.id === sectionId);
        const bodyMappingIndexes = row.bodyMappings.flatMap((mapping, index) =>
          mapping.storySlug === story.slug && mapping.sectionId === sectionId ? [index] : []);
        return { sectionId, sectionExists: !!section, hasBody: !!section?.hasBody, bodyMappingIndexes, valid: !!section?.hasBody && bodyMappingIndexes.length > 0 };
      });
      const needsMapping = !["not-needed", "not-covered"].includes(original.assessment);
      const mappingValid = !needsMapping || (mappings.length > 0 && mappings.every(mapping => mapping.valid));
      const candidateOnly = original.assessment === "uncertain" && mappings.length === 0;
      if (needsMapping && !mappingValid) issue(candidateOnly ? "uncertain-candidate-without-body-anchor" : "review-missing-exact-body-anchor", {
        recordId, storySlug: story.slug, file: original.file, paragraph: original.paragraph,
        assessment: original.assessment, sectionIds: original.sectionIds ?? [], invalidSectionIds: mappings.filter(mapping => !mapping.valid).map(mapping => mapping.sectionId),
      }, candidateOnly ? "warning" : "error");
      if (original.baselineVerdict !== row.baselineVerdict) issue("review-baseline-verdict-differs", {
        recordId, originalBaselineVerdict: row.baselineVerdict, statedBaselineVerdict: original.baselineVerdict,
      }, "warning");
      row.reviewRecords.push({
        recordId, reviewFile: filename, reviewDate: ledger.date ?? null, rowIndex,
        canonical: filename === `${story.slug}-review.json` || filename === `${path.basename(story.file, ".ts")}-review.json`, latest: false,
        record: { ...original }, validAssessment, mappingValid, candidateOnly, mappings,
      });
      story.reviewRecordCount++;
      if (!story.reviewFiles.includes(filename)) story.reviewFiles.push(filename);
    });
    reviewFiles.push({ file: filename, sha256: sha256(bytes), date: ledger.date ?? null,
      method: ledger.method ?? null, independentReview: ledger.independentReview ?? null, audioReviewed: ledger.audioReviewed === true,
      declaredCounts: ledger.counts ?? null, totalRows: ledger.rows.length, registeredRows: registeredCount });
  }

  for (const row of rows) {
    const groups = new Map();
    for (const record of row.reviewRecords) {
      const slug = record.record.storySlug;
      if (!groups.has(slug)) groups.set(slug, []);
      groups.get(slug).push(record);
    }
    for (const group of groups.values()) {
      group.sort((a, b) => Number(b.canonical) - Number(a.canonical) || String(b.reviewDate).localeCompare(String(a.reviewDate)) || b.rowIndex - a.rowIndex);
      const best = group[0];
      // Same-day ledgers without an authoritative canonical file remain separate evidence.
      const chosen = group.filter(record => record.canonical === best.canonical && record.reviewDate === best.reviewDate &&
        (record.reviewFile !== best.reviewFile || record.rowIndex === best.rowIndex));
      for (const record of chosen) {
        record.latest = true;
        row.latestReviewRecordIds.push(record.recordId);
        storyBySlug.get(record.record.storySlug).latestReviewRecordCount++;
      }
    }
    const latest = row.reviewRecords.filter(record => record.latest);
    row.merged = mergeAssessments(latest.map(record => ({
      assessment: record.record.assessment,
      mappingValid: record.mappingValid && record.validAssessment && row.current?.hashMatches === true,
    })));
    row.baselineOnly = latest.length === 0;
    row.baselineCoveredWithoutAdditionalReview = row.baselineOnly && row.baselineVerdict === "covered";
    row.latestAssessments = [...new Set(latest.map(record => record.record.assessment))].sort();
    row.hasUncertainReview = latest.some(record => record.record.assessment === "uncertain");
    row.unreviewedBodyMappingIndexes = row.bodyMappings.flatMap((mapping, index) =>
      latest.some(record => record.record.storySlug === mapping.storySlug && record.record.sectionIds?.includes(mapping.sectionId)) ? [] : [index]);
    for (const index of row.unreviewedBodyMappingIndexes) storyBySlug.get(row.bodyMappings[index].storySlug).unreviewedBodyMappingCount++;
  }
  const reviewRecordsById = new Map(rows.flatMap(row => row.reviewRecords.map(record => [record.recordId, record])));
  for (const item of issues) {
    const record = reviewRecordsById.get(item.recordId);
    if (record && !record.latest) {
      item.appliesTo = "historical-record";
      item.severity = "warning";
    } else if (record) item.appliesTo = "latest-record";
  }
  for (const story of stories) {
    if (!story.reviewRecordCount) issue("registered-story-missing-review", { storySlug: story.slug, file: story.file });
  }
  const literalSnapshots = read.snapshots().map(snapshot => ({ ...snapshot, file: slash(path.relative(repo, snapshot.file)) }));
  for (const snapshot of literalSnapshots) {
    if (sha256(fs.readFileSync(path.join(repo, snapshot.file))) !== snapshot.sha256) {
      issue("literal-input-changed-during-audit", { file: snapshot.file });
    }
  }
  for (const ledger of reviewFiles) {
    if (sha256(fs.readFileSync(path.join(researchDir, ledger.file))) !== ledger.sha256) {
      issue("review-changed-during-audit", { reviewFile: ledger.file });
    }
  }
  for (const file of files) {
    if (sha256(fs.readFileSync(path.join(sourceDir, file.baseline.file))) !== file.currentSha256) {
      issue("transcript-changed-during-audit", { file: file.baseline.file });
    }
  }
  const unchangedBaseline = sha256(fs.readFileSync(baselinePath)) === sha256(baselineBytes);
  const unchangedIndex = sha256(fs.readFileSync(indexPath)) === indexBefore;
  if (!unchangedBaseline) issue("baseline-changed-during-audit", {});
  if (!unchangedIndex) issue("index-changed-during-audit", {});
  if (options.expectedStories != null && stories.length !== options.expectedStories) issue("registered-count-differs-from-requested", {
    expected: options.expectedStories, actual: stories.length,
  });
  const latest = rows.flatMap(row => row.reviewRecords.filter(record => record.latest));
  const summary = {
    baselineFiles: baseline.files.length, baselineParagraphs: rows.length, registeredStories: stories.length,
    registeredReviewFiles: reviewFiles.filter(file => file.registeredRows > 0).length,
    allRegisteredReviewRecords: rows.reduce((n, row) => n + row.reviewRecords.length, 0),
    latestRegisteredReviewRecords: latest.length,
    reviewedUniqueParagraphs: rows.filter(row => row.latestReviewRecordIds.length).length,
    originalBaselineCounts: countBy(rows, row => row.baselineVerdict),
    latestReviewRecordCounts: countBy(latest, record => record.record.assessment),
    mergedParagraphCounts: countBy(rows, row => row.merged.status),
    baselineOnlyCounts: countBy(rows.filter(row => row.baselineOnly), row => row.baselineVerdict),
    baselineCoveredWithoutAdditionalReview: rows.filter(row => row.baselineCoveredWithoutAdditionalReview).length,
    adoptedByAdditionalReview: rows.filter(row => row.merged.adopted).length,
    fullyReviewedWithoutCompetingUnresolvedRecords: rows.filter(row => row.merged.fullReview).length,
    paragraphsWithLatestUncertain: rows.filter(row => row.hasUncertainReview).length,
    uncertainCandidateRecordsWithoutBodyAnchor: latest.filter(record => record.candidateOnly).length,
    paragraphsWithBodyMappingButNoReview: rows.filter(row => row.bodyMappings.length && !row.latestReviewRecordIds.length).length,
    unreviewedBodyMappingPairs: rows.reduce((n, row) => n + row.unreviewedBodyMappingIndexes.length, 0),
    excludedUnregisteredReviewRecords: excludedReviewRecords.length,
    fileHashMismatches: files.filter(file => !file.fileHashMatches).length,
    paragraphHashMismatches: files.reduce((n, file) => n + file.paragraphHashMismatches.length, 0),
    issuesByCode: countBy(issues, issue => issue.code),
    errors: issues.filter(issue => issue.severity === "error").length, warnings: issues.filter(issue => issue.severity === "warning").length,
  };
  return {
    schemaVersion: 1, date: options.date ?? "2026-10-11", generatedAt: new Date().toISOString(),
    phase: options.phase ?? "provisional", scope: "登记审计；复用已完成的语义复核记录，不声称重新读完6926段语义或回听音频。",
    sourceDir: slash(sourceDir),
    baselineSnapshot: { file: slash(path.relative(repo, baselinePath)), sha256: sha256(baselineBytes), unchangedDuringAudit: unchangedBaseline,
      date: baseline.date, auditDate: baseline.auditDate, auditSha256: baseline.auditSha256, note: baseline.note },
    registrationSnapshot: { file: "data/narratives/index.ts", sha256: indexBefore, unchangedDuringAudit: unchangedIndex, literalInputs: literalSnapshots },
    rules: [
      "原baseline每个文件sha、每段sha、verdict原样保留，不修改baseline；当前每段去HTML注释并trim后hash，对应既有基线算法。",
      "只加载index narratives数组中的字面量故事；未注册或被替代草稿的review记录保留在excluded，不计覆盖。",
      "同story/file/P以同名canonical *-review.json为当前权威；无canonical时采用较新date，同日不同ledger保留并列；旧行不删除。",
      "covered/corrected/partial需非空sectionIds、实际正文、该节transcripts包含精确file/P。uncertain若列sectionId也须有精确锚；未落正文的空sectionIds候选单列警示，不算采用。链接或引用范围本身不等于语义采用。",
      "多个partial不升级；covered/corrected若与未解记录并存列mixed；not-needed不算采用；uncertain与其记录始终保留。",
      "原基线covered但无追加review单列，既不降为未使用，也不冒充本轮故事覆盖。",
      "bodyMapping表示结构引用，adopted只取合格covered/corrected/partial审查；fullReview不等于所有史实无争议。",
      "reviewRecords中的bodyMappingIndexes与unreviewedBodyMappingIndexes均指向本行bodyMappings数组，精确正文行号和transcripts范围不重复存储；ledger级元数据集中于reviewFiles。",
      "当前lineCount/正文起止行号供回查；baseline没有行号字段，不能声称与历史行数逐值比较。",
    ],
    summary, files, stories, reviewFiles, issues, excludedReviewRecords, unknownReviewRecords, rows,
  };
}

function renderMarkdown(report) {
  const s = report.summary;
  const table = (values, columns) => [
    `| ${columns.map(column => column[0]).join(" | ")} |`,
    `| ${columns.map(() => "---").join(" | ")} |`,
    ...values.map(value => `| ${columns.map(column => String(column[1](value)).replace(/\|/g, "\\|")).join(" | ")} |`),
  ].join("\n");
  const statuses = Object.entries(s.mergedParagraphCounts).map(([status, count]) => ({ status, count }));
  return [
    `# 朝代篇覆盖登记审计 ${report.date}`, "",
    `状态：${report.phase}；注册快照 ${s.registeredStories} 篇。基线 ${s.baselineFiles} 稿、${s.baselineParagraphs} 段。`, "",
    report.scope, "",
    `原文件SHA差异 ${s.fileHashMismatches}，逐段SHA差异 ${s.paragraphHashMismatches}。基线在运行中保持不变：${report.baselineSnapshot.unchangedDuringAudit}。当前文件行数与每段行号完整保存于同名JSON。`, "",
    "## 合并规则", "", ...report.rules.map(rule => `- ${rule}`), "",
    "## 段落结果", "", table(statuses, [["登记状态", item => item.status], ["唯一原段", item => item.count]]), "",
    `追加审查涉及 ${s.reviewedUniqueParagraphs} 个唯一原段，${s.latestRegisteredReviewRecords} 条当前记录（全部历史及当前注册记录 ${s.allRegisteredReviewRecords} 条）。追加实质或部分采用 ${s.adoptedByAdditionalReview} 段；没有竞争性未解记录的完整/校正承接 ${s.fullyReviewedWithoutCompetingUnresolvedRecords} 段。`, "",
    `仅保留原基线covered、没有追加review的 ${s.baselineCoveredWithoutAdditionalReview} 段单列。仍含当前uncertain的 ${s.paragraphsWithLatestUncertain} 段。not-needed不计采用，mixed与partial不计完整。`, "",
    `其中 ${s.uncertainCandidateRecordsWithoutBodyAnchor} 条uncertain记录没有声明正文落点，保留为候选警示；没有虚补引用，也没有算作已采用。`, "",
    `仅有正文范围引用却没有任何审查记录的 ${s.paragraphsWithBodyMappingButNoReview} 段；未获对应section审查的引用对 ${s.unreviewedBodyMappingPairs}。这些范围不自动证明采用。排除未注册草稿审查 ${s.excludedUnregisteredReviewRecords} 条。`, "",
    "## 核验问题", "", `错误 ${s.errors}，警示 ${s.warnings}。完整定位和原记录见JSON的issues与rows。`, "",
    table(Object.entries(s.issuesByCode), [["类型", item => item[0]], ["条数", item => item[1]]]), "",
    "## 原稿逐文件", "",
    table(report.files, [["文件", item => item.baseline.file], ["当前行数", item => item.currentLineCount],
      ["段数", item => item.currentParagraphCount], ["文件SHA一致", item => item.fileHashMatches], ["段SHA差异", item => item.paragraphHashMismatches.length]]), "",
    "## 注册故事的登记缺口", "",
    table(report.stories.filter(story => !story.reviewRecordCount || story.unreviewedBodyMappingCount),
      [["故事", item => item.slug], ["审查记录", item => item.reviewRecordCount], ["未获对应审查的引用对", item => item.unreviewedBodyMappingCount]]), "",
    "## 重跑", "", "```powershell", "node scripts/research/reconcile-dynasty-coverage.cjs --phase provisional",
    "node scripts/research/reconcile-dynasty-coverage.cjs --phase final --expected-stories 244", "```", "",
    "脚本仅写同名JSON/Markdown审计报告；不改原稿、基线、正文或注册目录。默认原稿目录可用--source-dir替换。非零退出表示登记/指纹错误或注册快照在运行中变化，应先检查报告，不把失败称为完成。", "",
  ].join("\n");
}

function main() {
  const options = {};
  for (let i = 2; i < process.argv.length; i += 2) {
    const flag = process.argv[i];
    const value = process.argv[i + 1];
    const names = { "--repo": "repo", "--source-dir": "sourceDir", "--phase": "phase", "--date": "date", "--expected-stories": "expectedStories" };
    if (!names[flag] || value == null) throw new Error(`Unknown or missing argument: ${flag}`);
    options[names[flag]] = flag === "--expected-stories" ? Number(value) : value;
  }
  if (options.phase && !["provisional", "final"].includes(options.phase)) throw new Error("--phase must be provisional or final");
  if (options.date && !/^\d{4}-\d{2}-\d{2}$/.test(options.date)) throw new Error("--date must be YYYY-MM-DD");
  if (options.expectedStories != null && (!Number.isInteger(options.expectedStories) || options.expectedStories < 1)) {
    throw new Error("--expected-stories must be a positive integer");
  }
  const report = audit(options);
  const repo = path.resolve(options.repo ?? path.join(__dirname, "../.."));
  const stem = path.join(repo, "docs/research/dynasty-narratives", `coverage-reconciliation-${report.date}`);
  fs.writeFileSync(`${stem}.json`, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(`${stem}.md`, renderMarkdown(report));
  console.log(JSON.stringify({ phase: report.phase, ...report.summary }, null, 2));
  if (report.summary.errors) process.exitCode = 1;
}

module.exports = { parseTranscript, mergeAssessments, createLiteralReader, audit, renderMarkdown };
if (require.main === module) main();
