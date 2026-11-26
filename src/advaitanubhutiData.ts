import { TextEntry } from "./types";
import { ADVAITANUBHUTI_VERSES_PART1 } from "./advaitanubhutiPart1Data";
import { ADVAITANUBHUTI_VERSES_PART2 } from "./advaitanubhutiPart2Data";
import { ADVAITANUBHUTI_VERSES_PART3 } from "./advaitanubhutiPart3Data";

export const ADVAITANUBHUTI_GRANTHA: TextEntry = {
  id: "advaitanubhuti",
  title: "Advaitānubhūtiḥ",
  transliteratedTitle: "Advaitānubhūtiḥ (अद्वैतानुभूतिः — शङ्कराचार्यकृतम्)",
  author: "Śrīmad Ādi Śaṅkarācārya (श्रीमच्छङ्करभगवत्पूज्यपादः)",
  century: "8th Century CE",
  school: "Advaita Vedānta (Kevalādvaita — Śaṅkara Paramparā)",
  paramparaId: "advaita",
  schoolTag: "Prakaraṇa Grantha",
  foundationalText:
    "Experiential Treatise on Non-Dual Self-Realization (84 Classical Anuṣṭubh Ślokas + Traditional Colophon)",
  totalVersesOrSutras: "84 Anuṣṭubh Ślokas across 3 Thematic Prakaraṇas + Traditional Colophon",
  language: "Classical Philosophical Sanskrit (संस्कृतम्)",
  scriptStyle: "Anuṣṭubh Metre Prakaraṇa with Advaita Vivaraṇa Exposition",
  description:
    "The Advaitānubhūtiḥ ('Direct Experiential Realization of Non-Duality') is an 84-verse Kevalādvaita Prakaraṇa attributed in traditional manuscripts to Bhagavān Ādi Śaṅkarācārya, disciple of Śrī Govinda Bhagavatpūjyapāda. Beginning with the immediate thesis 'I am the pure, auspicious, immovable Non-Dual Self characterized by Bliss and Truth', it unfolds a sweeping sequence of luminous Vedic analogies—double moon (dvicandra), cosmic and pot-enclosed space (ghaṭākāśa), hailstone and bubble on water, serpent's discarded slough (ahinirlvayanī), heated iron, salt-water and jaggery-dough, flowers strung on one thread, sunlight streaming through woven cot-cords, dream vs. waking bodies, rock salt dissolving in water, sun reflected in water and earthen bowls, mirror-face, copper-fashioned deities, rope-snake, red-tinted crystal, swan separating milk from water, and post-and-thief—before culminating in five grand concluding verses dissolving the three Guṇas, three bodies, three states, Viśva-Taijasa-Prājña, and Virāṭ-Hiraṇyagarbha-Īśvara into Self-luminous Saccidānanda.",
  refutationsDet:
    "Refutes Duality (Dvaita) and Pluralism of Selves (Puruṣa-bahutva) via spatial indivisibility; demolishes materialist emergence theories (Dehātmavāda / Cārvāka) by proving insentient elements derive vitality and sweetness solely from the Self; exposes agency and enjoyership (Kartṛtva-bhoktṛtva) as superimpositions belonging to the trembling intellect-mirror (Cidābhāsa); and negates Karma-mīmāṁsā bondage by showing Saṁsāra vanishes at once upon Self-knowledge like fear of an imagined thief once the wooden post is recognized.",
  supportsDet:
    "Establishes Kevalādvaita Vivartavāda and Dṛg-Dṛśya-Viveka; the non-contamination of Kūṭastha-Sākṣī across waking, dream, and deep sleep (Avasthātraya); Pratibimba-Bimba discrimination between Cidābhāsa and Pure Consciousness; the non-difference of Jīva and Śiva ('Śiva eva sadā jīvo jīva eva sadā śivaḥ'); and direct Aparokṣānubhūti as self-effulgent Saccidānanda.",
  chapters: [
    {
      id: "aa-ch1",
      chapterTitle: "Part 1: Non-Dual Substratum, Space, Water & Fire Analogies (1.1–1.28)",
      chapterTitleSanskrit: "प्रथमः विभागः — अद्वैतस्वरूपं दृष्टान्तपरम्परा च (१.१–१.२८)",
      summary:
        "Verses 1.1–1.28: Opening declaration of Kevala Śiva; twin-moon optical illusion; space and pot-space equivalence; causal vs. effect conditioning; hailstones and bubbles upon water; shedding the three bodies like a serpent's slough; buttermilk-salt superimposition; red-hot iron, fire-warmth, and jaggery-sweetness demonstrating that existence, light, and bliss belong solely to the Self.",
      verses: ADVAITANUBHUTI_VERSES_PART1
    },
    {
      id: "aa-ch2",
      chapterTitle: "Part 2: Witness Discrimination & Reflection Theory (1.29–1.56)",
      chapterTitleSanskrit: "द्वितीयः विभागः — साक्षिविवेकः प्रतिबिम्बवादश्च (१.२९–१.५६)",
      summary:
        "Verses 1.29–1.56: Flowers on one thread; sunlight through woven cot-cords; formal Neti-Neti negation of body, senses, prāṇas, mind, intellect, tamas, and ego; changelessness across waking, dream, and deep sleep; untainted crystal and whirling ploughshare illusions; dream-body vs. waking-body analogy; dispassion toward heaven; rock salt dissolving in water; and the sun reflected in water (Cidābhāsa vs. Bimba).",
      verses: ADVAITANUBHUTI_VERSES_PART2
    },
    {
      id: "aa-ch3",
      chapterTitle: "Part 3: Sublation of Superimposition & Saccidānanda Synthesis (1.57–1.84)",
      chapterTitleSanskrit: "तृतीयः विभागः — अध्यासनिरासः सच्चिदानन्दोपसंहारश्च (१.५७–१.८४)",
      summary:
        "Verses 1.57–1.84 & Colophon: Sun in a shallow earthen bowl; clouds veiling the sun that illumines them; mirror-face reflection; copper-fashioned deities and worshippers; rope-snake borrowed existence; crystal-redness and blue sky; identity of Jīva and Śiva upon dissolution of the subtle body; swan separating milk from water; post-and-thief analogy; and the five-verse culmination transcending the three Guṇas, three bodies, three states, Viśva-Taijasa-Prājña, and Virāṭ-Hiraṇyagarbha-Īśvara.",
      verses: ADVAITANUBHUTI_VERSES_PART3
    }
  ]
};
