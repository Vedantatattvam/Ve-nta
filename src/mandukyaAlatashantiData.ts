import { GranthaChapter } from "./types";
import { MANDUKYA_ALATASHANTI_VERSES_PART1 } from "./mandukyaAlatashantiPart1Data";
import { MANDUKYA_ALATASHANTI_VERSES_PART2 } from "./mandukyaAlatashantiPart2Data";

export const MANDUKYA_ALATASHANTI_CHAPTER: GranthaChapter = {
  id: "mandukya-alatashanti",
  chapterTitle: "Māṇḍūkya Kārikā: Caturthaṁ Prakaraṇam (Alātaśānti Prakaraṇa / Quenching of the Firebrand)",
  chapterTitleSanskrit: "माण्डूक्यकारिका — चतुर्थं प्रकरणम् (अलातशान्तिप्रकरणम्)",
  summary:
    "The Alātaśānti Prakaraṇa (The Quenching of the Firebrand) is the philosophical magnum opus of Gauḍapāda. In 100 kārikās, Gauḍapāda employs dialectics to dismantle every conceivable model of causality (origination of the existing, non-existing, both, or neither; cause producing effect or effect producing cause). He proves that causality is an irresolvable vicious cycle (anavasthā/cakraka). Using the famed analogy of the whirling firebrand (alāta-spandana), Gauḍapāda demonstrates that just as a glowing firebrand when waved appears to generate straight, curved, or circular fire-patterns while remaining nothing other than a point of fire, so too Consciousness, when vibrating through ignorance, appears as perceiver and perceived, world and souls. When the motion ceases (alāta-śānti), no patterns are born, preserved, or destroyed. The chapter opens and closes with reverent salutations to the supreme Teacher of non-duality and the Unborn, stainless state beyond all disputes.",
  verses: [
    ...MANDUKYA_ALATASHANTI_VERSES_PART1,
    ...MANDUKYA_ALATASHANTI_VERSES_PART2,
  ],
};
