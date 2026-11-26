import { TextEntry } from "./types";
import { APAROKSHANUBHUTI_VERSES_PART1 } from "./aparokshanubhutiPart1Data";
import { APAROKSHANUBHUTI_VERSES_PART2 } from "./aparokshanubhutiPart2Data";
import { APAROKSHANUBHUTI_VERSES_PART3 } from "./aparokshanubhutiPart3Data";
import { APAROKSHANUBHUTI_VERSES_PART4 } from "./aparokshanubhutiPart4Data";

export const APAROKSHANUBHUTI_GRANTHA: TextEntry = {
  id: "aparokshanubhuti",
  title: "Aparokṣānubhūtiḥ",
  transliteratedTitle: "Aparokṣānubhūtiḥ (अपरोक्षानुभूतिः — शङ्कराचार्यविरचिता)",
  author: "Śrīmad Ādi Śaṅkarācārya (श्रीमच्छङ्करभगवत्पादः)",
  century: "8th Century CE",
  school: "Advaita Vedānta (Kevalādvaita — Śaṅkara Paramparā)",
  paramparaId: "advaita",
  schoolTag: "Prakaraṇa Grantha",
  foundationalText:
    "144-Verse Treatise on Direct Non-Mediate Self-Realization & Fifteen-Limbed Advaitic Rājayoga",
  totalVersesOrSutras: "144 Classical Metrical Ślokas across 4 Thematic Chapters + Traditional Colophon",
  language: "Classical Philosophical Sanskrit (संस्कृतम्)",
  scriptStyle: "Anuṣṭubh Metre Prakaraṇa with Advaita Vivaraṇa Exposition",
  description:
    "The Aparokṣānubhūtiḥ ('Direct Experiential Realization') is one of the supreme classical Prakaraṇa manuals composed by Bhagavān Ādi Śaṅkarācārya. Across 144 lucid Anuṣṭubh verses, it maps the complete arc from preliminary ethical-spiritual preparation (Sādhana-catuṣṭaya) and deep existential Self-inquiry ('Ko'ham?'), through a rigorous logical and scriptural refutation of bodily identification (Dehātmavāda), dualistic pluralism, and even the residual binding force of Prārabdha-karma from the absolute standpoint, culminating in the celebrated Pañcadaśāṅga-Rājayoga—a transformative fifteen-limbed non-dual contemplation reinterpreting Yama, Niyama, Tyāga, Mauna, Āsana, Prāṇāyāma, Dṛk-sthiti, Dhāraṇā, Dhyāna, and Samādhi purely as abiding in Brahman.",
  refutationsDet:
    "Refutes Cārvāka / Dehātmavāda via logical proofs (unity vs. composite body, seer vs. seen, changeless vs. mutable) and Vedic citations (Puruṣa Sūkta, Bṛhadāraṇyaka, Śvetāśvatara); refutes Nyāya-Vaiśeṣika dualism by sublating the reality of distinction (bheda); and from the Pāramārthika summit refutes the real persistence of Prārabdha-karma for the awakened sage, reducing external Haṭha-yoga mechanics to inner contemplative pointers.",
  supportsDet:
    "Establishes Sādhana-catuṣṭaya and Śravaṇa-Manana-Nididhyāsana; Abhinna-nimittopādāna-Brahmavāda (Brahman alone shines as the universe); Pañcadaśāṅga-Rājayoga culminating in Brahmākāra-vṛtti-vismaraṇa (Nirvikalpa Samādhi); Anvaya-Vyatireka contemplation; and swift attainment of liberation through devotion to Guru and Īśvara ('Guru-daivata-bhaktānām').",
  chapters: [
    {
      id: "apx-ch1",
      chapterTitle: "Part 1: Sādhana-Catuṣṭaya, Self-Inquiry & Critique of Dehātmavāda (1–35)",
      chapterTitleSanskrit: "प्रथमः विभागः — साधनचतुष्टयं विचारः देहात्मवादखण्डनं च (१–३५)",
      summary:
        "Verses 1–35: Homage to Śrī Hari; fourfold qualifications (Vairāgya, Viveka, Śamādi-ṣaṭka, Mumukṣutva); necessity and fivefold structure of Vicāra; fivefold contrast between Ātman and body; fivefold Jñāna affirmation ('Brahmaivāham'); and refutation of Cārvāka bodily identification through reason and Śruti.",
      verses: APAROKSHANUBHUTI_VERSES_PART1
    },
    {
      id: "apx-ch2",
      chapterTitle: "Part 2: Non-Dual Substratum & Unreality of Multiplicity (36–72)",
      chapterTitleSanskrit: "द्वितीयः विभागः — प्रपञ्चमिथ्यात्वम् अधिष्ठानब्रह्मवादश्च (३६–७२)",
      summary:
        "Verses 36–72: Refutation of subtle-body selfhood and dualistic logic; rope-snake Vivartavāda; Śruti testimonies negating duality; illusoriness of the three states; clay-pot, gold-ornament, mirage, ocean-waves, and copper-vessel analogies proving radiant Brahman shines in every experience.",
      verses: APAROKSHANUBHUTI_VERSES_PART2
    },
    {
      id: "apx-ch3",
      chapterTitle: "Part 3: Optical Illusions, Sublation of Prārabdha & Rājayoga Limbs 1–4 (73–108)",
      chapterTitleSanskrit: "तृतीयः विभागः — अध्यासदृष्टान्ताः प्रारब्धनिरासः राजयोगारम्भश्च (७३–१०८)",
      summary:
        "Verses 73–108: Twelve everyday perceptual illusions (boat, jaundice, whirling firebrand, magnifying lens, crystal hall, racing clouds); Pāramārthika refutation of Prārabdha-karma; and introduction to the 15-limbed Advaitic Rājayoga (Yama, Niyama, Tyāga, and Mauna).",
      verses: APAROKSHANUBHUTI_VERSES_PART3
    },
    {
      id: "apx-ch4",
      chapterTitle: "Part 4: Rājayoga Limbs 5–15, Samādhi & Anvaya-Vyatireka (109–144)",
      chapterTitleSanskrit: "चतुर्थः विभागः — पञ्चदशाङ्गराजयोगः समाधिः उपसंहारश्च (१०९–१४४)",
      summary:
        "Verses 109–144 & Colophon: Sahaja Mauna, Deśa, Kāla, Āsana, Mūlabandha, Dehasāmya, Dṛk-sthiti ('Brahmamayaṁ jagat'), Advaitic Prāṇāyāma, Pratyāhāra, Dhāraṇā, Dhyāna, and Samādhi; seven obstacles; cultivating Akhaṇḍākāra-vṛtti; Anvaya-Vyatireka contemplation; and concluding synthesis of Rājayoga with devotion to Guru and Deity.",
      verses: APAROKSHANUBHUTI_VERSES_PART4
    }
  ]
};
