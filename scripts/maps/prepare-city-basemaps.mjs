import { mkdirSync, writeFileSync, existsSync, readFileSync, renameSync, statSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { resolve, dirname } from "node:path";

// Bounded ODbL vector data snapshots, not tiles from OSM's restricted raster service.
// OpenFreeMap permits public use and self-hosting: https://openfreemap.org/
const root = resolve("public/maps/cities");
const priorPath = resolve(root, "manifest.json");
const upstream = existsSync(priorPath) ? JSON.parse(readFileSync(priorPath, "utf8")).upstream : JSON.parse(execFileSync("curl.exe", ["-fsSL", "--max-time", "30", "https://tiles.openfreemap.org/planet"], { encoding: "utf8" })).tiles[0];
const regions = { jin: [116.29, 39.84, 116.455, 39.958], daxing: [108.858, 34.190, 109.01, 34.30] };
const tileX = (lng, z) => Math.floor((lng + 180) / 360 * 2 ** z);
const tileY = (lat, z) => Math.floor((1 - Math.asinh(Math.tan(lat * Math.PI / 180)) / Math.PI) / 2 * 2 ** z);
const jobs = [];
for (const [city, [west, south, east, north]] of Object.entries(regions)) {
  for (let z = 10; z <= 14; z++) for (let x = tileX(west,z); x <= tileX(east,z); x++) for (let y = tileY(north,z); y <= tileY(south,z); y++) {
    const path = resolve(root, city, String(z), String(x), `${y}.pbf`);
    jobs.push({ path, url: upstream.replace("{z}",z).replace("{x}",x).replace("{y}",y) });
  }
}
async function download({path,url}) {
  if (existsSync(path) && statSync(path).size > 0) return;
  mkdirSync(dirname(path), { recursive: true });
  await new Promise((ok, fail) => {
    const request = spawn("curl.exe", ["-fsSL", "--compressed", "--max-time", "30", "--retry", "1", url, "-o", `${path}.partial`], { stdio: "inherit", windowsHide: true });
    request.on("error", fail);
    request.on("exit", code => code === 0 ? ok() : fail(new Error(`Download failed: ${url}`)));
  });
  renameSync(`${path}.partial`, path);
}
let next = 0;
await Promise.all(Array.from({ length: 4 }, async () => { while(next < jobs.length) await download(jobs[next++]); }));
for (const range of ["0-255", "256-511", "8192-8447"]) await download({ path: resolve(root,"fonts","Noto Sans Regular",`${range}.pbf`), url: `https://tiles.openfreemap.org/fonts/Noto%20Sans%20Regular/${range}.pbf` });
mkdirSync(root, { recursive: true });
writeFileSync(resolve(root, "manifest.json"), JSON.stringify({ provider: "OpenFreeMap", upstream, dataLicense: "ODbL", attribution: "© OpenMapTiles · © OpenStreetMap contributors", regions, minzoom: 10, maxzoom: 14, tileCount: jobs.length }, null, 2) + "\n");
console.log(`Saved ${jobs.length} bounded city vector tiles.`);
