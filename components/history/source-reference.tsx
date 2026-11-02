export function SourceReference({ source }: { source: string }) {
  const match = source.match(/https?:\/\/\S+/);
  if (!match) return <>{source}</>;
  const label = source.slice(0, match.index).replace(/[\s—·]+$/, "");
  return <a href={match[0]} target="_blank" rel="noreferrer" className="break-words text-cinnabar underline decoration-cinnabar/30 underline-offset-4 hover:decoration-cinnabar focus-visible:outline-cinnabar">{label || "查看原始资料"} ↗</a>;
}
