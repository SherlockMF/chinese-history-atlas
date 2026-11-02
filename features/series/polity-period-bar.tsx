"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function PolityPeriodBar({ name, start, end, firstYear, lastYear, color, active }: {
  name: string; start: number; end: number; firstYear: number; lastYear: number; color: string; active: boolean;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [position, setPosition] = useState<{ left: number; top: number }>();
  const cancelClose = () => clearTimeout(closeTimer.current);
  const show = () => {
    cancelClose();
    const rect = trigger.current?.getBoundingClientRect();
    if (rect) setPosition({ left: Math.max(12, Math.min(rect.left + rect.width / 2 - 120, window.innerWidth - 252)), top: rect.top >= 80 ? rect.top - 70 : rect.bottom + 4 });
  };
  const scheduleClose = () => {
    cancelClose();
    if (document.activeElement === trigger.current) return;
    closeTimer.current = setTimeout(() => setPosition(undefined), 150);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  useEffect(() => {
    if (!position) return;
    const dismiss = () => setPosition(undefined);
    const outside = (event: PointerEvent) => {
      if (!trigger.current?.contains(event.target as Node) && !tooltip.current?.contains(event.target as Node)) dismiss();
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") dismiss(); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, [position]);
  return <>
    <button ref={trigger} type="button" data-period={`${start}-${end}`} aria-label={`${name}：${start}—${end}年`} aria-describedby={position ? id : undefined}
      onPointerEnter={event => { if (event.pointerType !== "touch") show(); }} onPointerLeave={event => { if (event.pointerType !== "touch") scheduleClose(); }}
      onFocus={show} onBlur={() => setPosition(undefined)} onClick={show}
      className="absolute inset-y-0 z-10 cursor-help focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar"
      style={{ left: `${(start - firstYear) / (lastYear - firstYear) * 100}%`, width: `${(end + 1 - start) / (lastYear - firstYear) * 100}%` }}>
      <span aria-hidden="true" className="absolute inset-x-0 top-3 h-5 border border-ink/20" style={{ backgroundColor: color, opacity: active ? 1 : 0.35 }} />
    </button>
    {position ? createPortal(<div ref={tooltip} id={id} role="tooltip" onPointerEnter={cancelClose} onPointerLeave={scheduleClose}
      className="fixed z-[100] w-60 border border-ink/25 bg-paper px-3 py-2 text-sm text-ink shadow-md" style={position}>
      <p>{name} · {start}—{end}年</p><p className="mt-1 text-[11px] text-muted">含兴亡年 · 不表示全年并立</p>
    </div>, document.body) : null}
  </>;
}
