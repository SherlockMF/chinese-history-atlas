"use client";

import { geoMercator, geoPath, geoTransform } from "d3-geo";
import Link from "next/link";
import { useMemo } from "react";
import { resolveSeriesSnapshot } from "@/lib/history/series-snapshots";
import type { HistoricalMapSnapshot, HistorySeriesConfig } from "@/types/series";

// Match d3's SVG path precision across server and browser math implementations.
const svgCoordinate = (value: number) => Math.round(value * 1000) / 1000;

export function SnapshotHeroMap({ year, series, snapshots, routePrefix }: {
  year: number; series: HistorySeriesConfig; snapshots: readonly HistoricalMapSnapshot[]; routePrefix: string;
}) {
  const snapshot = resolveSeriesSnapshot(snapshots.filter(s => s.seriesId === series.id), year);
  const drawing = useMemo(() => {
    if (!snapshot || snapshot.status !== "ready") return null;
    const projection = geoMercator().scale(1).translate([0, 0]);
    // Project rings directly so GeoJSON winding cannot become a spherical complement.
    const path = geoPath(geoTransform({ point(lng, lat) {
      const point = projection([lng, lat]);
      if (point) this.stream.point(point[0], point[1]);
    } }));
    const collection = { type: "GeometryCollection" as const, geometries: [
      ...snapshot.regions.map(r => r.geometry),
      { type: "MultiPoint" as const, coordinates: snapshot.contextPlaces?.map(p => p.coordinate) ?? [] },
    ] };
    const [[x0, y0], [x1, y1]] = path.bounds(collection);
    const scale = Math.min(556 / (x1 - x0), 432 / (y1 - y0));
    projection.scale(scale).translate([310 - scale * (x0 + x1) / 2, 244 - scale * (y0 + y1) / 2]);
    const labels = [
      ...snapshot.regions.map(r => ({ id: r.polityId, name: r.name ?? r.polityId, coordinate: r.labelPoint, major: r.boundaryKind !== "influence" })),
      ...(snapshot.contextPlaces ?? []).map(p => ({ ...p, major: false })),
    ];
    const occupied: number[][] = [];
    return {
      regions: snapshot.regions.filter(r => r.displayMode !== "label-only").map(r => ({ ...r, fillPath: path(r.geometry) ?? "", outline: path(snapshot.outlines?.[r.polityId] ?? r.geometry) ?? "" })),
      labels: labels.flatMap(label => {
        const projected = projection(label.coordinate);
        if (!projected) return [];
        const point: [number, number] = [svgCoordinate(projected[0]), svgCoordinate(projected[1])];
        const size = label.major ? 15 : 11;
        const half = label.name.length * size / 2;
        let position = point;
        // Move dense peripheral names a short distance, with a leader back to
        // the source label point, instead of dropping neighbors from the overview.
        search: for (let radius = 0; radius <= 240; radius += 12) {
          for (let direction = 0; direction < (radius ? 12 : 1); direction++) {
            const angle = direction * Math.PI / 6;
            const candidate: [number, number] = [svgCoordinate(point[0] + Math.cos(angle) * radius), svgCoordinate(point[1] + Math.sin(angle) * radius)];
            const box = [candidate[0] - half - 3, candidate[1] - size, candidate[0] + half + 3, candidate[1] + 5];
            if (box[0] < 8 || box[2] > 612 || box[1] < 8 || box[3] > 488) continue;
            if (occupied.some(b => b[0] < box[2] && b[2] > box[0] && b[1] < box[3] && b[3] > box[1])) continue;
            position = radius ? candidate : point;
            occupied.push(box);
            break search;
          }
        }
        return [{ ...label, point, position, size }];
      }),
    };
  }, [snapshot]);

  if (!drawing || !snapshot) return <p role="status" className="self-center p-8 text-center text-sm text-muted">阶段总图资料整理中</p>;
  return <div className="relative mt-10 min-w-0 self-center lg:mt-0">
    <Link href={`${routePrefix}/map?year=${snapshot.year}`} aria-label={`查看 ${snapshot.year} 年完整地图`} className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar">
      <svg viewBox="0 0 620 500" role="img" aria-label={`${snapshot.year} 年${series.title}及周边形势总图`} className="w-full text-ink opacity-40 transition-opacity duration-500 group-hover:opacity-60" style={{ maskImage: "radial-gradient(ellipse at 50% 50%, black 45%, transparent 74%)" }}>
        <title>{snapshot.label}</title>
        {drawing.regions.map(region => <g key={region.polityId} data-polity={region.polityId}>
          <path d={region.fillPath} fill={region.color ?? "#6d8d7f"} fillOpacity={region.boundaryKind === "influence" ? .16 : .3} />
          <path d={region.outline} fill="none" stroke="#697b6e" strokeWidth=".8" strokeOpacity=".65" strokeLinejoin="round" />
        </g>)}
        <g stroke="#697b6e" strokeWidth=".6" strokeOpacity=".55">
          {drawing.labels.filter(label => label.position !== label.point).map(label => <line key={label.id} x1={label.point[0]} y1={label.point[1]} x2={label.position[0]} y2={svgCoordinate(label.position[1] - label.size / 3)} />)}
        </g>
        <g textAnchor="middle" className="font-serif" fill="currentColor" paintOrder="stroke" stroke="#f3f0e7" strokeWidth="3" strokeLinejoin="round">
          {drawing.labels.map(label => <text key={label.id} x={label.position[0]} y={label.position[1]} fontSize={label.size} fillOpacity={label.major ? .85 : .65}>{label.name}</text>)}
        </g>
      </svg>
      <p className="mx-auto w-fit border-t border-ink/20 pt-3 text-center text-xs tracking-widest text-muted group-hover:text-cinnabar">{snapshot.year} 年图集 · 完整形势 ↗</p>
    </Link>
    {year !== snapshot.year ? <p className="mt-3 text-center text-[11px] leading-5 text-muted">所选 {year} 年暂无独立图，展示 {snapshot.year} 年图集。</p> : null}
    {snapshot.year === 879 ? <p className="mt-2 text-center text-[11px] text-muted">南诏区域图幅 · 含图内周边</p> : null}
  </div>;
}
