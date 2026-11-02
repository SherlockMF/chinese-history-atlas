import { readFile, mkdir, copyFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const destination = resolve(root, "public/history-field/li-jingxun");
const manifest = JSON.parse(await readFile(resolve(destination, "field-build-manifest.json"), "utf8"));
const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/import-field-build.mjs <Game game/Builds/WebGL directory>");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

// Validate every source and existing destination before copying any asset.
for (const file of manifest.files) {
  if (!/^Build\/[\w.-]+$/.test(file.path)) throw new Error("Unexpected manifest path");
  const bytes = await readFile(resolve(source, file.path));
  if (bytes.length !== file.bytes || hash(bytes) !== file.sha256) throw new Error(`Source mismatch: ${file.path}`);
  const target = resolve(destination, file.path);
  let exists = true;
  try { await access(target); } catch (error) { if (error.code === "ENOENT") exists = false; else throw error; }
  if (exists && hash(await readFile(target)) !== file.sha256) throw new Error(`Refusing to overwrite a different build: ${target}`);
}
for (const file of manifest.files) {
  const target = resolve(destination, file.path);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(resolve(source, file.path), target);
}
console.log(`Verified and imported ${manifest.files.length} files, build ${manifest.buildVersion}`);
