import { people } from "@/data/seed";
const supportedIds = new Set(people.map((person) => person.id));

export function supportsPersonChat(personId: string): boolean {
  return supportedIds.has(personId);
}
