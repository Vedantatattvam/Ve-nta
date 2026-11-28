import { TikaEntry } from "./types";
import { MANDUKYOPANISAD_ANANDAGIRI_AGAMA_TIKAS } from "./mandukyopanisadAnandagiriAgamaData";
import { MANDUKYOPANISAD_ANANDAGIRI_VAITATHYA_TIKAS } from "./mandukyopanisadAnandagiriVaitathyaData";
import { MANDUKYOPANISAD_ANANDAGIRI_ADVAITA_TIKAS } from "./mandukyopanisadAnandagiriAdvaitaData";
import { MANDUKYOPANISAD_ANANDAGIRI_ALATA_TIKAS } from "./mandukyopanisadAnandagiriAlataData";

export const MANDUKYOPANISAD_ANANDAGIRI_TIKAS: Record<string, TikaEntry> = {
  ...MANDUKYOPANISAD_ANANDAGIRI_AGAMA_TIKAS,
  ...MANDUKYOPANISAD_ANANDAGIRI_VAITATHYA_TIKAS,
  ...MANDUKYOPANISAD_ANANDAGIRI_ADVAITA_TIKAS,
  ...MANDUKYOPANISAD_ANANDAGIRI_ALATA_TIKAS,
};

export function getMandukyopanisadAnandagiriTika(verseId?: string): TikaEntry | undefined {
  if (!verseId) return undefined;
  return MANDUKYOPANISAD_ANANDAGIRI_TIKAS[verseId.toLowerCase().trim()];
}
