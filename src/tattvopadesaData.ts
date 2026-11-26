import { TextEntry } from "./types";
import { TATTVOPADESA_PART1_VERSES } from "./tattvopadesaPart1Data";
import { TATTVOPADESA_PART2_VERSES } from "./tattvopadesaPart2Data";

const ALL_VERSES = [
  ...TATTVOPADESA_PART1_VERSES,
  ...TATTVOPADESA_PART2_VERSES,
];

export const TATTVOPADESA_GRANTHA: TextEntry = {
  id: "tattvopadesa",
  title: "तत्त्वोपदेशः",
  transliteratedTitle: "Tattvopadeśaḥ (तत्त्वोपदेशः)",
  author: "Ādi Śaṅkarācārya Bhagavatpāda",
  century: "8th Century CE",
  school: "Śāṅkarādvaita (Unconditional Non-Dualism)",
  paramparaId: "advaita",
  foundationalText: "Prakaraṇa Grantha (Śaṅkarācārya Bhagavatpāda Kṛti)",
  totalVersesOrSutras: "87 Ślokas (Complete)",
  description:
    "A luminous 87-verse Advaita Prakaraṇa attributed to Śrīmad Ādi Śaṅkarācārya Bhagavatpāda (disciple of Śrī Govinda Bhagavatpāda). Beginning with a systematic fivefold discrimination of the 'Tvam' term from the body, senses, prāṇa, mind, and intellect, it expounds the threefold Lakṣaṇā leading to Bhāgalakṣaṇā in 'Tat Tvam Asi', illustrates spiritual bondage and rescue through the Chāndogya parable of the blindfolded man from Gandhāra, affirms Gauḍapāda's Ajātivāda, and concludes with the celebrated maxim on Bhāvādvaita versus Kriyādvaita and lifelong reverence for the Guru.",
  refutationsDet:
    "Refutes Dehātmavāda (body-self identity), Indriyātmavāda (senses singly or collectively as the Self), Prāṇa/Manas/Buddhi-ātmavāda, attempts to objectify Self-luminous Consciousness through empirical pramāṇas ('like burning fire with firewood'), Jahatī and Ajahatī Lakṣaṇā for Mahāvākyas, and antinomian 'kriyādvaita' disregard for Guru-bhakti and Vedic conduct.",
  supportsDet:
    "Establishes Dṛg-Dṛśya-Viveka, Sākṣī-Caitanya as Svānubhūti, Bhāgalakṣaṇā (Jahad-ajahal-lakṣaṇā) for 'Tat Tvam Asi', Śabda-prāmāṇya of the Upaniṣads, the indispensable grace of the Śrotriya-Brahmaniṣṭha Guru, Mithyātva (anirvācyatva) of duality, Ajātivāda, Jīvanmukti, and Bhāvādvaita.",
  chapters: [
    {
      id: "tu-ch-1",
      chapterTitle: "Tvam-Padārtha-Śodhana (Inquiry into the Inmost Self)",
      chapterTitleSanskrit: "१. त्वंपदार्थशोधनम् (श्लोकाः १–२४)",
      summary:
        "Discriminates the Inmost Witness-Self ('Tvam') from the physical body, senses, prāṇa, mind, and intellect, culminating in Satyam Jñānam Anantam Brahman and Śabda-prāmāṇya.",
      verses: ALL_VERSES.slice(0, 24),
    },
    {
      id: "tu-ch-2",
      chapterTitle: "Tat-Padārtha, Bhāgalakṣaṇā & Mahāvākya Synthesis",
      chapterTitleSanskrit: "२. तत्पदार्थ-भागलक्षणा-महावाक्यविवेकः (श्लोकाः २५–५६)",
      summary:
        "Expounds sāmānādhikaraṇya, viśeṣaṇa-viśeṣyatā, and bhāgalakṣaṇā to resolve 'Tat Tvam Asi', emphasizes the Guru's grace, and establishes the mithyātva (anirvācyatva) of duality.",
      verses: ALL_VERSES.slice(24, 56),
    },
    {
      id: "tu-ch-3",
      chapterTitle: "The Parable of Gandhāra, Ajātivāda & Jīvanmukti",
      chapterTitleSanskrit: "३. गान्धारदृष्टान्त-जीवन्मुक्ति-निष्ठा (श्लोकाः ५७–८७)",
      summary:
        "Retells the Chāndogya parable of the blindfolded man from Gandhāra, affirms Gauḍapāda's Ajātivāda and Jīvanmukti, and closes with Bhāvādvaita versus Kriyādvaita and reverence for the Guru.",
      verses: ALL_VERSES.slice(56, 87),
    },
  ],
};
