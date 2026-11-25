import { ParamparaId } from "./types";

export interface TraditionTreeNode {
  id: string;
  sanskritTitle: string;
  iastTitle: string;
  englishSubtitle?: string;
  author?: string;
  century?: string;
  paramparaId?: ParamparaId;
  /** Exact ID in PRESEEDED_GRANTHAS if the text exists on this site */
  granthaId?: string;
  /** Optional specific chapter ID inside that grantha (e.g. Mandukya Karika Prakaranas or Brahma Sutra Adhyayas) */
  chapterId?: string;
  /** Clarifying note when linking to a parent text containing extracts/commentaries */
  readerNote?: string;
  /** Whether this branch starts expanded in the default view */
  defaultExpanded?: boolean;
  children?: TraditionTreeNode[];
}

export const TRADITION_BRANCH_FILTERS: {
  id: string;
  label: string;
  sanskritLabel: string;
  nodeId: string;
}[] = [
  { id: "all", label: "All Traditions", sanskritLabel: "सम्पूर्ण-वेदान्तः", nodeId: "vedanta-root" },
  { id: "prasthanatrayi", label: "Prasthānatrayī", sanskritLabel: "प्रस्थानत्रयम्", nodeId: "prasthanatrayi-root" },
  { id: "advaita", label: "Advaita", sanskritLabel: "केवलाद्वैतम्", nodeId: "advaita-root" },
  { id: "visistadvaita", label: "Viśiṣṭādvaita", sanskritLabel: "विशिष्टाद्वैतम्", nodeId: "visistadvaita-root" },
  { id: "dvaita", label: "Dvaita", sanskritLabel: "द्वैतम्", nodeId: "dvaita-root" },
  { id: "suddhadvaita", label: "Śuddhādvaita", sanskritLabel: "शुद्धाद्वैतम्", nodeId: "suddhadvaita-root" },
  { id: "dvaitadvaita", label: "Dvaitādvaita", sanskritLabel: "द्वैताद्वैतम्", nodeId: "dvaitadvaita-root" },
  { id: "acintya", label: "Acintya Bhedābheda", sanskritLabel: "अचिन्त्यभेदाभेदः", nodeId: "acintya-root" },
  { id: "sakta", label: "Śāktaviśiṣṭādvaita", sanskritLabel: "शाक्तविशिष्टाद्वैतम्", nodeId: "sakta-root" },
  { id: "swaminarayan", label: "Akṣara-Puruṣottama", sanskritLabel: "अक्षरपुरुषोत्तमम्", nodeId: "swaminarayan-root" },
  { id: "neo_vedanta", label: "Navyānubhava", sanskritLabel: "नव्यानुभव-वेदान्तः", nodeId: "neo-vedanta-root" },
];

