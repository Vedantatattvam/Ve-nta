import { TikaEntry } from "./types";
import { TAITTIRIYOPANISAD_ANANDAGIRI_SIKSA_TIKAS } from "./taittiriyopanisadAnandagiriSiksaData";
import { TAITTIRIYOPANISAD_ANANDAGIRI_BRAHMANANDA_TIKAS } from "./taittiriyopanisadAnandagiriBrahmanandaData";

export const TAITTIRIYOPANISAD_ANANDAGIRI_TIKAS: Record<string, TikaEntry> = {
  ...TAITTIRIYOPANISAD_ANANDAGIRI_SIKSA_TIKAS,
  ...TAITTIRIYOPANISAD_ANANDAGIRI_BRAHMANANDA_TIKAS,
};

export function getTaittiriyopanisadAnandagiriTika(verseId?: string): TikaEntry | undefined {
  if (!verseId) return undefined;
  return TAITTIRIYOPANISAD_ANANDAGIRI_TIKAS[verseId.toLowerCase().trim()];
}
