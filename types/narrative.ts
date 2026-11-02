export type NarrativeSummary = {
  slug: string;
  seriesId: string;
  title: string;
  subtitle: string;
  summary: string;
  period: string;
  category: string;
  eventIds: string[];
  personIds: string[];
};

export type NarrativeSource = {
  id: string;
  title: string;
  url: string;
  note: string;
};

export type NarrativeSection = {
  id: string;
  title: string;
  mode: "history" | "literary-tradition";
  paragraphs: string[];
  sourceIds: string[];
  transcripts: { file: string; start: number; end: number }[];
  interpretation?: string;
  poem?: {
    title: string;
    attribution: string;
    lines: string[];
    translation: string;
  };
};

export type Narrative = NarrativeSummary & {
  lead: string;
  sections: NarrativeSection[];
  sources: NarrativeSource[];
};
