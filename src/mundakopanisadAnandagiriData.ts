import { TikaEntry } from "./types";
import { MUNDAKOPANISAD_ANANDAGIRI_PART1_TIKAS } from "./mundakopanisadAnandagiriPart1Data";
import { MUNDAKOPANISAD_ANANDAGIRI_PART2_TIKAS } from "./mundakopanisadAnandagiriPart2Data";

export const MUNDAKOPANISAD_ANANDAGIRI_TIKAS: Record<string, TikaEntry> = {
  ...MUNDAKOPANISAD_ANANDAGIRI_PART1_TIKAS,
  ...MUNDAKOPANISAD_ANANDAGIRI_PART2_TIKAS,
};

export function getMundakopanisadAnandagiriTika(verseId?: string): TikaEntry | undefined {
  if (!verseId) return undefined;
  return MUNDAKOPANISAD_ANANDAGIRI_TIKAS[verseId.toLowerCase().trim()];
}
