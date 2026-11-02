import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { modernCitySource, modernCityLayers } from "@/features/series/city-modern-style";
import manifest from "@/public/maps/cities/manifest.json";

describe("local city basemap", () => {
  it("serves both cities without external tile requests", () => {
    for (const city of ["jin", "daxing"] as const) {
      const source = modernCitySource(city);
      expect(source.tiles[0]).toContain(`/maps/cities/${city}/`);
      expect(source).not.toHaveProperty("url");
      expect(source.attribution).toContain("OpenStreetMap");
    }
    expect(modernCityLayers.some(layer => layer.id === "modern-road-labels")).toBe(true);
  });
  it("ships the complete recorded set as uncompressed vector data", () => {
    let count = 0;
    for (const city of ["jin", "daxing"]) {
      const root = resolve("public/maps/cities", city);
      for (const file of readdirSync(root, { recursive: true }) as string[]) if (file.endsWith(".pbf")) {
        const buffer = readFileSync(resolve(root, file));
        expect(buffer.length).toBeGreaterThan(100);
        expect(buffer[0]).toBe(0x1a); // MVT layer field, not an error HTML page or raw gzip.
        count++;
      }
    }
    expect(count).toBe(manifest.tileCount);
    for (const range of ["0-255", "256-511", "8192-8447"]) expect(readFileSync(resolve("public/maps/cities/fonts/Noto Sans Regular", `${range}.pbf`)).length).toBeGreaterThan(100);
  });
});
