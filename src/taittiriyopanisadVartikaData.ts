import { TikaEntry } from "./types";
import {
  TAITTIRIYOPANISAD_VARTIKA_SIKSA_TIKAS,
  TAITTIRIYOPANISAD_VARTIKA_BHRGU_TIKAS,
} from "./taittiriyopanisadVartikaSiksaBhrguData";
import { TAITTIRIYOPANISAD_VARTIKA_BRAHMANANDA_TIKAS } from "./taittiriyopanisadVartikaBrahmanandaData";

export const TAITTIRIYOPANISAD_VARTIKA_TIKAS: Record<string, TikaEntry> = {
  ...TAITTIRIYOPANISAD_VARTIKA_SIKSA_TIKAS,
  ...TAITTIRIYOPANISAD_VARTIKA_BRAHMANANDA_TIKAS,
  ...TAITTIRIYOPANISAD_VARTIKA_BHRGU_TIKAS,
};

export function getTaittiriyopanisadVartika(verseId?: string): TikaEntry | undefined {
  if (!verseId) return undefined;
  return TAITTIRIYOPANISAD_VARTIKA_TIKAS[verseId.toLowerCase().trim()];
}
