import { historySeries } from "@/data/series";

export const HISTORY_MIN_YEAR = Math.min(...historySeries.map(series => series.timelineMinYear));
export const HISTORY_MAX_YEAR = Math.max(...historySeries.map(series => series.timelineMaxYear));

export function isGlobalHistoryPage(pathname: string) {
  return pathname === "/" || pathname === "/series";
}