export const VEDANTA_TRADITION_TREE: TraditionTreeNode = {
  id: "vedanta-root",
  sanskritTitle: "वेदान्त-वाङ्मयम्",
  iastTitle: "Vedānta-Vāṅmayam",
  englishSubtitle: "Complete Corpus Across All Vedānta Traditions",
  defaultExpanded: true,
  children: [
    // =========================================================
    // 1. PRASTHĀNATRAYĪ (VEDIC ŚRUTI, NYĀYA & SMṚTI ROOT)
    // =========================================================
    {
      id: "prasthanatrayi-root",
      sanskritTitle: "प्रस्थानत्रयम् (मूलम्)",
      iastTitle: "Prasthānatrayam",
      englishSubtitle: "The Triple Canonical Foundation",
      paramparaId: "vedic_root",
      defaultExpanded: true,
      children: [
        {
          id: "pt-upanishads",
          sanskritTitle: "उपनिषदः (श्रुति-प्रस्थानम्)",
          iastTitle: "Upaniṣadaḥ (Śruti Prasthāna)",
          englishSubtitle: "Revealed Upaniṣadic Corpus",
          paramparaId: "vedic_root",
          defaultExpanded: true,
          children: [
            {
              id: "pt-dashopanishad",
              sanskritTitle: "दशोपनिषदः",
              iastTitle: "Daśopaniṣadaḥ (10 Principal Upaniṣads)",
              paramparaId: "vedic_root",
              defaultExpanded: false,
              children: [
                {
                  id: "pt-isa",
                  sanskritTitle: "ईशावास्योपनिषत्",
                  iastTitle: "Īśāvāsyopaniṣad",
                  englishSubtitle: "Śukla Yajurveda (18 Mantras)",
                  paramparaId: "vedic_root",
                  granthaId: "isopanisad",
                },
                {
                  id: "pt-kena",
                  sanskritTitle: "केनोपनिषत्",
                  iastTitle: "Kenopaniṣad",
                  englishSubtitle: "Sāmaveda Talavakāra (35 Mantras)",
                  paramparaId: "vedic_root",
                  granthaId: "kenopanisad",
                },
                {
                  id: "pt-katha",
                  sanskritTitle: "कठोपनिषत्",
                  iastTitle: "Kaṭhopaniṣad",
                  englishSubtitle: "Kṛṣṇa Yajurveda (119 Mantras)",
                  paramparaId: "vedic_root",
                  granthaId: "kathopanisad",
                },
                {
                  id: "pt-prasna",
                  sanskritTitle: "प्रश्नोपनिषत्",
                  iastTitle: "Praśnopaniṣad",
                  englishSubtitle: "Atharvaveda (67 Mantras)",
                  paramparaId: "vedic_root",
                  granthaId: "prasnopanisad",
                },
                {
                  id: "pt-mundaka",
                  sanskritTitle: "मुण्डकोपनिषत्",
                  iastTitle: "Muṇḍakopaniṣad",
                  englishSubtitle: "Atharvaveda (65 Mantras)",
                  paramparaId: "vedic_root",
                  granthaId: "mundakopanisad",
                },
                {
                  id: "pt-mandukya",
                  sanskritTitle: "माण्डूक्योपनिषत्",
                  iastTitle: "Māṇḍūkyopaniṣad",
                  englishSubtitle: "Atharvaveda (12 Mantras + 215 Kārikās)",
                  paramparaId: "vedic_root",
                  granthaId: "mandukyopanisad",
                  chapterId: "mandukya-mula",
                },
                {
                  id: "pt-taittiriya",
                  sanskritTitle: "तैत्तिरीयोपनिषत्",
                  iastTitle: "Taittirīyopaniṣad",
                  englishSubtitle: "Kṛṣṇa Yajurveda (3 Vallīs)",
                  paramparaId: "vedic_root",
                  granthaId: "taittiriyopanisad",
                },
                {
                  id: "pt-aitareya",
                  sanskritTitle: "ऐतरेयोपनिषत्",
                  iastTitle: "Aitareyopaniṣad",
                  englishSubtitle: "Ṛgveda (3 Adhyāyas)",
                  paramparaId: "vedic_root",
                  granthaId: "aitareyopanisad",
                },
                {
                  id: "pt-chandogya",
                  sanskritTitle: "छान्दोग्योपनिषत्",
                  iastTitle: "Chāndogyopaniṣad",
                  englishSubtitle: "Sāmaveda (8 Adhyāyas)",
                  paramparaId: "vedic_root",
                  granthaId: "chandogyopanisad",
                },
                {
                  id: "pt-brhadaranyaka",
                  sanskritTitle: "बृहदारण्यकोपनिषत्",
                  iastTitle: "Bṛhadāraṇyakopaniṣad",
                  englishSubtitle: "Śukla Yajurveda (6 Adhyāyas)",
                  paramparaId: "vedic_root",
                  granthaId: "brhadaranyakopanisad",
                },
              ],
            },
            {
              id: "pt-itaropanishad",
              sanskritTitle: "इतरोपनिषदः",
              iastTitle: "Itaropaniṣadaḥ (Other Upaniṣads)",
              paramparaId: "vedic_root",
              children: [
                {
                  id: "pt-acamana",
                  sanskritTitle: "आचमनोपनिषत्",
                  iastTitle: "Ācamanopaniṣad",
                  englishSubtitle: "Minor Upaniṣadic Text",
                  paramparaId: "vedic_root",
                  granthaId: "acamanopanisad",
                },
                {
                  id: "pt-svetasvatara",
                  sanskritTitle: "श्वेताश्वतरोपनिषत्",
                  iastTitle: "Śvetāśvataropaniṣad",
                  englishSubtitle: "Kṛṣṇa Yajurveda",
                  paramparaId: "vedic_root",
                },
                {
                  id: "pt-kausitaki",
                  sanskritTitle: "कौषीतक्युपनिषत्",
                  iastTitle: "Kauṣītakyupaniṣad",
                  englishSubtitle: "Ṛgveda",
                  paramparaId: "vedic_root",
                },
              ],
            },
          ],
        },
        {
          id: "pt-gita",
          sanskritTitle: "श्रीमद्भगवद्गीता (स्मृति-प्रस्थानम्)",
          iastTitle: "Śrīmad Bhagavad Gītā (Smṛti Prasthāna)",
          author: "Bhagavān Śrī Kṛṣṇa / Maharṣi Vedavyāsa",
          englishSubtitle: "18 Chapters • 700 Ślokas",
          paramparaId: "vedic_root",
          granthaId: "bhagavadgita",
        },
        {
          id: "pt-brahmasutra",
          sanskritTitle: "ब्रह्मसूत्राणि (न्याय-प्रस्थानम्)",
          iastTitle: "Brahmasūtrāṇi (Nyāya Prasthāna)",
          author: "Maharṣi Bādarāyaṇa Vyāsa",
          englishSubtitle: "4 Adhyāyas • 555 Sūtras",
          paramparaId: "vedic_root",
          granthaId: "brahmasutra",
          children: [
            {
              id: "pt-bs-1",
              sanskritTitle: "प्रथमोऽध्यायः — समन्वयाध्यायः",
              iastTitle: "Adhyāya 1: Samanvaya",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-1",
            },
            {
              id: "pt-bs-2",
              sanskritTitle: "द्वितीयोऽध्यायः — अविरोधाध्यायः",
              iastTitle: "Adhyāya 2: Avirodha",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-2",
            },
            {
              id: "pt-bs-3",
              sanskritTitle: "तृतीयोऽध्यायः — साधनाध्यायः",
              iastTitle: "Adhyāya 3: Sādhana",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-3",
            },
            {
              id: "pt-bs-4",
              sanskritTitle: "चतुर्थोऽध्यायः — फलाध्यायः",
              iastTitle: "Adhyāya 4: Phala",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-4",
            },
          ],
        },
      ],
    },

    // =========================================================
    // 2. KEVALĀDVAITA VEDĀNTA (ŚĀṄKARA SAMPRADĀYA)
    // =========================================================
    {
      id: "advaita-root",
      sanskritTitle: "केवलाद्वैत-वेदान्तः (शाङ्कर-सम्प्रदायः)",
      iastTitle: "Kevalādvaita Vedānta (Śāṅkara Sampradāya)",
      author: "Ādi Śaṅkarācārya & Lineage",
      englishSubtitle: "Non-Dualism (Vivartavāda)",
      paramparaId: "advaita",
      defaultExpanded: true,
      children: [
        {
          id: "adv-prasthana",
          sanskritTitle: "प्रस्थानत्रयी-भाष्य-टीका-प्रस्थानम्",
          iastTitle: "Prasthānatrayī Bhāṣyas & Ṭīkās",
          paramparaId: "advaita",
          defaultExpanded: true,
          children: [
            {
              id: "adv-upanishads",
              sanskritTitle: "उपनिषद्भाष्याणि",
              iastTitle: "Upaniṣad Bhāṣyas",
              paramparaId: "advaita",
              defaultExpanded: false,
              children: [
                {
                  id: "adv-isa",
                  sanskritTitle: "ईशावास्योपनिषत्",
                  iastTitle: "Īśāvāsyopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "isopanisad",
                  children: [
                    {
                      id: "adv-isa-bhashya",
                      sanskritTitle: "ईशावास्योपनिषद्भाष्यम्",
                      iastTitle: "Īśāvāsyopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "isopanisad",
                      readerNote: "Opens Īśāvāsyopaniṣad with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-isa-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                      ],
                    },
                  ],
                },
                {
                  id: "adv-kena",
                  sanskritTitle: "केनोपनिषत्",
                  iastTitle: "Kenopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "kenopanisad",
                  children: [
                    {
                      id: "adv-kena-bhashya",
                      sanskritTitle: "केनोपनिषत्पदभाष्यं वाक्यभाष्यं च",
                      iastTitle: "Kenopaniṣad Pada & Vākya Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "kenopanisad",
                      readerNote: "Opens Kenopaniṣad with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-kena-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                      ],
                    },
                  ],
                },
                {
                  id: "adv-katha",
                  sanskritTitle: "कठोपनिषत्",
                  iastTitle: "Kaṭhopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "kathopanisad",
                  children: [
                    {
                      id: "adv-katha-bhashya",
                      sanskritTitle: "कठोपनिषद्भाष्यम्",
                      iastTitle: "Kaṭhopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "kathopanisad",
                      readerNote: "Opens Kaṭhopaniṣad with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-katha-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                      ],
                    },
                  ],
                },
                {
                  id: "adv-prasna",
                  sanskritTitle: "प्रश्नोपनिषत्",
                  iastTitle: "Praśnopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "prasnopanisad",
                  children: [
                    {
                      id: "adv-prasna-bhashya",
                      sanskritTitle: "प्रश्नोपनिषद्भाष्यम्",
                      iastTitle: "Praśnopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "prasnopanisad",
                      readerNote: "Opens Praśnopaniṣad with Śāṅkarabhāṣya extracts",
                    },
                  ],
                },
                {
                  id: "adv-mundaka",
                  sanskritTitle: "मुण्डकोपनिषत्",
                  iastTitle: "Muṇḍakopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "mundakopanisad",
                  children: [
                    {
                      id: "adv-mundaka-bhashya",
                      sanskritTitle: "मुण्डकोपनिषद्भाष्यम्",
                      iastTitle: "Muṇḍakopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "mundakopanisad",
                      readerNote: "Opens Muṇḍakopaniṣad with Śāṅkarabhāṣya extracts",
                    },
                  ],
                },
                {
                  id: "adv-mandukya",
                  sanskritTitle: "माण्डूक्योपनिषत्",
                  iastTitle: "Māṇḍūkyopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "mandukyopanisad",
                  chapterId: "mandukya-mula",
                  children: [
                    {
                      id: "adv-gaudapada-karika",
                      sanskritTitle: "गौडपादीयकारिकाः (२१५ कारिकाः)",
                      iastTitle: "Gauḍapādīya Kārikā (215 Kārikās)",
                      author: "Śrī Gauḍapādācārya",
                      century: "6th–7th Century CE",
                      granthaId: "mandukyopanisad",
                      chapterId: "mandukya-agama",
                      children: [
                        {
                          id: "adv-gk-agama",
                          sanskritTitle: "१. आगमप्रकरणम्",
                          iastTitle: "1. Āgama Prakaraṇam",
                          granthaId: "mandukyopanisad",
                          chapterId: "mandukya-agama",
                        },
                        {
                          id: "adv-gk-vaitathya",
                          sanskritTitle: "२. वैतथ्यप्रकरणम्",
                          iastTitle: "2. Vaitathya Prakaraṇam",
                          granthaId: "mandukyopanisad",
                          chapterId: "mandukya-vaitathya",
                        },
                        {
                          id: "adv-gk-advaita",
                          sanskritTitle: "३. अद्वैतप्रकरणम्",
                          iastTitle: "3. Advaita Prakaraṇam",
                          granthaId: "mandukyopanisad",
                          chapterId: "mandukya-advaita",
                        },
                        {
                          id: "adv-gk-alatashanti",
                          sanskritTitle: "४. अलातशान्तिप्रकरणम्",
                          iastTitle: "4. Alātaśānti Prakaraṇam",
                          granthaId: "mandukyopanisad",
                          chapterId: "mandukya-alatashanti",
                        },
                      ],
                    },
                    {
                      id: "adv-mandukya-bhashya",
                      sanskritTitle: "माण्डूक्योपनिषद्भाष्यम्",
                      iastTitle: "Māṇḍūkyopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "mandukyopanisad",
                      readerNote: "Opens Māṇḍūkya & Kārikā with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-mandukya-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                      ],
                    },
                  ],
                },
                {
                  id: "adv-taittiriya",
                  sanskritTitle: "तैत्तिरीयोपनिषत्",
                  iastTitle: "Taittirīyopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "taittiriyopanisad",
                  children: [
                    {
                      id: "adv-taittiriya-bhashya",
                      sanskritTitle: "तैत्तिरीयोपनिषद्भाष्यम्",
                      iastTitle: "Taittirīyopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "taittiriyopanisad",
                      readerNote: "Opens Taittirīyopaniṣad with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-tai-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                        { id: "adv-tai-vartika", sanskritTitle: "तैत्तिरीयोपनिषद्भाष्यवार्तिकम्", iastTitle: "Taittirīya-Bhāṣya-Vārtikam", author: "Sureśvarācārya" },
                        { id: "adv-tai-vanamala", sanskritTitle: "वनमालाव्याख्या", iastTitle: "Vanamālā Vyākhyā", author: "Acyutakṛṣṇānanda Tīrtha" },
                      ],
                    },
                  ],
                },
                {
                  id: "adv-aitareya",
                  sanskritTitle: "ऐतरेयोपनिषत्",
                  iastTitle: "Aitareyopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "aitareyopanisad",
                  children: [
                    {
                      id: "adv-aitareya-bhashya",
                      sanskritTitle: "ऐतरेयोपनिषद्भाष्यम्",
                      iastTitle: "Aitareyopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "aitareyopanisad",
                      readerNote: "Opens Aitareyopaniṣad with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-ait-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                      ],
                    },
                  ],
                },
                {
                  id: "adv-chandogya",
                  sanskritTitle: "छान्दोग्योपनिषत्",
                  iastTitle: "Chāndogyopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "chandogyopanisad",
                  children: [
                    {
                      id: "adv-chandogya-bhashya",
                      sanskritTitle: "छान्दोग्योपनिषद्भाष्यम्",
                      iastTitle: "Chāndogyopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "chandogyopanisad",
                      readerNote: "Opens Chāndogyopaniṣad with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-cha-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                      ],
                    },
                  ],
                },
                {
                  id: "adv-brhadaranyaka",
                  sanskritTitle: "बृहदारण्यकोपनिषत्",
                  iastTitle: "Bṛhadāraṇyakopaniṣad",
                  paramparaId: "advaita",
                  granthaId: "brhadaranyakopanisad",
                  children: [
                    {
                      id: "adv-brhad-bhashya",
                      sanskritTitle: "बृहदारण्यकोपनिषद्भाष्यम्",
                      iastTitle: "Bṛhadāraṇyakopaniṣad-Bhāṣyam",
                      author: "Ādi Śaṅkarācārya",
                      granthaId: "brhadaranyakopanisad",
                      readerNote: "Opens Bṛhadāraṇyakopaniṣad with Śāṅkarabhāṣya extracts",
                      children: [
                        { id: "adv-brh-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                        { id: "adv-brh-vartika", sanskritTitle: "बृहदारण्यकोपनिषद्भाष्यवार्तिकम्", iastTitle: "Bṛhadāraṇyaka-Bhāṣya-Vārtikam", author: "Sureśvarācārya" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "adv-gita-branch",
              sanskritTitle: "श्रीमद्भगवद्गीता",
              iastTitle: "Śrīmad Bhagavad Gītā",
              granthaId: "bhagavadgita",
              children: [
                {
                  id: "adv-gita-bhashya",
                  sanskritTitle: "श्रीमद्भगवद्गीताभाष्यम्",
                  iastTitle: "Śrīmad Bhagavadgītā-Bhāṣyam",
                  author: "Ādi Śaṅkarācārya",
                  granthaId: "bhagavadgita",
                  readerNote: "Opens Bhagavad Gītā with Śāṅkarabhāṣya extracts",
                  children: [
                    { id: "adv-gita-ananda", sanskritTitle: "आनन्दगिरिटीका", iastTitle: "Ānandagiri Ṭīkā", author: "Ānandagiri" },
                    { id: "adv-gita-gudartha", sanskritTitle: "गूढार्थदीपिका", iastTitle: "Gūḍhārtha Dīpikā", author: "Madhusūdana Sarasvatī" },
                  ],
                },
              ],
            },
            {
              id: "adv-bs-branch",
              sanskritTitle: "ब्रह्मसूत्राणि",
              iastTitle: "Brahmasūtrāṇi",
              granthaId: "brahmasutra",
              children: [
                {
                  id: "adv-bs-bhashya",
                  sanskritTitle: "ब्रह्मसूत्रशाङ्करभाष्यम् (शारीरकभाष्यम्)",
                  iastTitle: "Brahmasūtra-Śāṅkarabhāṣyam",
                  author: "Ādi Śaṅkarācārya",
                  century: "8th Century CE",
                  granthaId: "brahmasutra",
                  readerNote: "Opens Brahma Sūtras with Śāṅkarabhāṣya extracts & Ṭīkās",
                  children: [
                    {
                      id: "adv-bs-nyayanirnaya",
                      sanskritTitle: "न्यायनिर्णयव्याख्या",
                      iastTitle: "Nyāyanirṇaya Vyākhyā",
                      author: "Ānandagiri",
                      century: "13th Century CE",
                    },
                    {
                      id: "adv-bs-pancapadika",
                      sanskritTitle: "पञ्चपादिका",
                      iastTitle: "Pañcapādikā (Vivaraṇa Prasthāna)",
                      author: "Padmapādācārya",
                      century: "8th–9th Century CE",
                      children: [
                        {
                          id: "adv-bs-vivarana",
                          sanskritTitle: "पञ्चपादिकाविवरणम्",
                          iastTitle: "Pañcapādikā-Vivaraṇam",
                          author: "Prakāśātmayati",
                          century: "10th Century CE",
                          children: [
                            { id: "adv-bs-vaktavyakasika", sanskritTitle: "वक्तव्यकाशिका / तत्त्वदीपनम्", iastTitle: "Vaktavyakāśikā / Tattvadīpanam" },
                          ],
                        },
                      ],
                    },
                    {
                      id: "adv-bs-bhamati",
                      sanskritTitle: "भामतीव्याख्या",
                      iastTitle: "Bhāmatī Vyākhyā (Bhāmatī Prasthāna)",
                      author: "Vācaspati Miśra",
                      century: "9th–10th Century CE",
                      children: [
                        {
                          id: "adv-bs-kalpataru",
                          sanskritTitle: "वेदान्तकल्पतरुः",
                          iastTitle: "Vedāntakalpataruḥ",
                          author: "Amalānanda",
                          century: "13th Century CE",
                          children: [
                            {
                              id: "adv-bs-parimala",
                              sanskritTitle: "कल्पतरुपरिमलः",
                              iastTitle: "Kalpataru-Parimalaḥ",
                              author: "Appayya Dīkṣita",
                              century: "16th Century CE",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "adv-bs-ratnaprabha",
                      sanskritTitle: "भाष्यरत्नप्रभाव्याख्या",
                      iastTitle: "Bhāṣya-Ratnaprabhā Vyākhyā",
                      author: "Govindānanda Sarasvatī",
                      century: "16th Century CE",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "adv-sankara-prakarana",
          sanskritTitle: "श्रीमच्छङ्करभगवत्पादविरचिताः प्रकरणग्रन्थाः",
          iastTitle: "Śaṅkara Prakaraṇa Granthas",
          paramparaId: "advaita",
          defaultExpanded: true,
          children: [
            {
              id: "adv-vivekacudamani",
              sanskritTitle: "विवेकचूडामणिः",
              iastTitle: "Vivekacūḍāmaṇi",
              author: "Ādi Śaṅkarācārya",
              century: "8th Century CE",
              paramparaId: "advaita",
              granthaId: "vivekacudamani",
            },
            {
              id: "adv-tattvabodha",
              sanskritTitle: "तत्त्वबोधः",
              iastTitle: "Tattvabodhaḥ",
              author: "Ādi Śaṅkarācārya (Trad.)",
              paramparaId: "advaita",
              granthaId: "tattvabodha",
            },
            {
              id: "adv-mahavakyam",
              sanskritTitle: "महावाक्यम् (निवृत्तिभाष्यम्)",
              iastTitle: "Mahāvākyam (Nivṛttibhāṣyam)",
              author: "Ādi Śaṅkarācārya (Trad.)",
              paramparaId: "advaita",
              granthaId: "mahavakyam",
            },
            { id: "adv-upadesasahasri", sanskritTitle: "उपदेशसाहस्री", iastTitle: "Upadeśasāhasrī", author: "Ādi Śaṅkarācārya" },
            { id: "adv-aparokshanubhuti", sanskritTitle: "अपरोक्षानुभूतिः", iastTitle: "Aparokṣānubhūtiḥ", author: "Ādi Śaṅkarācārya" },
            { id: "adv-atmabodha", sanskritTitle: "आत्मबोधः", iastTitle: "Ātmabodhaḥ", author: "Ādi Śaṅkarācārya" },
            { id: "adv-hastamalaka", sanskritTitle: "हस्तामलकीयभाष्यम्", iastTitle: "Hastāmalakīyabhāṣyam" },
            { id: "adv-sarvavedanta", sanskritTitle: "सर्ववेदान्तसिद्धान्तसारसङ्ग्रहः", iastTitle: "Sarvavedāntasiddhāntasārasaṅgrahaḥ" },
            { id: "adv-satasloki", sanskritTitle: "शतश्लोकी", iastTitle: "Śataślokī" },
          ],
        },
        {
          id: "adv-stotras",
          sanskritTitle: "श्रीमच्छङ्करभगवत्पादविरचितानि स्तोत्राणि",
          iastTitle: "Śaṅkara Stotras",
          paramparaId: "advaita",
          children: [
            { id: "adv-daksinamurti-stotra", sanskritTitle: "श्रीदक्षिणामूर्तिस्तोत्रम्", iastTitle: "Śrī Dakṣiṇāmūrti Stotram" },
            { id: "adv-bhajagovindam", sanskritTitle: "भजगोविन्दम् (मोहमुद्गरः)", iastTitle: "Bhaja Govindam" },
            {
              id: "adv-panjara",
              sanskritTitle: "पञ्जर-पञ्चक-स्तोत्राणि",
              iastTitle: "Pañjara & Pañcaka Stotras",
              defaultExpanded: true,
              children: [
                {
                  id: "adv-advaitapancaratnam",
                  sanskritTitle: "अद्वैतपञ्चरत्नम्",
                  iastTitle: "Advaita Pañcaratnam",
                  author: "Ādi Śaṅkarācārya",
                  century: "8th Century CE",
                  paramparaId: "advaita",
                  granthaId: "advaitapancaratnam",
                },
                { id: "adv-ganesa-panjara", sanskritTitle: "श्रीगणेशपञ्जरत्नम्", iastTitle: "Śrī Gaṇeśa Pañcaratnam" },
                { id: "adv-sivapancaksara", sanskritTitle: "शिवपञ्चाक्षरस्तोत्रम्", iastTitle: "Śiva Pañcākṣara Stotram" },
                { id: "adv-manisa", sanskritTitle: "मनीषापञ्चकम्", iastTitle: "Manīṣā Pañcakam" },
                { id: "adv-kaupina", sanskritTitle: "कौपीनपञ्चकम्", iastTitle: "Kaupīna Pañcakam" },
              ],
            },
          ],
        },
        {
          id: "adv-itara-prakarana",
          sanskritTitle: "इतरे प्रकरणग्रन्थाः (उत्तर-शाङ्कराः)",
          iastTitle: "Post-Śaṅkara Advaita Prakaraṇas",
          paramparaId: "advaita",
          defaultExpanded: true,
          children: [
            {
              id: "adv-vedantasara",
              sanskritTitle: "वेदान्तसारः",
              iastTitle: "Vedāntasāraḥ",
              author: "Sadānanda Yogīndra Sarasvatī",
              century: "15th Century CE",
              paramparaId: "advaita",
              granthaId: "vedantasara",
            },
            {
              id: "adv-vedantaparibhasa",
              sanskritTitle: "वेदान्तपरिभाषा",
              iastTitle: "Vedāntaparibhāṣā",
              author: "Dharmarāja Adhvarīndra",
              century: "17th Century CE",
              paramparaId: "advaita",
              granthaId: "vedantaparibhasa",
            },
            {
              id: "adv-jivanmuktiviveka",
              sanskritTitle: "जीवन्मुक्तिविवेकः",
              iastTitle: "Jīvanmuktivivekaḥ",
              author: "Swāmī Vidyāraṇya",
              century: "14th Century CE",
              paramparaId: "advaita",
              granthaId: "jivanmuktiviveka",
            },
            {
              id: "adv-advaitamakaranda",
              sanskritTitle: "अद्वैतमकरन्दः",
              iastTitle: "Advaitamakarandaḥ",
              author: "Lakṣmīdhara Kavi",
              paramparaId: "advaita",
              granthaId: "advaitamakaranda",
            },
            {
              id: "adv-advaitarasamanjari",
              sanskritTitle: "अद्वैतरसमञ्जरी",
              iastTitle: "Advaitarasamañjarī",
              author: "Sadāśiva Brahmendra Sarasvatī",
              century: "18th Century CE",
              paramparaId: "advaita",
              granthaId: "advaitarasamanjari",
            },
            { id: "adv-pancadasi", sanskritTitle: "पञ्चदशी", iastTitle: "Pañcadaśī", author: "Swāmī Vidyāraṇya", century: "14th Century CE" },
            { id: "adv-naiskarmyasiddhi", sanskritTitle: "नैष्कर्म्यसिद्धिः", iastTitle: "Naiṣkarmyasiddhiḥ", author: "Sureśvarācārya", century: "8th–9th Century CE" },
            {
              id: "adv-advaitasiddhi",
              sanskritTitle: "अद्वैतसिद्धिः",
              iastTitle: "Advaitasiddhiḥ",
              author: "Madhusūdana Sarasvatī",
              century: "16th Century CE",
              children: [
                { id: "adv-laghucandrika", sanskritTitle: "लघुचन्द्रिका", iastTitle: "Laghucandrikā", author: "Gauḍa Brahmānanda Sarasvatī" },
              ],
            },
            {
              id: "adv-siddhantalesa",
              sanskritTitle: "शास्त्रसिद्धान्तलेशसङ्ग्रहः",
              iastTitle: "Śāstrasiddhāntaleśasaṅgrahaḥ",
              author: "Appayya Dīkṣita",
              century: "16th Century CE",
              children: [
                { id: "adv-krsnalankara", sanskritTitle: "कृष्णालङ्कारः", iastTitle: "Kṛṣṇālaṅkāraḥ", author: "Acyutakṛṣṇānanda Tīrtha" },
              ],
            },
            { id: "adv-nyayaraksamani", sanskritTitle: "न्यायरक्षामणिः", iastTitle: "Nyāyarakṣāmaṇiḥ", author: "Appayya Dīkṣita" },
          ],
        },
      ],
    },

    // =========================================================
    // 3. VIŚIṢṬĀDVAITA (ŚRĪ SAMPRADĀYA)
    // =========================================================
    {
      id: "visistadvaita-root",
      sanskritTitle: "विशिष्टाद्वैत-वेदान्तः (श्रीसम्प्रदायः)",
      iastTitle: "Viśiṣṭādvaita Vedānta (Śrī Sampradāya)",
      author: "Śrī Rāmānujācārya & Lineage",
      englishSubtitle: "Qualified Non-Dualism (Śarīra-Śarīrī-Bhāva)",
      paramparaId: "visistadvaita",
      defaultExpanded: false,
      children: [
        {
          id: "vis-bhashya",
          sanskritTitle: "भाष्य-प्रस्थानम्",
          iastTitle: "Bhāṣya Prasthāna",
          paramparaId: "visistadvaita",
          children: [
            {
              id: "vis-sribhasya",
              sanskritTitle: "श्रीभाष्यम् (ब्रह्मसूत्रभाष्यम्)",
              iastTitle: "Śrībhāṣyam",
              author: "Bhagavad Rāmānujācārya",
              century: "11th–12th Century CE",
              paramparaId: "visistadvaita",
              granthaId: "sribhasya",
              children: [
                { id: "vis-srutaprakasika", sanskritTitle: "श्रुतप्रकाशिका", iastTitle: "Śrutaprakāśikā", author: "Sudarśana Sūri", century: "13th Century CE" },
                { id: "vis-tattvatika", sanskritTitle: "तत्त्वटीका", iastTitle: "Tattvaṭīkā", author: "Svāmī Vedānta Deśika", century: "14th Century CE" },
              ],
            },
            {
              id: "vis-gita-bhashya",
              sanskritTitle: "श्रीमद्भगवद्गीताभाष्यम्",
              iastTitle: "Gītābhāṣyam",
              author: "Śrī Rāmānujācārya",
              children: [
                { id: "vis-tatparyacandrika", sanskritTitle: "तात्पर्यचन्द्रिका", iastTitle: "Tātparyacandrikā", author: "Svāmī Vedānta Deśika" },
              ],
            },
            { id: "vis-vedarthasangraha", sanskritTitle: "वेदार्थसङ्ग्रहः", iastTitle: "Vedārthasaṅgrahaḥ", author: "Śrī Rāmānujācārya" },
            { id: "vis-vedantadipa", sanskritTitle: "वेदान्तदीपः", iastTitle: "Vedāntadīpaḥ", author: "Śrī Rāmānujācārya" },
          ],
        },
        {
          id: "vis-prakarana",
          sanskritTitle: "प्रकरण-सिद्धान्त-ग्रन्थाः",
          iastTitle: "Prakaraṇa & Siddhānta Works",
          paramparaId: "visistadvaita",
          children: [
            {
              id: "vis-yatindramatadipika",
              sanskritTitle: "यतीन्द्रमतदीपिका",
              iastTitle: "Yatīndramatadīpikā",
              author: "Śrīnivāsadāsa",
              century: "17th Century CE",
              paramparaId: "visistadvaita",
              granthaId: "yatindramatadipika",
            },
            { id: "vis-siddhitraya", sanskritTitle: "सिद्धित्रयम् (आत्म-ईश्वर-संवित्)", iastTitle: "Siddhitrayam", author: "Yāmunācārya", century: "10th–11th Century CE" },
            { id: "vis-gadyatraya", sanskritTitle: "गद्यत्रयम् (शरणागतिगद्यम्)", iastTitle: "Gadyatrayam", author: "Śrī Rāmānujācārya" },
          ],
        },
        {
          id: "vis-subschools",
          sanskritTitle: "वडकलै-तेङ्कलै-शाखाः",
          iastTitle: "Vaḍakalai & Teṅkalai Branches",
          paramparaId: "visistadvaita",
          children: [
            {
              id: "vis-vadakalai",
              sanskritTitle: "वडकलै (वेदान्तदेशिक-प्रस्थानम्)",
              iastTitle: "Vaḍakalai (Vedānta Deśika)",
              children: [
                { id: "vis-satadusani", sanskritTitle: "शतदूषणी", iastTitle: "Śatadūṣaṇī", author: "Svāmī Vedānta Deśika" },
                { id: "vis-rahasyatraya", sanskritTitle: "रहस्यत्रयसारः", iastTitle: "Rahasyatrayasāraḥ", author: "Svāmī Vedānta Deśika" },
                { id: "vis-tattvamukta", sanskritTitle: "तत्त्वमुक्ताकलापः", iastTitle: "Tattvamuktākalāpaḥ", author: "Svāmī Vedānta Deśika" },
              ],
            },
            {
              id: "vis-tenkalai",
              sanskritTitle: "तेङ्कलै (पिळ्ळै लोकाचार्य-प्रस्थानम्)",
              iastTitle: "Teṅkalai (Piḷḷai Lokācārya)",
              children: [
                { id: "vis-srivacanabhusana", sanskritTitle: "श्रीवचनभूषणम्", iastTitle: "Śrīvacanabhūṣaṇam", author: "Piḷḷai Lokācārya" },
                { id: "vis-tattvatraya", sanskritTitle: "तत्त्वत्रयम्", iastTitle: "Tattvatrayam", author: "Piḷḷai Lokācārya" },
              ],
            },
          ],
        },
      ],
    },

    // =========================================================
    // 4. DVAITA VEDĀNTA (MĀDHVA TATTVAVĀDA)
    // =========================================================
    {
      id: "dvaita-root",
      sanskritTitle: "द्वैत-वेदान्तः (माध्व-तत्त्ववादः)",
      iastTitle: "Dvaita Vedānta (Mādhva Tattvavāda)",
      author: "Śrī Madhvācārya (Ānandatīrtha)",
      englishSubtitle: "Realist Dualism (Pañcabheda)",
      paramparaId: "dvaita",
      defaultExpanded: false,
      children: [
        {
          id: "dva-sarvamula",
          sanskritTitle: "सर्वमूल-भाष्य-प्रस्थानम्",
          iastTitle: "Sarvamūla & Bhāṣya Prasthāna",
          paramparaId: "dvaita",
          children: [
            {
              id: "dva-bs-bhashya",
              sanskritTitle: "ब्रह्मसूत्रमध्वभाष्यम्",
              iastTitle: "Brahmasūtra-Madhvabhāṣyam",
              author: "Śrī Madhvācārya",
              century: "13th Century CE",
              children: [
                {
                  id: "dva-tattvaprakasika",
                  sanskritTitle: "तत्त्वप्रकाशिका",
                  iastTitle: "Tattvaprakāśikā",
                  author: "Śrī Jayatīrtha",
                  century: "14th Century CE",
                  children: [
                    { id: "dva-tatparya-candrika", sanskritTitle: "तात्पर्यचन्द्रिका", iastTitle: "Tātparyacandrikā", author: "Śrī Vyāsatīrtha" },
                    { id: "dva-bhavadipa", sanskritTitle: "भावदीपः", iastTitle: "Bhāvadīpaḥ", author: "Śrī Rāghavendra Tīrtha" },
                  ],
                },
              ],
            },
            {
              id: "dva-anuvyakhyana",
              sanskritTitle: "अणुव्याख्यानम्",
              iastTitle: "Aṇuvyākhyānam",
              author: "Śrī Madhvācārya",
              children: [
                {
                  id: "dva-nyayasudha",
                  sanskritTitle: "श्रीमन्न्यायसुधा",
                  iastTitle: "Śrīman-Nyāyasudhā",
                  author: "Śrī Jayatīrtha (Ṭīkācārya)",
                  children: [
                    { id: "dva-parimala", sanskritTitle: "न्यायसुधा-परिमलः", iastTitle: "Nyāyasudhā-Parimalaḥ", author: "Śrī Rāghavendra Swāmī" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "dva-dasaprakarana",
          sanskritTitle: "दशप्रकरणानि",
          iastTitle: "Daśa Prakaraṇas (Ten Dialectical Manuals)",
          paramparaId: "dvaita",
          children: [
            {
              id: "dva-upadhikhandana",
              sanskritTitle: "उपाधिखण्डनम्",
              iastTitle: "Upādhikhaṇḍanam",
              author: "Śrī Madhvācārya",
              century: "13th Century CE",
              paramparaId: "dvaita",
              granthaId: "upadhikhandana",
            },
            { id: "dva-mayavadakhandana", sanskritTitle: "मायावादखण्डनम्", iastTitle: "Māyāvādakhaṇḍanam", author: "Śrī Madhvācārya" },
            { id: "dva-visnutattvanirnaya", sanskritTitle: "विष्णुतत्त्वनिर्णयः", iastTitle: "Viṣṇutattvanirṇayaḥ", author: "Śrī Madhvācārya" },
            { id: "dva-tattvasankhyana", sanskritTitle: "तत्त्वसङ्ख्यानम्", iastTitle: "Tattvasaṅkhyānam", author: "Śrī Madhvācārya" },
          ],
        },
        {
          id: "dva-vyasatraya",
          sanskritTitle: "व्यासत्रय-प्रस्थानम्",
          iastTitle: "Vyāsatraya Prasthāna",
          paramparaId: "dvaita",
          children: [
            {
              id: "dva-nyayamrta",
              sanskritTitle: "न्यायामृतम्",
              iastTitle: "Nyāyāmṛtam",
              author: "Śrī Vyāsatīrtha",
              century: "15th–16th Century CE",
              paramparaId: "dvaita",
              granthaId: "nyayamrta",
              children: [
                { id: "dva-tarangini", sanskritTitle: "न्यायामृततरङ्गिणी", iastTitle: "Nyāyāmṛtataraṅgiṇī", author: "Rāmācārya" },
              ],
            },
            { id: "dva-tarkatandava", sanskritTitle: "तर्कताण्डवम्", iastTitle: "Tarkatāṇḍavam", author: "Śrī Vyāsatīrtha" },
          ],
        },
      ],
    },

    // =========================================================
    // 5. ŚUDDHĀDVAITA (VALLABHA PUṢṬIMĀRGA)
    // =========================================================
    {
      id: "suddhadvaita-root",
      sanskritTitle: "शुद्धाद्वैत-वेदान्तः (पुष्टिमार्गः)",
      iastTitle: "Śuddhādvaita Vedānta (Puṣṭimārga)",
      author: "Śrī Vallabhācārya Mahāprabhu",
      englishSubtitle: "Pure Non-Dualism (Avikṛta-Pariṇāma)",
      paramparaId: "suddhadvaita",
      defaultExpanded: false,
      children: [
        {
          id: "sud-bhashya",
          sanskritTitle: "भाष्य-निबन्ध-प्रस्थानम्",
          iastTitle: "Bhāṣya & Nibandha Prasthāna",
          paramparaId: "suddhadvaita",
          children: [
            {
              id: "sud-anubhasya",
              sanskritTitle: "अणुभाष्यम्",
              iastTitle: "Aṇubhāṣyam",
              author: "Śrī Vallabhācārya & Viṭṭhalanātha",
              century: "15th–16th Century CE",
              paramparaId: "suddhadvaita",
              granthaId: "anubhasya",
              children: [
                {
                  id: "sud-bhashyaprakasa",
                  sanskritTitle: "भाष्यप्रकाशः",
                  iastTitle: "Bhāṣyaprakāśaḥ",
                  author: "Gosvāmī Puruṣottamajī",
                  children: [
                    { id: "sud-rasmi", sanskritTitle: "रश्मिः", iastTitle: "Raśmiḥ", author: "Gopīśvara Gosvāmī" },
                  ],
                },
              ],
            },
            { id: "sud-subodhini", sanskritTitle: "श्रीसुबोधिनी (श्रीमद्भागवतव्याख्या)", iastTitle: "Śrī Subodhinī", author: "Śrī Vallabhācārya" },
            { id: "sud-tattvadipa", sanskritTitle: "तत्त्वार्थदीपनिबन्धः", iastTitle: "Tattvārthadīpanibandhaḥ", author: "Śrī Vallabhācārya" },
            { id: "sud-vidvanmandana", sanskritTitle: "विद्वन्मण्डनम्", iastTitle: "Vidvanmaṇḍanam", author: "Śrī Viṭṭhalanātha (Gusāīñjī)" },
          ],
        },
        {
          id: "sud-sodasa",
          sanskritTitle: "षोडशग्रन्थाः",
          iastTitle: "Ṣoḍaśa Granthas",
          author: "Śrī Vallabhācārya",
          children: [
            { id: "sud-siddhantamuktavali", sanskritTitle: "सिद्धान्तमुक्तावली", iastTitle: "Siddhāntamuktāvalī" },
            { id: "sud-pustipravaha", sanskritTitle: "पुष्टिप्रवाहमर्यादा", iastTitle: "Puṣṭipravāhamaryādā" },
            { id: "sud-madhurastakam", sanskritTitle: "मधुराष्टकम्", iastTitle: "Madhurāṣṭakam" },
          ],
        },
      ],
    },

    // =========================================================
    // 6. DVAITĀDVAITA (NIMBĀRKA SAMPRADĀYA)
    // =========================================================
    {
      id: "dvaitadvaita-root",
      sanskritTitle: "द्वैताद्वैत-वेदान्तः (निम्बार्क-सम्प्रदायः)",
      iastTitle: "Dvaitādvaita Vedānta (Nimbārka Sampradāya)",
      author: "Śrī Nimbārkācārya",
      englishSubtitle: "Natural Difference-in-Non-Difference (Svābhāvika Bhedābheda)",
      paramparaId: "dvaitadvaita",
      defaultExpanded: false,
      children: [
        {
          id: "nim-parijata",
          sanskritTitle: "वेदान्तपारिजातसौरभम्",
          iastTitle: "Vedānta-Pārijāta-Saurabham",
          author: "Śrī Nimbārkācārya",
          century: "11th–12th Century CE",
          paramparaId: "dvaitadvaita",
          granthaId: "vedanta-parijata-saurabha",
          children: [
            {
              id: "nim-kaustubha",
              sanskritTitle: "वेदान्तकौस्तुभः",
              iastTitle: "Vedānta-Kaustubhaḥ",
              author: "Śrī Śrīnivāsācārya",
              children: [
                { id: "nim-kaustubha-prabha", sanskritTitle: "वेदान्तकौस्तुभप्रभा", iastTitle: "Vedānta-Kaustubha-Prabhā", author: "Keśava Kāśmīrī Bhaṭṭa" },
              ],
            },
          ],
        },
        { id: "nim-dasasloki", sanskritTitle: "दशश्लोकी (सिद्धान्तरत्नम्)", iastTitle: "Daśaślokī", author: "Śrī Nimbārkācārya" },
        { id: "nim-savisesa", sanskritTitle: "सविशेषनिर्विशेषश्रीकृष्णस्तवः", iastTitle: "Saviśeṣa-Nirviśeṣa-Śrīkṛṣṇa-Stavaḥ", author: "Śrī Nimbārkācārya" },
      ],
    },

    // =========================================================
    // 7. ACINTYA BHEDĀBHEDA (GAUḌĪYA VAIṢṆAVA SAMPRADĀYA)
    // =========================================================
    {
      id: "acintya-root",
      sanskritTitle: "अचिन्त्यभेदाभेद-वेदान्तः (गौडीय-सम्प्रदायः)",
      iastTitle: "Acintyabhedābheda Vedānta (Gauḍīya Sampradāya)",
      author: "Śrī Caitanya Mahāprabhu, Ṣaḍ-Gosvāmīs & Baladeva Vidyābhūṣaṇa",
      englishSubtitle: "Inconceivable Simultaneous Oneness & Difference",
      paramparaId: "acintya",
      defaultExpanded: false,
      children: [
        {
          id: "aci-bhashya",
          sanskritTitle: "भाष्य-सिद्धान्त-प्रस्थानम्",
          iastTitle: "Bhāṣya & Siddhānta Prasthāna",
          paramparaId: "acintya",
          children: [
            {
              id: "aci-govindabhashya",
              sanskritTitle: "गोविन्दभाष्यम् (ब्रह्मसूत्रभाष्यम्)",
              iastTitle: "Govindabhāṣyam",
              author: "Śrī Baladeva Vidyābhūṣaṇa",
              century: "18th Century CE",
              children: [
                { id: "aci-suksma", sanskritTitle: "सूक्ष्मटीका", iastTitle: "Sūkṣma Ṭīkā", author: "Baladeva Vidyābhūṣaṇa" },
              ],
            },
            {
              id: "aci-siddhantaratna",
              sanskritTitle: "सिद्धान्तरत्नम्",
              iastTitle: "Siddhāntaratnam",
              author: "Śrī Baladeva Vidyābhūṣaṇa",
              century: "18th Century CE",
              paramparaId: "acintya",
              granthaId: "siddhantaratna",
            },
            { id: "aci-prameyaratnavali", sanskritTitle: "प्रमेयरत्नावली", iastTitle: "Prameyaratnāvalī", author: "Śrī Baladeva Vidyābhūṣaṇa" },
          ],
        },
        {
          id: "aci-sandarbha",
          sanskritTitle: "षट्सन्दर्भ-भक्तिरस-प्रस्थानम्",
          iastTitle: "Ṣaṭ-Sandarbha & Bhakti-Rasa",
          paramparaId: "acintya",
          children: [
            { id: "aci-tattvasandarbha", sanskritTitle: "तत्त्वसन्दर्भः (षट्सन्दर्भाः)", iastTitle: "Ṣaṭ-Sandarbhaḥ", author: "Śrī Jīva Gosvāmī" },
            { id: "aci-bhaktirasamrta", sanskritTitle: "भक्तिरसामृतसिन्धुः", iastTitle: "Bhaktirasāmṛtasindhuḥ", author: "Śrī Rūpa Gosvāmī" },
            { id: "aci-siksastakam", sanskritTitle: "शिक्षाष्टकम्", iastTitle: "Śikṣāṣṭakam", author: "Śrī Caitanya Mahāprabhu" },
          ],
        },
      ],
    },

    // =========================================================
    // 8. ŚĀKTAVIŚIṢṬĀDVAITA (BHATPARA ŚĀKTABHĀṢYA)
    // =========================================================
    {
      id: "sakta-root",
      sanskritTitle: "शाक्तविशिष्टाद्वैत-वेदान्तः (शाक्तभाष्य-प्रस्थानम्)",
      iastTitle: "Śāktaviśiṣṭādvaita (Bhatpara Śāktabhāṣya)",
      author: "MM Pañcānana Bhaṭṭācārya Tarkaratna",
      englishSubtitle: "Svarūpādvaita & Integral Tantra-Vedānta",
      paramparaId: "saktavisistadvaita",
      defaultExpanded: false,
      children: [
        {
          id: "sak-brahmasutra",
          sanskritTitle: "ब्रह्मसूत्र-शाक्तभाष्यम्",
          iastTitle: "Brahmasūtra-Śāktabhāṣyam",
          author: "MM Pañcānana Bhaṭṭācārya Tarkaratna",
          century: "20th Century CE (1938)",
          paramparaId: "saktavisistadvaita",
          granthaId: "brahmasutra-saktabhasya",
          children: [
            { id: "sak-svarupartha", sanskritTitle: "शाक्तभाष्य-स्वरूपाद्वैत-दीपिका", iastTitle: "Svarūpārtha-Dīpikā" },
            { id: "sak-tattvabodhakhya", sanskritTitle: "तत्त्वबोधाख्या-विवृतिः", iastTitle: "Tattvabodhākhyā Vivṛtiḥ" },
          ],
        },
        { id: "sak-isopanisad", sanskritTitle: "ईशोपनिषद्-शाक्तभाष्यम्", iastTitle: "Īśopaniṣad Śāktabhāṣyam", author: "MM Pañcānana Tarkaratna" },
        { id: "sak-sarvamangala", sanskritTitle: "सर्वमङ्गला महाकाव्यम्", iastTitle: "Sarvamaṅgalā Mahākāvyam", author: "MM Pañcānana Tarkaratna" },
      ],
    },

    // =========================================================
    // 9. AKṢARA-PURUṢOTTAMA DARŚANA (SVĀMINĀRĀYAṆA VEDĀNTA)
    // =========================================================
    {
      id: "swaminarayan-root",
      sanskritTitle: "अक्षरपुरुषोत्तम-वेदान्तः (स्वामिनारायण-भाष्यम्)",
      iastTitle: "Akṣara-Puruṣottama Darśana (Svāminārāyaṇa Vedānta)",
      author: "Bhagavān Svāminārāyaṇa & MM Bhadreśadāsa Svāmī",
      englishSubtitle: "Ontology of Five Eternal Realities (Pañca-Tattvas)",
      paramparaId: "swaminarayan",
      defaultExpanded: false,
      children: [
        {
          id: "swa-prasthana",
          sanskritTitle: "स्वामिनारायण-प्रस्थानत्रयी-भाष्यम्",
          iastTitle: "Swaminarayan Prasthānatrayī Bhashyam",
          paramparaId: "swaminarayan",
          children: [
            {
              id: "swa-bs-bhashya",
              sanskritTitle: "ब्रह्मसूत्र-स्वामिनारायणभाष्यम्",
              iastTitle: "Brahmasūtra-Svāminārāyaṇa-Bhāṣyam",
              author: "MM Bhadreśadāsa Svāmī",
              century: "21st Century CE",
              paramparaId: "swaminarayan",
              granthaId: "swaminarayan-brahmasutra-bhashyam",
            },
            {
              id: "swa-up-bhashya",
              sanskritTitle: "उपनिषत्-स्वामिनारायणभाष्यम्",
              iastTitle: "Upaniṣat-Svāminārāyaṇa-Bhāṣyam",
              author: "MM Bhadreśadāsa Svāmī",
              century: "21st Century CE",
              paramparaId: "swaminarayan",
              granthaId: "swaminarayan-upanishad-bhashyam",
            },
            {
              id: "swa-gita-bhashya",
              sanskritTitle: "श्रीमद्भगवद्गीता-स्वामिनारायणभाष्यम्",
              iastTitle: "Śrīmad-Bhagavad-Gītā-Svāminārāyaṇa-Bhāṣyam",
              author: "MM Bhadreśadāsa Svāmī",
              century: "21st Century CE",
              paramparaId: "swaminarayan",
              granthaId: "swaminarayan-gita-bhashyam",
            },
          ],
        },
        {
          id: "swa-siddhanta",
          sanskritTitle: "सिद्धान्त-वचनामृत-प्रस्थानम्",
          iastTitle: "Siddhānta & Vachanāmrut Canon",
          paramparaId: "swaminarayan",
          children: [
            {
              id: "swa-siddhanta-sudha",
              sanskritTitle: "स्वामिनारायण-सिद्धान्त-सुधा",
              iastTitle: "Svāminārāyaṇa-Siddhānta-Sudhā",
              author: "MM Bhadreśadāsa Svāmī",
              paramparaId: "swaminarayan",
              granthaId: "swaminarayan-siddhanta-sudha",
            },
            {
              id: "swa-vachanamrut",
              sanskritTitle: "वचनामृतम् एवं शिक्षापत्री",
              iastTitle: "Vachanāmrut & Shikshāpatrī",
              author: "Bhagavān Svāminārāyaṇa",
              century: "19th Century CE",
              paramparaId: "swaminarayan",
              granthaId: "vachanamrut",
            },
          ],
        },
      ],
    },

    // =========================================================
    // 10. NAVYĀNUBHAVA VEDĀNTA (MODERN INTEGRAL & VIJÑĀNA)
    // =========================================================
    {
      id: "neo-vedanta-root",
      sanskritTitle: "नव्यानुभव-वेदान्तः (आधुनिक-समन्वयः)",
      iastTitle: "Navyānubhava Vedānta (Modern Integral Syntheses)",
      author: "Sri Ramakrishna, Vivekananda, Aurobindo, Ramana & Modern Ācāryas",
      englishSubtitle: "Vijñāna, Practical, Integral & Vicāra Vedānta",
      paramparaId: "neo_vedanta",
      defaultExpanded: false,
      children: [
        {
          id: "neo-vijnana-practical",
          sanskritTitle: "विज्ञानवेदान्तः व्यावहारिक-वेदान्तश्च",
          iastTitle: "Vijñāna & Practical Vedānta",
          paramparaId: "neo_vedanta",
          children: [
            {
              id: "neo-vijnana-book",
              sanskritTitle: "विज्ञानवेदान्तः (अनन्तपथाः अनन्तसत्याय)",
              iastTitle: "Infinite Paths to Infinite Reality: Vijñāna Vedānta",
              author: "Ayon Maharaj (Swami Medhananda)",
              century: "21st Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "vijnana-vedanta-infinite-paths",
            },
            {
              id: "neo-practical",
              sanskritTitle: "व्यावहारिक-वेदान्तः (Practical Vedānta)",
              iastTitle: "Practical Vedānta",
              author: "Swami Vivekananda",
              century: "19th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "vivekananda-practical-vedanta",
            },
          ],
        },
        {
          id: "neo-integral-vedic",
          sanskritTitle: "पूर्ण-वेदान्तः चिन्मयप्रत्यक्षवादश्च",
          iastTitle: "Integral Vedānta & Vedic Cinmaya-Pratyakṣa",
          paramparaId: "neo_vedanta",
          children: [
            {
              id: "neo-life-divine",
              sanskritTitle: "पूर्णवेदान्तः — The Life Divine",
              iastTitle: "The Life Divine",
              author: "Sri Aurobindo",
              century: "20th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "aurobindo-life-divine",
            },
            {
              id: "neo-veda-mimamsa",
              sanskritTitle: "वेदमीमांसा (चिन्मयप्रत्यक्षवादः)",
              iastTitle: "Veda-Mīmāṁsā & Cinmayapratyakṣavāda",
              author: "Śrīmat Anirvān",
              century: "20th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "anirvan-veda-mimamsa",
            },
          ],
        },
        {
          id: "neo-saraswata-vicara",
          sanskritTitle: "सारस्वत-समन्वयः विचारमार्गश्च",
          iastTitle: "Sārasvata Samanvaya & Direct Vicāra-Mārga",
          paramparaId: "neo_vedanta",
          children: [
            {
              id: "neo-vedanta-viveka",
              sanskritTitle: "वेदान्त-विवेकः (सारस्वत-ग्रन्थावली)",
              iastTitle: "Vedānta Viveka & Sārasvata Granthāvalī",
              author: "Swami Nigamananda Saraswati",
              century: "20th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "nigamananda-vedanta-viveka",
            },
            {
              id: "neo-ulladu-narpadu",
              sanskritTitle: "सद्दर्शनम् (उल्लदु नाऱ्पदु)",
              iastTitle: "Uḷḷadu Nāṟpadu (Sad-Darśanam)",
              author: "Bhagavan Sri Ramana Maharshi",
              century: "20th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "ramana-ulladu-narpadu",
            },
          ],
        },
        {
          id: "neo-academic-gita",
          sanskritTitle: "दार्शनिक-मीमांसा एवं गीता-दीपिका",
          iastTitle: "Phenomenological Vedānta & Modern Exegesis",
          paramparaId: "neo_vedanta",
          children: [
            {
              id: "neo-kcb",
              sanskritTitle: "आत्मस्वातन्य्र्यवादः (The Subject as Freedom)",
              iastTitle: "The Subject as Freedom & Studies in Vedantism",
              author: "Krishna Chandra Bhattacharyya",
              century: "20th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "kc-bhattacharya-subject-freedom",
            },
            {
              id: "neo-holy-geeta",
              sanskritTitle: "श्रीमद्भगवद्गीता-दीपिका (The Holy Geeta)",
              iastTitle: "The Holy Geeta",
              author: "Swami Chinmayananda",
              century: "20th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "chinmayananda-holy-geeta",
            },
            {
              id: "neo-radhakrishnan",
              sanskritTitle: "आदर्शवादी जीवनदर्शनम् (An Idealist View of Life)",
              iastTitle: "An Idealist View of Life",
              author: "Dr. Sarvepalli Radhakrishnan",
              century: "20th Century CE",
              paramparaId: "neo_vedanta",
              granthaId: "radhakrishnan-idealist-view",
            },
          ],
        },
      ],
    },
  ],
};
