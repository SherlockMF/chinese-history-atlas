"use client";

import { useEffect, useState } from "react";

import {
  useHistoryStore,
} from "@/features/history-state/history-store";

export function useHistoryPlayer(prepareYear?: (year: number) => Promise<unknown>, playbackYears?: readonly number[]) {
  const [failure, setFailure] = useState<{ year: number; message: string }>();
  const currentYear = useHistoryStore((state) => state.currentYear);
  const maxYear = useHistoryStore((state) => state.series.timelineMaxYear);
  const isPlaying = useHistoryStore((state) => state.isPlaying);
  const setCurrentYear = useHistoryStore((state) => state.setCurrentYear);
  const pause = useHistoryStore((state) => state.pause);

  useEffect(() => {
    if (!isPlaying) return;
    const nextYear = playbackYears ? playbackYears.find(year => year > currentYear && year <= maxYear) : currentYear + 1;
    if (currentYear >= maxYear || nextYear === undefined) {
      pause();
      return;
    }
    let cancelled = false;
    // Begin IO during the current year's dwell time, not after the next tick.
    const preparation = prepareYear?.(nextYear).then(
      () => ({ ok: true as const }),
      (error: unknown) => ({ ok: false as const, message: error instanceof Error ? error.message : "地图加载失败" }),
    );
    const advance = () => {
      if (cancelled) return;
      setCurrentYear(nextYear);
      if (nextYear >= maxYear || (playbackYears && !playbackYears.some(year => year > nextYear && year <= maxYear))) pause();
    };
    const timer = window.setTimeout(() => {
      if (!preparation) { advance(); return; }
      void preparation.then((result) => {
        if (cancelled) return;
        if (result.ok) advance();
        else {
          setFailure({ year: currentYear, message: result.message });
          pause();
        }
      });
    }, 1200);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [currentYear, isPlaying, pause, prepareYear, setCurrentYear, maxYear, playbackYears]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [pause]);

  return { currentYear, isPlaying, error: !isPlaying && failure?.year === currentYear ? failure.message : undefined };
}
