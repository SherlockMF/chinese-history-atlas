"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";

import { jinCityEvents, jinCityPlaces, jinCitySources, type JinCityView } from "@/data/series/jin-city";

type ChoiceProps = {
  id: string;
  selected: string;
  onSelect: (id: string) => void;
  children: ReactNode;
};

function DiagramChoice({ id, selected, onSelect, children }: ChoiceProps) {
  const place = jinCityPlaces.find((item) => item.id === id)!;
  return <g
    role="button"
    tabIndex={0}
    aria-label={`图中选择：${place.label}`}
    aria-pressed={selected === id}
    onClick={() => onSelect(id)}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect(id);
      }
    }}
    className="cursor-pointer outline-none focus-visible:[&_.choice-frame]:stroke-cinnabar focus-visible:[&_.choice-frame]:stroke-[3]"
    fill={selected === id ? "#9f4036" : "#172824"}
  >{children}</g>;
}

function MapLabel({ x, y, width, label, sublabel, active }: { x: number; y: number; width: number; label: string; sublabel?: string; active: boolean }) {
  return <>
    <rect className="choice-frame" x={x} y={y} width={width} height={sublabel ? 58 : 44} rx="3" fill={active ? "#f0e2d5" : "#f3f0e7"} stroke="currentColor" strokeOpacity={active ? 0.7 : 0.22} />
    <text x={x + width / 2} y={y + 27} textAnchor="middle" fontSize="17" fontFamily="var(--font-display)">{label}</text>
    {sublabel ? <text x={x + width / 2} y={y + 47} textAnchor="middle" fontSize="12">{sublabel}</text> : null}
  </>;
}

