// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { portraits } from "@/data/portraits";
import { people } from "@/data/seed";

describe("published portrait assets", () => {
  it("ships a distinct portrait for every published person across all series", () => {
    expect(Object.keys(portraits).sort()).toEqual(people.map((person) => person.id).sort());
    expect(new Set(Object.values(portraits).map((portrait) => portrait.src)).size).toBe(people.length);
    const hashes = Object.values(portraits).map(({ src }) => createHash("sha256")
      .update(fs.readFileSync(path.join(process.cwd(), "public", src))).digest("hex"));
    expect(new Set(hashes).size).toBe(people.length);
  });

  it("ships decodable WebP files matching their declared dimensions", async () => {
    for (const portrait of Object.values(portraits)) {
      const metadata = await sharp(path.join(process.cwd(), "public", portrait.src)).metadata();
      expect(metadata.format).toBe("webp");
      expect(metadata.width).toBe(portrait.width);
      expect(metadata.height).toBe(portrait.height);
      expect(metadata.width! / metadata.height!).toBeCloseTo(3 / 4, 2);
    }
  });

  it("matches the actual reference used for each generated image", () => {
    for (const [id, portrait] of Object.entries(portraits)) {
      const collection = portrait.src.split("/")[2];
      const record = JSON.parse(fs.readFileSync(`docs/research/portraits/${collection}/generated/${id}.json`, "utf8"));
      expect(record.id).toBe(id);
      expect(`/${record.asset.replace(/^public\//, "")}`).toBe(portrait.src);
      expect([record.width, record.height]).toEqual([portrait.width, portrait.height]);
      expect(portrait.kind).toBe(record.reference ? "referenced" : "imagined");
      expect(portrait.note).toBe(record.note);
      if (portrait.kind === "referenced") {
        expect(fs.existsSync(record.reference)).toBe(true);
        expect(portrait.source).toEqual(record.source);
        expect(portrait.source.title.length).toBeGreaterThan(0);
        expect(new URL(portrait.source.url).protocol).toBe("https:");
      } else {
        expect(record.source).toBeUndefined();
      }
    }
  });
});
