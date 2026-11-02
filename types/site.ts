/** Canonical history IDs, independent of archive discovery IDs. */
export type HistoryEntityRef = { type: "person" | "event" | "location"; id: string };

export type HistorySiteConfig = {
  id: string;
  /** Planned sites reserve stable slugs but must not expose an archive link. */
  status?: "ready" | "planned";
  archiveSlug: string;
  title: string;
  description: string;
  relatedPersonIds: readonly string[];
  relatedEventIds: readonly string[];
  relatedLocationIds: readonly string[];
};

export type ArchiveEntityMapping = Readonly<Record<string, HistoryEntityRef>>;
