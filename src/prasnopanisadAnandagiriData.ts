import { TikaEntry } from "./types";
import { PRASNOPANISAD_ANANDAGIRI_PART1_TIKAS } from "./prasnopanisadAnandagiriPart1Data";
import { PRASNOPANISAD_ANANDAGIRI_PART2_TIKAS } from "./prasnopanisadAnandagiriPart2Data";

export const PRASNOPANISAD_ANANDAGIRI_TIKAS: Record<string, TikaEntry> = {
  ...PRASNOPANISAD_ANANDAGIRI_PART1_TIKAS,
  ...PRASNOPANISAD_ANANDAGIRI_PART2_TIKAS,
};

export function getPrasnopanisadAnandagiriTika(verseId?: string): TikaEntry | undefined {
  if (!verseId) return undefined;
  return PRASNOPANISAD_ANANDAGIRI_TIKAS[verseId.toLowerCase().trim()];
}
