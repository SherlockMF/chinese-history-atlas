"use client";

import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { cityOverlays, type CityLayer, type CityLayers } from "@/data/series/city-overlays";

const CityOverlayCanvas = dynamic(() => import("./city-overlay-canvas").then(m => m.CityOverlayCanvas), {
  ssr: false, loading: () => <div className="flex h-[480px] items-center justify-center bg-mist/30 text-sm text-muted sm:h-[640px]" role="status">正在打开古今地图…</div>,
});
const initialLayers: CityLayers = { modern: false, extent: true, zones: true, axis: true, landmarks: false, gates: true, streets: true, water: true, comparison: false };
const presets: { label: string; layers: CityLayers }[] = [
  { label: "只看历史", layers: initialLayers },
  { label: "古今叠加", layers: { ...initialLayers, modern: true, landmarks: true } },
  { label: "城址对照", layers: { ...initialLayers, comparison: true, zones: false, streets: false, water: false, axis: false } },
  { label: "只看现代", layers: { modern: true, extent: false, zones: false, axis: false, landmarks: true, gates: false, streets: false, water: false, comparison: false } },
];
const layerNames: [CityLayer, string][] = [["modern", "现代街道底图"], ["extent", "历史城域"], ["gates", "城门与门名"], ["zones", "宫城 / 皇城 / 两市"], ["streets", "街道与里坊格局"], ["axis", "历史轴线"], ["water", "历史水系"], ["comparison", "后世城址对照"], ["landmarks", "现代参照地标"]];
const buttonClass = "min-h-11 border border-ink/20 px-3 py-2 text-xs transition-colors hover:border-cinnabar focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar";

