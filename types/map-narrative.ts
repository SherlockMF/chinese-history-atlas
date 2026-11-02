/** Narrative overlays are independent of the dated political boundary snapshots. */
export type MapNarrativeNode = {
  id: string;
  locationId?: string;
  name: string;
  coordinate: [number, number];
  note?: string;
};

export type MapNarrativeStep = {
  id: string;
  year: number;
  title: string;
  description: string;
  snapshotId: string;
  eventIds: string[];
  nodes: MapNarrativeNode[];
  routeKind: "campaign" | "migration" | "political";
  sourceRefs: string[];
  cameraBounds?: [[number, number], [number, number]];
};

export type MapNarrativeSequence = {
  id: string;
  title: string;
  period: string;
  description: string;
  steps: MapNarrativeStep[];
};

export type MapNarrativeChapter = {
  id: string;
  title: string;
  period: string;
  description: string;
  startYear: number;
  endYear: number;
};
