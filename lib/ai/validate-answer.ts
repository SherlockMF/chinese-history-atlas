import { z } from "zod";

import { HISTORY_MAX_YEAR, HISTORY_MIN_YEAR } from "./history-scope";

export const aiAnswerSchema = z.object({
  answer: z.string().min(1).max(4000),
  provenance: z.enum(["knowledge-base", "general-knowledge", "none"]),
  relatedPeople: z.array(z.string()),
  relatedEvents: z.array(z.string()),
  relatedYears: z.array(z.number().int().min(HISTORY_MIN_YEAR).max(HISTORY_MAX_YEAR)),
  sources: z.array(
    z.object({
      sourceId: z.string(),
      title: z.string(),
      episode: z.string().optional(),
      references: z.array(z.string()).optional(),
      href: z.string().regex(/^(?:\/series\/[a-z0-9-]+\/stories\/[a-z0-9-]+#[a-z0-9-]+|\/explore\/[a-z0-9-]+)$/).optional(),
    }),
  ),
});
