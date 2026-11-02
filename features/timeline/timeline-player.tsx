"use client";

import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useHistoryStore } from "@/features/history-state/history-store";
import { useHistoryPlayer } from "@/hooks/use-history-player";

export function TimelinePlayer({ years }: { years: readonly number[] }) {
  useHistoryPlayer(undefined, years);
  const currentYear = useHistoryStore((state) => state.currentYear);
  const setCurrentYear = useHistoryStore((state) => state.setCurrentYear);
  const isPlaying = useHistoryStore((state) => state.isPlaying);
  const play = useHistoryStore((state) => state.play);
  const pause = useHistoryStore((state) => state.pause);
  return (
    <Button variant="outline" disabled={!years.length} onClick={isPlaying ? pause : () => {
      if (!years.length) return;
      if (currentYear >= years[years.length - 1]) setCurrentYear(years[0]);
      else if (!years.includes(currentYear)) setCurrentYear(years.find(year => year > currentYear) ?? years[0]);
      play();
    }} aria-label={isPlaying ? "暂停历史播放" : "播放历史"}>
      {isPlaying ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
      {isPlaying ? "暂停" : "播放历史"}
    </Button>
  );
}
