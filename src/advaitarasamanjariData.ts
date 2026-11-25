import { TextEntry } from "./types";
import { ADVAITARASAMANJARI_VERSES_PART1 } from "./advaitarasamanjariPart1Data";
import { ADVAITARASAMANJARI_VERSES_PART2 } from "./advaitarasamanjariPart2Data";

export const ADVAITARASAMANJARI_GRANTHA: TextEntry = {
  id: "advaitarasamanjari",
  title: "Advaitarasamañjarī",
  transliteratedTitle: "Advaitarasamañjarī (अद्वैतरसमञ्जरी — पराद्वैतप्रकरणम्)",
  author: "Śrī Sadāśiva Brahmendra Sarasvatī (श्रीसदाशिवब्रह्मेन्द्रसरस्वतीविरचिता)",
  century: "18th Century CE",
  school: "Advaita Vedānta (Kevalādvaita — Śaṅkara Paramparā)",
  paramparaId: "advaita",
  schoolTag: "Prakaraṇa Grantha",
  foundationalText: "Poetic & Dialectical Masterpiece of Non-Dual Nectar & Sahaja Realization (7 Invocations + 44 Metrical Verses)",
  totalVersesOrSutras: "51 Verses (७ मङ्गलाचरणानि + ४४ वसन्ततिलकादिश्लोकाः)",
  language: "Classical Philosophical Sanskrit (संस्कृतम्)",
  scriptStyle: "Lyric Philosophical Poetry (Vasantatilakā / Śārdūlavikrīḍita Metres) with Advaita Vivaraṇa",
  description:
    "The Advaitarasamañjarī ('The Blossom of the Nectar of Non-Duality'), composed by the exalted Avadhūta sage and jīvanmukta Śrī Sadāśiva Brahmendra Sarasvatī (disciple of Śrī Paramaśivendra Sarasvatī), is an immortal poetic and dialectical gem of Kevalādvaita Vedānta. Through forty-four Vasantatilakā verses (preceded by seven invocatory ślokas) and vivid classical analogies—the hall of mirrors, the prince raised among hunters, the serpent-rope, mother-of-pearl silver, the double moon, the whirling firebrand, the lotus leaf untouched by water droplets, the serpent's cast-off sloughs, clouds drifting across the moon, the sleepy child fed by its mother, the king playing chess to pass time, barren alkaline earth untouched by rain or heat, and the actor dressed as a woman—Śrī Sadāśiva Brahmendra unveils the unreality of cosmic appearance and the effortless bliss of Jīvanmukti.",
  refutationsDet:
    "Systematically refutes the realism of dualism (Dvaita), the doership and enjoyership attributed to the Ātman by Nyāya and Mīmāṁsā, the reality of world appearance by exposing it as Vivarta (illusory superimposition), the notion that liberation is produced by ritual karma, and the delusion that prārabdha, bodily conditions, or injunctions can bind the non-dual Witness.",
  supportsDet:
    "Establishes Kevalādvaita Vedānta through direct experiential analogies: Ajātivāda and Vivartavāda; the Sākṣī untouched by the three states (Avasthātraya); Jīvanmukti as unshakable inner repose even amid outer activity; transcendence of vidhi-niṣedha injunctions; immunity of the wise to past and future karmas; spontaneous flowering of spiritual virtues around Self-abidance; and the triumphant final certitude 'Brahmaiva Kevalam Ahaṁ Paripūrṇam Asmi'.",
  chapters: [
    {
      id: "arm-prakarana-1",
      chapterTitle: "Prakaraṇa 1: Prastāvanā & Jagat-Mithyātva-Nirūpaṇa (Invocations & Cosmic Unreality)",
      chapterTitleSanskrit: "प्रथमः विभागः — प्रस्तावना जगन्मिथ्यात्वनिरूपणं च (श्लोकाः १–२०)",
      summary:
        "Introductory verses 1 to 7 and main verses 1 to 20: Invocatory prayers to Śrī Lalitā, Lord Gaṇeśa as the union of Nara and Para, Śrī Dakṣiṇāmūrti, and the assembly of ascetics; followed by dialectical illustrations of cosmic unreality: the child in the hall of mirrors, the traveler guided out of the forest, the lost prince discovering his royal birth, bondage and liberation as fictions like a barren woman's son, the ghost in darkness dispelled by a lamp, the rope-snake, shell-silver, Indra-jāla magic, the double moon, the whirling firebrand, lightning dissolving phantom cities, the victorious solitary elephant, pot-space untouched by pot destruction, the hallucinated beloved, the unsupported painting, the painted cloth, the desert mirage vs celestial Gaṅgā, and owls blinded by the radiant sun.",
      verses: ADVAITARASAMANJARI_VERSES_PART1
    },
    {
      id: "arm-prakarana-2",
      chapterTitle: "Prakaraṇa 2: Sākṣi-Asaṅgatva & Jīvanmukti-Mahimā (Untouched Witness & Glory of Liberation)",
      chapterTitleSanskrit: "द्वितीयः विभागः — साक्ष्यसङ्गत्वं जीवन्मुक्तिमहिमा च (श्लोकाः २१–४४)",
      summary:
        "Verses 21 to 44 with colophon: Delusion like a child grasping a lamp's shadow; Māyā unable to taint the Self like water droplets on a lotus leaf; cosmic appearances never staining pure Consciousness like filth unable to soil open space; the three states as discarded serpent sloughs; waking and dream as equally illusory; experiencing deep sleep's peace while awake; bodily movement attributed to the Self like clouds moving past the moon; dream-terrors neutralized by lucidity; reaching for a mirror despite knowing no face resides inside it; the sleepy child nourished while oblivious; mutual exclusion of the seen and the Infinite; gradual dissolution of delusion like the waxing moon dispelling darkness; cessation of Vedic karmas upon tasting Brahmānubhūti; samādhi like a sovereign king playing chess; freedom from injunctions and sovereign autonomy of the sage; prārabdha endured like a captured serpent's allotted discipline; immunity to merit and sin like barren earth to rain and heat; endurance along the final stretch home; unshaken courage like a warrior focused solely on victory; worldly allure exposed like a known actor in disguise; freedom from greed after finding inner treasure; virtues attending Self-abidance like courtiers serving the king's friend; and final non-dual certitude: 'Brahmaiva Kevalam Ahaṁ Paripūrṇam Asmi'.",
      verses: ADVAITARASAMANJARI_VERSES_PART2
    }
  ]
};
