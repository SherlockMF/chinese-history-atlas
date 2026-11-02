import { northernWei } from "./northern-wei";
import { liao } from "./liao";
import { jin } from "./jin";
import { westernXia } from "./western-xia";
import { dali } from "./dali";
import { southernDynasties } from "./southern-dynasties";
import { easternJin, jinSixteenKingdoms, westernJin } from "../jin-sixteen-kingdoms/content";

export const expansionContent = [northernWei, liao, jin, westernXia, dali, southernDynasties, jinSixteenKingdoms, westernJin, easternJin];
export const expansionEvents = expansionContent.flatMap(content => content.events);
export const expansionPeople = expansionContent.flatMap(content => content.people);
export const expansionDynasties = expansionContent.flatMap(content => content.dynasties);
export const expansionLocations = expansionContent.flatMap(content => content.locations);
export const expansionRelations = expansionContent.flatMap(content => content.relations);