export function CityOverlayExplorer({ cityId }: { cityId: "jin" | "daxing" }) {
  const city = cityOverlays[cityId];
  const id = useId();
  const [layers, setLayers] = useState<CityLayers>({ ...initialLayers });
  const [opacity, setOpacity] = useState(0.85);
  const [selectedId, setSelectedId] = useState(city.places[0].id);
  const [resetKey, setResetKey] = useState(0);
  const [focusKey, setFocusKey] = useState(0);
  const selected = city.places.find(p => p.id === selectedId) ?? city.landmarks.find(p => p.id === selectedId) ?? city.places[0];
  function selectPlace(placeId: string) {
    const place = city.places.find(p => p.id === placeId);
    setLayers(current => ({ ...current, [place?.layer ?? "landmarks"]: true }));
    setSelectedId(placeId);
  }

  return <section id={`city-overlay-${cityId}`} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-b border-ink/20 py-12 sm:py-16">
    <header className="mb-7 grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0"><p className="text-xs tracking-widest text-cinnabar">古今叠图 · {city.period}</p><h2 id={`${id}-title`} className="mt-3 font-serif text-3xl sm:text-4xl">{city.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{city.introduction}</p></div>
      <div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setLayers({ ...initialLayers }); setSelectedId(cityId === "jin" ? "jin-palace" : "daxing-palace"); setFocusKey(k => k + 1); }} className={buttonClass}>放大宫城 ↗</button><button type="button" onClick={() => setResetKey(k => k + 1)} className={buttonClass}>回到全城 ↗</button></div>
    </header>
    <div className="grid border border-ink/20 bg-white/20 xl:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="min-w-0">
        <div role="group" aria-label="古今对照方式" className="flex flex-wrap gap-2 border-b border-ink/15 p-3">
          {presets.map(preset => { const active = Object.entries(preset.layers).every(([key, value]) => layers[key as CityLayer] === value); return <button key={preset.label} type="button" onClick={() => setLayers({ ...preset.layers })} aria-pressed={active} className={`${buttonClass} ${active ? "bg-ink text-paper" : ""}`}>{preset.label}</button>; })}
          <span className="ml-auto self-center px-1 text-[11px] text-muted">拖动平移 · ＋ / − 缩放 · 北 ↑</span>
        </div>
        <CityOverlayCanvas city={city} layers={layers} opacity={opacity} selectedId={selectedId} onSelect={setSelectedId} resetKey={resetKey} focusKey={focusKey} />
        <p className="border-t border-ink/15 px-4 py-3 text-xs leading-6 text-muted">城垣、街坊与水系为依据资料的概略复原，不是考古测绘图。点门名看说明；放大可读宫门细节。{cityId === "daxing" ? " 外郭虚线表示规划范围，南界营建年代需结合安化门考古发现理解。" : " 十三门展示金代发展后的格局，含后增光泰门。"}</p>
      </div>
      <aside aria-label="地图图层" className="border-t border-ink/20 bg-paper/90 p-5 xl:border-t-0 xl:border-l">
        <h3 className="font-serif text-xl">把时间一层层打开</h3>
        <fieldset className="mt-4 grid gap-x-5 sm:grid-cols-2 xl:grid-cols-1"><legend className="sr-only">选择显示图层</legend>{layerNames.map(([key, label]) => <label key={key} className="flex min-h-10 cursor-pointer items-center gap-3 text-xs"><input type="checkbox" checked={layers[key]} onChange={event => setLayers(current => ({ ...current, [key]: event.target.checked }))} className="size-4 accent-cinnabar" /><span>{key === "comparison" ? city.comparisonLabel : key === "zones" && cityId === "jin" ? "宫城 / 皇城 / 礼制区" : label}</span></label>)}</fieldset>
        <label className="mt-5 block border-t border-ink/15 pt-5 text-xs" htmlFor={`${id}-opacity`}>历史层透明度 <output className="float-right tabular-nums">{Math.round(opacity * 100)}%</output></label>
        <input id={`${id}-opacity`} aria-label="历史层透明度" type="range" min="10" max="100" step="5" value={Math.round(opacity * 100)} onChange={event => setOpacity(Number(event.target.value) / 100)} className="mt-4 min-h-6 w-full accent-cinnabar" />
        <p className="mt-2 text-xs leading-6 text-muted">调低后，现代道路会更清楚。城址周边街道使用本地地图快照，数据来自 OpenFreeMap / OpenStreetMap。</p>
        <ul className="mt-5 grid grid-cols-2 gap-3 border-t border-ink/15 pt-5 text-xs text-muted" aria-label="地图图例"><li><span className="mr-2 inline-block w-5 border-t-2 border-cinnabar" />历史城垣</li><li><span className="mr-2 inline-block size-2 bg-cinnabar" />城门</li><li><span className="mr-2 inline-block h-3 w-5 bg-gold/50" />宫城皇城</li><li><span className="mr-2 inline-block w-5 border-t-2 border-[#4b8e9c]" />历史水系</li><li><span className="mr-2 inline-block w-5 border-t-2 border-[#466d4a]" />后世城墙</li><li><span className="mr-2 inline-block w-5 border-t border-[#a68c64]" />街道</li></ul>
      </aside>
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section role="region" aria-label="古今地点说明" aria-live="polite" className="border-l-2 border-cinnabar px-5 py-1"><p className="text-xs text-cinnabar">{"layer" in selected ? selected.layer === "comparison" ? "后世城址 · 时期对照" : "历史地点 · 复原依据" : "现代参照 · 古今关系"}</p><h3 className="mt-2 font-serif text-xl">{selected.name}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{selected.description}</p><div className="mt-3 flex flex-wrap gap-3">{selected.sourceIds.map(sourceId => { const source = city.sources.find(s => s.id === sourceId)!; return <a key={sourceId} className="text-xs text-cinnabar underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>; })}</div></section>
      <div role="group" aria-label="选择现代参照" className="flex flex-wrap content-start gap-2">{city.landmarks.map(place => <button key={place.id} type="button" aria-pressed={selectedId === place.id} onClick={() => selectPlace(place.id)} className={`${buttonClass} ${selectedId === place.id ? "border-cinnabar bg-cinnabar/10 text-cinnabar" : ""}`}>{place.name}</button>)}</div>
    </div>
    <details className="mt-6 border-t border-ink/15 pt-4"><summary className="cursor-pointer text-sm">地点索引 · 城门、宫苑与街市（{city.places.filter(p => p.layer !== "comparison").length}处）</summary><div role="group" aria-label="选择历史地点" className="mt-4 flex flex-wrap gap-2">{city.places.filter(p => p.layer !== "comparison").map(place => <button type="button" key={place.id} aria-pressed={selectedId === place.id} onClick={() => selectPlace(place.id)} className={`${buttonClass} ${selectedId === place.id ? "bg-ink text-paper" : ""}`}>{place.name}</button>)}</div></details>
    <details className="mt-6 border-t border-ink/15 pt-4 text-xs leading-7 text-muted"><summary className="min-h-8 cursor-pointer text-ink">复原依据与精度说明</summary><p className="mt-3">{city.method}</p><ul className="mt-3 space-y-3">{city.sources.map(source => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer" className="text-cinnabar underline underline-offset-4">{source.title} ↗</a><p>{source.note}</p></li>)}</ul></details>
  </section>;
}