function StructureDiagram({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const label = (id: string, x: number, y: number, width: number, title: string, sublabel?: string) => <DiagramChoice key={id} id={id} selected={selected} onSelect={onSelect}><MapLabel x={x} y={y} width={width} label={title} sublabel={sublabel} active={selected === id} /></DiagramChoice>;
  return <svg viewBox="0 0 560 535" role="group" aria-label="金中都城市格局交互示意图" className="block h-auto w-full text-ink">
    <text x="520" y="30" textAnchor="middle" fontSize="13" fill="#6e716b">北 ↑</text>
    <rect x="91" y="100" width="378" height="334" fill="none" stroke="#718e87" strokeWidth="10" strokeOpacity="0.22" />
    <rect x="105" y="112" width="350" height="310" fill="#e6e6da" fillOpacity="0.35" stroke={selected === "outer" ? "#9f4036" : "#172824"} strokeWidth="4" />
    <path d="M125 157H436M125 376H436M155 130V406M417 130V406" fill="none" stroke="#172824" strokeOpacity="0.12" strokeWidth="5" />
    <rect x="189" y="173" width="184" height="177" fill="#dfe6e1" stroke="#718077" strokeWidth="2" strokeDasharray="6 4" />
    <rect x="245" y="201" width="96" height="119" fill="#b79755" fillOpacity="0.17" stroke="#b79755" strokeWidth="2" />
    <path d="M293 112V422" fill="none" stroke="#9f4036" strokeWidth={selected === "axis" ? 4 : 2} strokeDasharray="7 6" />
    <path d="M61 92C80 155 147 160 174 190S202 213 210 256S215 328 278 352S360 380 360 438" fill="none" stroke="#5f8b89" strokeWidth={selected === "water" ? 7 : 4} />
    <ellipse cx="60" cy="83" rx="31" ry="17" fill="#b7cfcb" stroke="#5f8b89" />
    <text x="60" y="52" textAnchor="middle" fontSize="13" fill="#466e6b">莲花池</text>
    <ellipse cx="211" cy="260" rx="18" ry="28" fill="#b7cfcb" />
    <text x="211" y="300" textAnchor="middle" fontSize="12" fill="#466e6b">鱼藻池</text>
    <path d="M268 222H321M265 239H324M260 308H328" stroke="#9f4036" strokeWidth="5" strokeOpacity="0.65" />
    <text x="352" y="333" fontSize="12" fill="#6e716b">皇城</text>
    <text x="294" y="195" textAnchor="middle" fontSize="12" fill="#6e716b">宫城</text>
    {[167, 293, 354, 414].map((x) => <rect key={`n${x}`} x={x - 6} y="106" width="12" height="12" fill="#f3f0e7" stroke="#9f4036" strokeWidth="2" />)}
    {[167, 293, 409].map((x) => <rect key={`s${x}`} x={x - 6} y="416" width="12" height="12" fill="#f3f0e7" stroke="#9f4036" strokeWidth="2" />)}
    {[169, 260, 359].map((y) => <g key={y}><rect x="99" y={y - 6} width="12" height="12" fill="#f3f0e7" stroke="#9f4036" strokeWidth="2" /><rect x="449" y={y - 6} width="12" height="12" fill="#f3f0e7" stroke="#9f4036" strokeWidth="2" /></g>)}
    <rect x="353" y="416" width="14" height="17" fill="#5f8b89" />
    <text x="360" y="451" textAnchor="middle" fontSize="12" fill="#466e6b">水关 ↓</text>
    {label("north", 162, 30, 269, "北面四门", "西 → 会城 · 通玄 · 崇智 · 光泰 → 东")}
    {label("south", 123, 464, 314, "南面三门", "西 → 端礼 · 丰宜 · 景风 → 东")}
    <DiagramChoice id="west" selected={selected} onSelect={onSelect}>
      <rect className="choice-frame" x="6" y="175" width="77" height="176" rx="3" fill={selected === "west" ? "#f0e2d5" : "#f3f0e7"} stroke="currentColor" strokeOpacity="0.25" />
      <text x="44" y="202" textAnchor="middle" fontSize="16">西三门</text>
      {["彰义", "颢华", "丽泽"].map((name, i) => <text key={name} x="44" y={241 + i * 40} textAnchor="middle" fontSize="15">{name}</text>)}
    </DiagramChoice>
    <DiagramChoice id="east" selected={selected} onSelect={onSelect}>
      <rect className="choice-frame" x="477" y="175" width="77" height="176" rx="3" fill={selected === "east" ? "#f0e2d5" : "#f3f0e7"} stroke="currentColor" strokeOpacity="0.25" />
      <text x="515" y="202" textAnchor="middle" fontSize="16">东三门</text>
      {["施仁", "宣曜", "阳春"].map((name, i) => <text key={name} x="515" y={241 + i * 40} textAnchor="middle" fontSize="15">{name}</text>)}
    </DiagramChoice>
    {label("outer", 330, 123, 109, "外城街巷")}
    {label("palace", 240, 251, 127, "皇城与宫城")}
    {label("axis", 241, 367, 104, "南北中轴")}
    {label("water", 119, 306, 106, "水系园林")}
  </svg>;
}

const todayMarkers = [
  { id: "lianhua", x: 22, y: 80, width: 132, title: "莲花池", sublabel: "水源的记忆" },
  { id: "guangan", x: 280, y: 153, width: 248, title: "广安门 · 西南二环", sublabel: "城址范围的现代参照" },
  { id: "yuzao", x: 145, y: 190, width: 126, title: "鱼藻池", sublabel: "白纸坊桥西北" },
  { id: "lize", x: 23, y: 357, width: 209, title: "丽泽 · 城墙遗址", sublabel: "凤凰嘴等南、西城墙遗存" },
  { id: "shuiguan", x: 258, y: 392, width: 184, title: "水关 · 凉水河", sublabel: "城南的排水遗迹" },
  { id: "jingfeng", x: 401, y: 291, width: 137, title: "景风门站", sublabel: "城门名称的回响" },
] as const;

function TodayDiagram({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return <svg viewBox="0 0 560 535" role="group" aria-label="金中都与今日北京联系交互示意图" className="block h-auto w-full text-ink">
    <text x="518" y="30" textAnchor="middle" fontSize="13" fill="#6e716b">北 ↑</text>
    <path d="M105 148L457 148L457 421L105 421Z" fill="#dfe6e1" fillOpacity="0.5" stroke="#718077" strokeWidth="2" strokeDasharray="7 6" />
    <text x="109" y="176" fontSize="12" fill="#6e716b">金中都城址关系示意</text>
    <path d="M329 91L329 260Q329 337 401 378L491 422" fill="none" stroke="#b79755" strokeOpacity="0.45" strokeWidth="11" />
    <path d="M40 461C170 456 355 478 515 463" fill="none" stroke="#5f8b89" strokeWidth="5" />
    <text x="152" y="492" fontSize="14" fill="#466e6b">凉水河方向</text>
    <path d="M102 421H158M105 362V421" stroke="#9f4036" strokeWidth="7" fill="none" />
    <ellipse cx="86" cy="89" rx="37" ry="20" fill="#b7cfcb" />
    <circle cx="329" cy="250" r="5" fill="#b79755" />
    <text x="343" y="254" fontSize="13" fill="#6e716b">白纸坊桥</text>
    {todayMarkers.map((marker) => <DiagramChoice key={marker.id} id={marker.id} selected={selected} onSelect={onSelect}><MapLabel x={marker.x} y={marker.y} width={marker.width} label={marker.title} sublabel={marker.sublabel} active={selected === marker.id} /></DiagramChoice>)}
  </svg>;
}

export function JinCityExplorer() {
  const id = useId();
  const [view, setView] = useState<JinCityView>("structure");
  const [selected, setSelected] = useState("outer");
  const place = jinCityPlaces.find((item) => item.id === selected)!;
  const items = jinCityPlaces.filter((item) => item.view === view);

  function changeView(next: JinCityView) {
    setView(next);
    setSelected(next === "structure" ? "outer" : "guangan");
  }

  return <section aria-labelledby={`${id}-title`} className="border-b border-ink/15 py-14 sm:py-20">
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div><p className="text-xs tracking-[0.18em] text-cinnabar">城与水 · 古与今</p><h2 id={`${id}-title`} className="mt-4 font-serif text-3xl sm:text-4xl">在今日北京，寻找金中都</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">从外城走进宫苑，再把遗址与熟悉的地名连起来。点选图上的地点，看看它留下了什么。</p></div>
      <div role="group" aria-label="切换金中都视图" className="flex w-fit shrink-0 border border-ink/20 p-1">
        {([["structure", "城市格局"], ["today", "今日北京"]] as const).map(([value, title]) => <button key={value} type="button" aria-pressed={view === value} onClick={() => changeView(value)} className={`min-h-11 px-5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar ${view === value ? "bg-ink text-paper" : "text-ink hover:bg-ink/5"}`}>{title}</button>)}
      </div>
    </div>
    <div className="mt-8 grid gap-0 border border-ink/15 bg-white/20 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,1fr)]">
      <div className="min-w-0 p-3 sm:p-6">
        <p className="text-xs leading-6 text-muted">{view === "structure" ? "一座外城 · 皇城与宫城 · 十三座城门" : "循遗址、水系与地名，辨认今天的城市"}</p>
        {view === "structure" ? <StructureDiagram selected={selected} onSelect={setSelected} /> : <TodayDiagram selected={selected} onSelect={setSelected} />}
        <p className="border-t border-ink/10 pt-3 text-xs leading-6 text-muted">结构示意，非测绘图。城界、河道与图中间距均作概括；点位不用于导航。</p>
        <div role="group" aria-label="选择地点" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{items.map((item) => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)} className={`min-h-11 border px-2 py-2 text-left text-xs leading-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar ${selected === item.id ? "border-cinnabar bg-cinnabar/10 text-cinnabar" : "border-ink/15 hover:border-ink/40"}`}>{item.label}</button>)}</div>
      </div>
      <div role="region" aria-label="所选地点说明" aria-live="polite" aria-atomic="true" className="flex flex-col border-t border-ink/15 bg-paper/75 p-6 sm:p-8 lg:border-t-0 lg:border-l">
        <p className="text-xs tracking-widest text-cinnabar">{place.evidence}</p>
        <h3 className="mt-4 font-serif text-2xl sm:text-3xl">{place.label}</h3>
        <p className="mt-6 font-serif text-xl leading-8">{place.lead}</p>
        <p className="mt-5 text-sm leading-8 text-ink/80">{place.detail}</p>
        <p className="mt-6 border-l-2 border-gold pl-4 text-xs leading-7 text-muted">{place.boundary}</p>
        <div className="mt-8 border-t border-ink/15 pt-5"><p className="text-xs text-muted">循此查证</p><ul className="mt-3 space-y-3">{place.sources.map((key) => <li key={key}><a href={jinCitySources[key].url} target="_blank" rel="noreferrer" className="inline-block text-xs leading-6 text-cinnabar underline decoration-cinnabar/35 underline-offset-4 focus-visible:outline-2 focus-visible:outline-cinnabar">{jinCitySources[key].title} ↗</a></li>)}</ul></div>
        <p className="mt-auto pt-8 text-xs leading-6 text-muted">遗存是发掘的实物，范围是历史空间的概括，地名则保存了另一种记忆。</p>
      </div>
    </div>
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"><p className="text-xs text-muted">把都城放回时间</p>{jinCityEvents.map((event) => <Link key={event.id} href={`/explore/${event.id}?year=${event.year}&series=jin`} className="inline-flex min-h-11 items-center gap-2 text-sm text-cinnabar underline decoration-cinnabar/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-cinnabar"><span className="font-serif">{event.year}</span>{event.title} →</Link>)}</div>
  </section>;
}
