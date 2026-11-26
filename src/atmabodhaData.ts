import { TextEntry } from "./types";
import { ATMABODHA_VERSES_PART1 } from "./atmabodhaPart1Data";
import { ATMABODHA_VERSES_PART2 } from "./atmabodhaPart2Data";

export const ATMABODHA_GRANTHA: TextEntry = {
  id: "atmabodha",
  title: "Ātmabodhaḥ",
  transliteratedTitle: "Ātmabodhaḥ (आत्मबोधः — शङ्कराचार्यविरचितः)",
  author: "Śrīmad Ādi Śaṅkarācārya (श्रीमच्छङ्करभगवत्पादः)",
  century: "8th Century CE",
  school: "Advaita Vedānta (Kevalādvaita — Śaṅkara Paramparā)",
  paramparaId: "advaita",
  schoolTag: "Prakaraṇa Grantha",
  foundationalText:
    "68-Verse Introductory & Contemplative Masterpiece on Self-Knowledge (67 Anuṣṭubh + 1 Concluding Vaṁśastha-Indravajrā)",
  totalVersesOrSutras: "68 Classical Metrical Ślokas across 2 Thematic Chapters + Traditional Colophon",
  language: "Classical Philosophical Sanskrit (संस्कृतम्)",
  scriptStyle: "Anuṣṭubh & Concluding Upajāti Metre with Critical Variant Notes & Vivaraṇa Exposition",
  description:
    "The Ātmabodhaḥ ('Awakening to the Self') is one of the most beloved and luminous Prakaraṇa texts composed by Bhagavān Ādi Śaṅkarācārya for earnest seekers purified by tapas and dispassion. In sixty-eight compact, poetic verses rich in unforgettable similes—fire for cooking, clearing-nut powder (kataka-reṇu) settling muddy water, bubbles in water, gold bracelets, rice husked from chaff, crystal near colored cloth, a king watching ministers, moon amid racing clouds, forgotten necklace around one's neck, burning firewood on the Self's fire-stick, dawn before sunrise, Rāma crossing the ocean of delusion, lamp inside a pot, butter in milk, and burnished gold—it systematically unveils Advaitic discrimination, Mahāvākya realization ('Paraṁ brahmāham eva tat'), contemplative Nididhyāsana, and Jīvanmukti, culminating in the immortal pilgrimage to the inner shrine of the Self (Svātma-tīrtha).",
  refutationsDet:
    "Refutes Karma-mīmāṁsā claims that ritual action can remove ignorance (proving action shares the same ego-root as Avidyā); negates identification with the three bodies (Sthūla, Sūkṣma, Kāraṇa) and five sheaths (Pañcakośas); refutes caste and stage-of-life pride in Ātman; and dismisses dualistic world-appearances as mirage-like unless recognized as Brahman.",
  supportsDet:
    "Establishes Jñāna alone as the direct instrument of Mokṣa; Svaprakāśatva (self-luminosity of Awareness needing no second lamp); Apavāda ('Neti neti') + Mahāvākya ('Ahaṁ Brahma') synthesis; Pravilāpana-dhyāna; Jīvanmukti and Videha-kaivalya; and the universal truth that Brahman permeates every object and act like butter in milk.",
  chapters: [
    {
      id: "ab-ch1",
      chapterTitle: "Part 1: Qualifications, Knowledge vs. Action & Discrimination of the Self (1–34)",
      chapterTitleSanskrit: "प्रथमः विभागः — अधिकारः ज्ञानसाधनत्वं देहकोशविवेकश्च (१–३४)",
      summary:
        "Verses 1–34: Adhikārī qualifications; Knowledge like fire for cooking; clearing-nut powder analogy; world as dream and nacre-silver; three bodies and five sheaths winnowed like rice from chaff; intellect's reflection vs. kingly Witness; agency vs. stainless Sat-Cit-Ānanda; Neti-Neti and Mahāvākyas; freeing oneself from birth, mind, and sorrow.",
      verses: ATMABODHA_VERSES_PART1
    },
    {
      id: "ab-ch2",
      chapterTitle: "Part 2: Brahmākāra Contemplation, Jīvanmukti & Svātma-Tīrtha (35–68)",
      chapterTitleSanskrit: "द्वितीयः विभागः — निदिध्यासनं जीवन्मुक्तिः स्वात्मतीर्थोपसंहारश्च (३५–६८)",
      summary:
        "Verses 35–68 & Colophon: Space-like omnipresence; 'Paraṁ brahmāham eva tat'; Brahmākāra-vāsanā like elixir; dissolving the seen into the Self; fire-stick churning and dawn before sunrise; forgotten necklace around the neck; Ātmārāma and lamp inside a jar; twelvefold definition of Parabrahman; butter in milk and red-hot iron ball; and the final pilgrimage to Svātma-tīrtha.",
      verses: ATMABODHA_VERSES_PART2
    }
  ]
};
