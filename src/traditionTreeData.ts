import { ParamparaId } from "./types";

export type TreeNodeKind =
  | "root"
  | "branch"
  | "mula"
  | "bhashya"
  | "tika"
  | "prakarana"
  | "stotra";

export interface TraditionTreeNode {
  id: string;
  sanskritTitle: string;
  iastTitle: string;
  englishSubtitle?: string;
  author?: string;
  century?: string;
  paramparaId?: ParamparaId;
  /** Semantic classification of the tree node */
  nodeKind?: TreeNodeKind;
  /** When opening a commentary/tika node in Simple or Scholarly reader, which school commentary to display */
  commentaryParamparaId?: ParamparaId;
  /** Optional hint matching a specific Ṭīkā (e.g., "Ānandagiri", "Bhāmatī", "Vivaraṇa") */
  tikaMatchKey?: string;
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
  { id: "advaita", label: "Śāṅkarādvaita", sanskritLabel: "शाङ्कराद्वैतम्", nodeId: "advaita-root" },
  { id: "visistadvaita", label: "Viśiṣṭādvaita", sanskritLabel: "विशिष्टाद्वैतम्", nodeId: "visistadvaita-root" },
  { id: "dvaita", label: "Dvaita", sanskritLabel: "द्वैतम्", nodeId: "dvaita-root" },
  { id: "suddhadvaita", label: "Śuddhādvaita", sanskritLabel: "शुद्धाद्वैतम्", nodeId: "suddhadvaita-root" },
  { id: "dvaitadvaita", label: "Dvaitādvaita", sanskritLabel: "द्वैताद्वैतम्", nodeId: "dvaitadvaita-root" },
  { id: "acintya", label: "Acintya Bhedābheda", sanskritLabel: "अचिन्त्यभेदाभेदः", nodeId: "acintya-root" },
  { id: "sakta", label: "Śāktaviśiṣṭādvaita", sanskritLabel: "शाक्तविशिष्टाद्वैतम्", nodeId: "sakta-root" },
  { id: "swaminarayan", label: "Akṣara-Puruṣottama", sanskritLabel: "अक्षरपुरुषोत्तमम्", nodeId: "swaminarayan-root" },
  { id: "neo_vedanta", label: "Navyānubhava", sanskritLabel: "नव्यानुभव-वेदान्तः", nodeId: "neo-vedanta-root" },
];

/** Canonical 10 Mukhya Upaniṣads metadata used across every Vedānta tradition's identical skeleton */
interface UpanisadSkeletonEntry {
  key: string;
  sanskritTitle: string;
  iastTitle: string;
  granthaId: string;
  chapterId?: string;
  stemSanskrit: string;
  stemIast: string;
}

const TEN_UPANISADS: UpanisadSkeletonEntry[] = [
  {
    key: "isa",
    sanskritTitle: "ईशावास्योपनिषत्",
    iastTitle: "Īśāvāsyopaniṣad",
    granthaId: "isopanisad",
    stemSanskrit: "ईशावास्योपनिषद्",
    stemIast: "Īśāvāsyopaniṣad",
  },
  {
    key: "kena",
    sanskritTitle: "केनोपनिषत्",
    iastTitle: "Kenopaniṣad",
    granthaId: "kenopanisad",
    stemSanskrit: "केनोपनिषद्",
    stemIast: "Kenopaniṣad",
  },
  {
    key: "katha",
    sanskritTitle: "कठोपनिषत्",
    iastTitle: "Kaṭhopaniṣad",
    granthaId: "kathopanisad",
    stemSanskrit: "कठोपनिषद्",
    stemIast: "Kaṭhopaniṣad",
  },
  {
    key: "prasna",
    sanskritTitle: "प्रश्नोपनिषत्",
    iastTitle: "Praśnopaniṣad",
    granthaId: "prasnopanisad",
    stemSanskrit: "प्रश्नोपनिषद्",
    stemIast: "Praśnopaniṣad",
  },
  {
    key: "mundaka",
    sanskritTitle: "मुण्डकोपनिषत्",
    iastTitle: "Muṇḍakopaniṣad",
    granthaId: "mundakopanisad",
    stemSanskrit: "मुण्डकोपनिषद्",
    stemIast: "Muṇḍakopaniṣad",
  },
  {
    key: "mandukya",
    sanskritTitle: "माण्डूक्योपनिषत्",
    iastTitle: "Māṇḍūkyopaniṣad",
    granthaId: "mandukyopanisad",
    chapterId: "mandukya-mula",
    stemSanskrit: "माण्डूक्योपनिषद्",
    stemIast: "Māṇḍūkyopaniṣad",
  },
  {
    key: "taittiriya",
    sanskritTitle: "तैत्तिरीयोपनिषत्",
    iastTitle: "Taittirīyopaniṣad",
    granthaId: "taittiriyopanisad",
    stemSanskrit: "तैत्तिरीयोपनिषद्",
    stemIast: "Taittirīyopaniṣad",
  },
  {
    key: "aitareya",
    sanskritTitle: "ऐतरेयोपनिषत्",
    iastTitle: "Aitareyopaniṣad",
    granthaId: "aitareyopanisad",
    stemSanskrit: "ऐतरेयोपनिषद्",
    stemIast: "Aitareyopaniṣad",
  },
  {
    key: "chandogya",
    sanskritTitle: "छान्दोग्योपनिषत्",
    iastTitle: "Chāndogyopaniṣad",
    granthaId: "chandogyopanisad",
    stemSanskrit: "छान्दोग्योपनिषद्",
    stemIast: "Chāndogyopaniṣad",
  },
  {
    key: "brhadaranyaka",
    sanskritTitle: "बृहदारण्यकोपनिषत्",
    iastTitle: "Bṛhadāraṇyakopaniṣad",
    granthaId: "brhadaranyakopanisad",
    stemSanskrit: "बृहदारण्यकोपनिषद्",
    stemIast: "Bṛhadāraṇyakopaniṣad",
  },
];

interface UniformTraditionSpec {
  rootId: string;
  prefix: string;
  sanskritTitle: string;
  iastTitle: string;
  author: string;
  englishSubtitle: string;
  paramparaId: ParamparaId;
  commentaryParamparaId: ParamparaId;
  defaultExpanded?: boolean;
  founderPrakaranasTitleSanskrit: string;
  founderPrakaranasTitleIast: string;
  founderStotrasTitleSanskrit: string;
  founderStotrasTitleIast: string;
  otherPrakaranasTitleSanskrit: string;
  otherPrakaranasTitleIast: string;
  buildUpanisadBranch: (u: UpanisadSkeletonEntry) => TraditionTreeNode[];
  gitaBhashyas: TraditionTreeNode[];
  brahmasutraBhashyas: TraditionTreeNode[];
  founderPrakaranas: TraditionTreeNode[];
  founderStotras: TraditionTreeNode[];
  otherPrakaranas: TraditionTreeNode[];
}

function buildUniformTraditionTree(spec: UniformTraditionSpec): TraditionTreeNode {
  return {
    id: spec.rootId,
    sanskritTitle: spec.sanskritTitle,
    iastTitle: spec.iastTitle,
    author: spec.author,
    englishSubtitle: spec.englishSubtitle,
    paramparaId: spec.paramparaId,
    nodeKind: "root",
    defaultExpanded: spec.defaultExpanded ?? false,
    children: [
      // 1. प्रस्थानत्रयम् (उपनिषदः, श्रीमद्भगवद्गीता, ब्रह्मसूत्राणि)
      {
        id: `${spec.prefix}-prasthana`,
        sanskritTitle: "प्रस्थानत्रयम्",
        iastTitle: "Prasthānatrayam",
        englishSubtitle: "Upaniṣads, Bhagavad Gītā & Brahma Sūtras",
        paramparaId: spec.paramparaId,
        nodeKind: "branch",
        defaultExpanded: true,
        children: [
          {
            id: `${spec.prefix}-upanishads`,
            sanskritTitle: "उपनिषदः",
            iastTitle: "Upaniṣadaḥ",
            paramparaId: spec.paramparaId,
            nodeKind: "branch",
            defaultExpanded: true,
            children: TEN_UPANISADS.map((u) => ({
              id: `${spec.prefix}-up-${u.key}`,
              sanskritTitle: u.sanskritTitle,
              iastTitle: u.iastTitle,
              paramparaId: spec.paramparaId,
              nodeKind: "mula" as const,
              granthaId: u.granthaId,
              chapterId: u.chapterId,
              children: spec.buildUpanisadBranch(u),
            })),
          },
          {
            id: `${spec.prefix}-gita-branch`,
            sanskritTitle: "श्रीमद्भगवद्गीता",
            iastTitle: "Śrīmad Bhagavad Gītā",
            paramparaId: spec.paramparaId,
            nodeKind: "mula",
            granthaId: "bhagavadgita",
            defaultExpanded: true,
            children: spec.gitaBhashyas,
          },
          {
            id: `${spec.prefix}-bs-branch`,
            sanskritTitle: "ब्रह्मसूत्राणि",
            iastTitle: "Brahmasūtrāṇi",
            paramparaId: spec.paramparaId,
            nodeKind: "mula",
            granthaId: "brahmasutra",
            defaultExpanded: true,
            children: spec.brahmasutraBhashyas,
          },
        ],
      },
      // 2. [Founder/Preceptor]-विरचिताः प्रकरणग्रन्थाः
      {
        id: `${spec.prefix}-founder-prakarana`,
        sanskritTitle: spec.founderPrakaranasTitleSanskrit,
        iastTitle: spec.founderPrakaranasTitleIast,
        paramparaId: spec.paramparaId,
        nodeKind: "branch",
        defaultExpanded: true,
        children: spec.founderPrakaranas,
      },
      // 3. [Founder/Preceptor]-विरचितानि स्तोत्राणि
      {
        id: `${spec.prefix}-founder-stotras`,
        sanskritTitle: spec.founderStotrasTitleSanskrit,
        iastTitle: spec.founderStotrasTitleIast,
        paramparaId: spec.paramparaId,
        nodeKind: "branch",
        defaultExpanded: true,
        children: spec.founderStotras,
      },
      // 4. इतरे प्रकरणग्रन्थाः
      {
        id: `${spec.prefix}-itara-prakarana`,
        sanskritTitle: spec.otherPrakaranasTitleSanskrit,
        iastTitle: spec.otherPrakaranasTitleIast,
        paramparaId: spec.paramparaId,
        nodeKind: "branch",
        defaultExpanded: true,
        children: spec.otherPrakaranas,
      },
    ],
  };
}

// =========================================================
// 1. ŚĀṄKARĀDVAITA (ADVAITA ŚĀRADĀ CANONICAL TREE)
// =========================================================
const ADVAITA_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "advaita-root",
  prefix: "adv",
  sanskritTitle: "अद्वैतशारदा (शाङ्कराद्वैतम्)",
  iastTitle: "Advaita Śāradā (Śāṅkarādvaita Vedānta)",
  author: "Ādi Śaṅkarācārya & Lineage",
  englishSubtitle: "Kevalādvaita Sampradāya (Vivartavāda)",
  paramparaId: "advaita",
  commentaryParamparaId: "advaita",
  defaultExpanded: true,
  founderPrakaranasTitleSanskrit: "श्रीमच्छङ्करभगवत्पूज्यपादविरचिताः प्रकरणग्रन्थाः",
  founderPrakaranasTitleIast: "Śaṅkara Prakaraṇa Granthas",
  founderStotrasTitleSanskrit: "श्रीमच्छङ्करभगवत्पूज्यपादविरचितानि स्तोत्राणि",
  founderStotrasTitleIast: "Śaṅkara Stotras, Pañcakas & Laharīs",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other / Post-Śaṅkara Advaita Prakaraṇas",
  buildUpanisadBranch: (u) => {
    if (u.key === "isa") {
      return [
        {
          id: "adv-isa-bhashya",
          sanskritTitle: "ईशावास्योपनिषद्भाष्यम्",
          iastTitle: "Īśāvāsyopaniṣad-Bhāṣyam",
          author: "Ādi Śaṅkarācārya",
          paramparaId: "advaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "advaita",
          granthaId: "isopanisad",
          readerNote: "Complete Śāṅkarabhāṣya (Upodghāta, Mantras 1–18 & Colophon)",
          children: [
            {
              id: "adv-isa-ananda",
              sanskritTitle: "आनन्दगिरिटीका",
              iastTitle: "Ānandagiri Ṭīkā",
              author: "Ānandagiri",
              century: "13th Century CE",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Ānandagiri",
              granthaId: "isopanisad",
              readerNote: "Śāṅkarabhāṣya with complete verbatim Ānandagiri Ṭīkā",
            },
          ],
        },
      ];
    }
    if (u.key === "kena") {
      return [
        {
          id: "adv-kena-bhashya",
          sanskritTitle: "केनोपनिषत्पदभाष्यं वाक्यभाष्यं च",
          iastTitle: "Kenopaniṣad Pada & Vākya Bhāṣyam",
          author: "Ādi Śaṅkarācārya",
          paramparaId: "advaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "advaita",
          granthaId: "kenopanisad",
          readerNote: "Complete Śāṅkara Padabhāṣya and Vākyabhāṣya across Khaṇḍas 1–4",
          children: [
            {
              id: "adv-kena-ananda",
              sanskritTitle: "आनन्दगिरिटीका (पदभाष्यटिप्पणं वाक्यभाष्यविवरणं च)",
              iastTitle: "Ānandagiri Ṭīkā & Vākyabhāṣya-Vivaraṇa",
              author: "Ānandagiri",
              century: "13th Century CE",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Ānandagiri",
              granthaId: "kenopanisad",
              readerNote: "Padabhāṣya-Ṭīkā & Vākyabhāṣya-Vivaraṇa across all 4 Khaṇḍas",
            },
          ],
        },
      ];
    }
    if (u.key === "katha") {
      return [
        {
          id: "adv-katha-bhashya",
          sanskritTitle: "कठोपनिषद्भाष्यम्",
          iastTitle: "Kaṭhopaniṣad-Bhāṣyam",
          author: "Ādi Śaṅkarācārya",
          paramparaId: "advaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "advaita",
          granthaId: "kathopanisad",
          readerNote: "Verbatim Śāṅkarabhāṣya across Adhyāya 1 (Vallīs 1–3) & 2.1–2.2.4",
          children: [
            {
              id: "adv-katha-ananda",
              sanskritTitle: "आनन्दगिरिटीका",
              iastTitle: "Ānandagiri Ṭīkā",
              author: "Ānandagiri",
              century: "13th Century CE",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Ānandagiri",
              granthaId: "kathopanisad",
              readerNote: "Verbatim Ānandagiri Ṭīkā across Adhyāya 1 (Vallīs 1–3)",
            },
          ],
        },
      ];
    }
    if (u.key === "mandukya") {
      return [
        {
          id: "adv-gaudapada-karika",
          sanskritTitle: "गौडपादीयकारिकाः (२१५ कारिकाः)",
          iastTitle: "Gauḍapādīya Kārikā (215 Kārikās)",
          author: "Śrī Gauḍapādācārya",
          century: "6th–7th Century CE",
          paramparaId: "advaita",
          nodeKind: "mula",
          granthaId: "mandukyopanisad",
          chapterId: "mandukya-agama",
          children: [
            { id: "adv-gk-agama", sanskritTitle: "१. आगमप्रकरणम्", iastTitle: "1. Āgama Prakaraṇam", nodeKind: "mula", granthaId: "mandukyopanisad", chapterId: "mandukya-agama" },
            { id: "adv-gk-vaitathya", sanskritTitle: "२. वैतथ्यप्रकरणम्", iastTitle: "2. Vaitathya Prakaraṇam", nodeKind: "mula", granthaId: "mandukyopanisad", chapterId: "mandukya-vaitathya" },
            { id: "adv-gk-advaita", sanskritTitle: "३. अद्वैतप्रकरणम्", iastTitle: "3. Advaita Prakaraṇam", nodeKind: "mula", granthaId: "mandukyopanisad", chapterId: "mandukya-advaita" },
            { id: "adv-gk-alatashanti", sanskritTitle: "४. अलातशान्तिप्रकरणम्", iastTitle: "4. Alātaśānti Prakaraṇam", nodeKind: "mula", granthaId: "mandukyopanisad", chapterId: "mandukya-alatashanti" },
          ],
        },
        {
          id: "adv-mandukya-bhashya",
          sanskritTitle: "माण्डूक्योपनिषद्भाष्यम्",
          iastTitle: "Māṇḍūkyopaniṣad-Bhāṣyam",
          author: "Ādi Śaṅkarācārya",
          paramparaId: "advaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "advaita",
          granthaId: "mandukyopanisad",
          children: [
            {
              id: "adv-mandukya-ananda",
              sanskritTitle: "आनन्दगिरिटीका",
              iastTitle: "Ānandagiri Ṭīkā",
              author: "Ānandagiri",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Ānandagiri",
              granthaId: "mandukyopanisad",
            },
          ],
        },
      ];
    }
    if (u.key === "taittiriya") {
      return [
        {
          id: "adv-taittiriya-bhashya",
          sanskritTitle: "तैत्तिरीयोपनिषद्भाष्यम्",
          iastTitle: "Taittirīyopaniṣad-Bhāṣyam",
          author: "Ādi Śaṅkarācārya",
          paramparaId: "advaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "advaita",
          granthaId: "taittiriyopanisad",
          children: [
            {
              id: "adv-tai-ananda",
              sanskritTitle: "आनन्दगिरिटीका",
              iastTitle: "Ānandagiri Ṭīkā",
              author: "Ānandagiri",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Ānandagiri",
              granthaId: "taittiriyopanisad",
            },
            {
              id: "adv-tai-vartika",
              sanskritTitle: "तैत्तिरीयोपनिषद्भाष्यवार्तिकम्",
              iastTitle: "Taittirīya-Bhāṣya-Vārtikam",
              author: "Sureśvarācārya",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Vārtika",
              granthaId: "taittiriyopanisad",
            },
            {
              id: "adv-tai-vanamala",
              sanskritTitle: "वनमालाव्याख्या",
              iastTitle: "Vanamālā Vyākhyā",
              author: "Acyutakṛṣṇānanda Tīrtha",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Vanamālā",
              granthaId: "taittiriyopanisad",
            },
          ],
        },
      ];
    }
    if (u.key === "brhadaranyaka") {
      return [
        {
          id: "adv-brhad-bhashya",
          sanskritTitle: "बृहदारण्यकोपनिषद्भाष्यम्",
          iastTitle: "Bṛhadāraṇyakopaniṣad-Bhāṣyam",
          author: "Ādi Śaṅkarācārya",
          paramparaId: "advaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "advaita",
          granthaId: "brhadaranyakopanisad",
          children: [
            {
              id: "adv-brh-ananda",
              sanskritTitle: "आनन्दगिरिटीका",
              iastTitle: "Ānandagiri Ṭīkā",
              author: "Ānandagiri",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Ānandagiri",
              granthaId: "brhadaranyakopanisad",
            },
            {
              id: "adv-brh-vartika",
              sanskritTitle: "बृहदारण्यकोपनिषद्भाष्यवार्तिकम्",
              iastTitle: "Bṛhadāraṇyaka-Bhāṣya-Vārtikam",
              author: "Sureśvarācārya",
              paramparaId: "advaita",
              nodeKind: "tika",
            },
          ],
        },
      ];
    }
    // Prasna, Mundaka, Aitareya, Chandogya
    return [
      {
        id: `adv-${u.key}-bhashya`,
        sanskritTitle: `${u.stemSanskrit}भाष्यम्`,
        iastTitle: `${u.stemIast}-Bhāṣyam`,
        author: "Ādi Śaṅkarācārya",
        paramparaId: "advaita",
        nodeKind: "bhashya",
        commentaryParamparaId: "advaita",
        granthaId: u.granthaId,
        children: [
          {
            id: `adv-${u.key}-ananda`,
            sanskritTitle: "आनन्दगिरिटीका",
            iastTitle: "Ānandagiri Ṭīkā",
            author: "Ānandagiri",
            century: "13th Century CE",
            paramparaId: "advaita",
            nodeKind: "tika",
            commentaryParamparaId: "advaita",
            tikaMatchKey: "Ānandagiri",
            granthaId: u.granthaId,
          },
        ],
      },
    ];
  },
  gitaBhashyas: [
    {
      id: "adv-gita-bhashya",
      sanskritTitle: "श्रीमद्भगवद्गीताभाष्यम्",
      iastTitle: "Śrīmad Bhagavadgītā-Bhāṣyam",
      author: "Ādi Śaṅkarācārya",
      paramparaId: "advaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "advaita",
      granthaId: "bhagavadgita",
      readerNote: "Opens Bhagavad Gītā with Śāṅkarabhāṣya extracts",
      children: [
        {
          id: "adv-gita-ananda",
          sanskritTitle: "आनन्दगिरिटीका",
          iastTitle: "Ānandagiri Ṭīkā",
          author: "Ānandagiri",
          paramparaId: "advaita",
          nodeKind: "tika",
          commentaryParamparaId: "advaita",
          tikaMatchKey: "Ānandagiri",
          granthaId: "bhagavadgita",
        },
        {
          id: "adv-gita-gudartha",
          sanskritTitle: "गूढार्थदीपिका",
          iastTitle: "Gūḍhārtha Dīpikā",
          author: "Madhusūdana Sarasvatī",
          paramparaId: "advaita",
          nodeKind: "tika",
        },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "adv-bs-bhashya",
      sanskritTitle: "ब्रह्मसूत्रशाङ्करभाष्यम् (शारीरकभाष्यम्)",
      iastTitle: "Brahmasūtra-Śāṅkarabhāṣyam",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "advaita",
      granthaId: "brahmasutra",
      readerNote: "Opens Brahma Sūtras with Śāṅkarabhāṣya extracts & Ṭīkās",
      children: [
        {
          id: "adv-bs-nyayanirnaya",
          sanskritTitle: "न्यायनिर्णयव्याख्या",
          iastTitle: "Nyāyanirṇaya Vyākhyā",
          author: "Ānandagiri",
          century: "13th Century CE",
          paramparaId: "advaita",
          nodeKind: "tika",
          commentaryParamparaId: "advaita",
          tikaMatchKey: "Nyāya-Nirṇaya",
          granthaId: "brahmasutra",
        },
        {
          id: "adv-bs-pancapadika",
          sanskritTitle: "पञ्चपादिका",
          iastTitle: "Pañcapādikā (Vivaraṇa Prasthāna)",
          author: "Padmapādācārya",
          century: "8th–9th Century CE",
          paramparaId: "advaita",
          nodeKind: "tika",
          children: [
            {
              id: "adv-bs-vivarana",
              sanskritTitle: "पञ्चपादिकाविवरणम्",
              iastTitle: "Pañcapādikā-Vivaraṇam",
              author: "Prakāśātmayati",
              century: "10th Century CE",
              paramparaId: "advaita",
              nodeKind: "tika",
              commentaryParamparaId: "advaita",
              tikaMatchKey: "Vivaraṇa",
              granthaId: "brahmasutra",
              children: [
                {
                  id: "adv-bs-vaktavyakasika",
                  sanskritTitle: "वक्तव्यकाशिका / तत्त्वदीपनम्",
                  iastTitle: "Vaktavyakāśikā / Tattvadīpanam",
                  paramparaId: "advaita",
                  nodeKind: "tika",
                },
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
          paramparaId: "advaita",
          nodeKind: "tika",
          commentaryParamparaId: "advaita",
          tikaMatchKey: "Bhāmatī",
          granthaId: "brahmasutra",
          children: [
            {
              id: "adv-bs-kalpataru",
              sanskritTitle: "वेदान्तकल्पतरुः",
              iastTitle: "Vedāntakalpataruḥ",
              author: "Amalānanda",
              century: "13th Century CE",
              paramparaId: "advaita",
              nodeKind: "tika",
              children: [
                {
                  id: "adv-bs-parimala",
                  sanskritTitle: "कल्पतरुपरिमलः",
                  iastTitle: "Kalpataru-Parimalaḥ",
                  author: "Appayya Dīkṣita",
                  century: "16th Century CE",
                  paramparaId: "advaita",
                  nodeKind: "tika",
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
          paramparaId: "advaita",
          nodeKind: "tika",
          commentaryParamparaId: "advaita",
          tikaMatchKey: "Ratnaprabhā",
          granthaId: "brahmasutra",
        },
      ],
    },
  ],
  founderPrakaranas: [
    { id: "adv-hastamalaka", sanskritTitle: "हस्तामलकीयभाष्यम्", iastTitle: "Hastāmalakīyabhāṣyam", nodeKind: "prakarana", paramparaId: "advaita" },
    { id: "adv-sarvavedanta", sanskritTitle: "सर्ववेदान्तसिद्धान्तसारसङ्ग्रहः", iastTitle: "Sarvavedāntasiddhāntasārasaṅgrahaḥ", nodeKind: "prakarana", paramparaId: "advaita" },
    { id: "adv-satasloki", sanskritTitle: "शतश्लोकी", iastTitle: "Śataślokī", nodeKind: "prakarana", paramparaId: "advaita" },
    {
      id: "adv-vivekacudamani",
      sanskritTitle: "विवेकचूडामणिः",
      iastTitle: "Vivekacūḍāmaṇi",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "vivekacudamani",
    },
    {
      id: "adv-aparokshanubhuti",
      sanskritTitle: "अपरोक्षानुभूतिः",
      iastTitle: "Aparokṣānubhūtiḥ",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "aparokshanubhuti",
    },
    {
      id: "adv-tattvabodha",
      sanskritTitle: "तत्त्वबोधः",
      iastTitle: "Tattvabodhaḥ",
      author: "Ādi Śaṅkarācārya (Trad.)",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "tattvabodha",
    },
    {
      id: "adv-upadesasahasri",
      sanskritTitle: "उपदेशसाहस्री",
      iastTitle: "Upadeśasāhasrī",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "upadesasahasri",
    },
    {
      id: "adv-atmabodha",
      sanskritTitle: "आत्मबोधः",
      iastTitle: "Ātmabodhaḥ",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "atmabodha",
    },
    {
      id: "adv-mahavakyam",
      sanskritTitle: "महावाक्यम् (निवृत्तिभाष्यम्)",
      iastTitle: "Mahāvākyam (Nivṛttibhāṣyam)",
      author: "Ādi Śaṅkarācārya (Trad.)",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "mahavakyam",
    },
    {
      id: "adv-advaitanubhuti",
      sanskritTitle: "अद्वैतानुभूतिः",
      iastTitle: "Advaitānubhūtiḥ",
      author: "Ādi Śaṅkarācārya (Trad.)",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "advaitanubhuti",
    },
    {
      id: "adv-anatmasrivigarhana",
      sanskritTitle: "अनात्मश्रीविगर्हणप्रकरणम्",
      iastTitle: "Anātmaśrīvigarhaṇaprakaraṇam",
      author: "Ādi Śaṅkarācārya (Trad.)",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "anatmasrivigarhana",
    },
    {
      id: "adv-tattvopadesa",
      sanskritTitle: "तत्त्वोपदेशः",
      iastTitle: "Tattvopadeśaḥ",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "tattvopadesa",
    },
    {
      id: "adv-dasasloki",
      sanskritTitle: "दशश्लोकी",
      iastTitle: "Daśaślokī",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "dasasloki",
    },
  ],
  founderStotras: [
    {
      id: "adv-panjara",
      sanskritTitle: "पञ्जर-पञ्चक-स्तोत्राणि",
      iastTitle: "Pañjara & Pañcaka Stotras",
      paramparaId: "advaita",
      nodeKind: "branch",
      defaultExpanded: false,
      children: [
        { id: "adv-ganesa-panjara", sanskritTitle: "श्रीगणेशपञ्जरत्नम्", iastTitle: "Śrī Gaṇeśa Pañcaratnam", nodeKind: "stotra" },
        { id: "adv-sivapancaksara", sanskritTitle: "शिवपञ्चाक्षरस्तोत्रम्", iastTitle: "Śiva Pañcākṣara Stotram", nodeKind: "stotra" },
        { id: "adv-laksminrsimha", sanskritTitle: "श्रीलक्ष्मीनृसिंहपञ्चरत्नम्", iastTitle: "Śrī Lakṣmī-Nṛsiṁha Pañcaratnam", nodeKind: "stotra" },
        {
          id: "adv-advaitapancaratnam",
          sanskritTitle: "अद्वैतपञ्चरत्नम्",
          iastTitle: "Advaita Pañcaratnam",
          author: "Ādi Śaṅkarācārya",
          century: "8th Century CE",
          paramparaId: "advaita",
          nodeKind: "stotra",
          granthaId: "advaitapancaratnam",
        },
        { id: "adv-yati", sanskritTitle: "यतिपञ्चकम्", iastTitle: "Yati Pañcakam", nodeKind: "stotra" },
        { id: "adv-maya", sanskritTitle: "मायापञ्चकम्", iastTitle: "Māyā Pañcakam", nodeKind: "stotra" },
        { id: "adv-manisa", sanskritTitle: "मनीषापञ्चकम्", iastTitle: "Manīṣā Pañcakam", nodeKind: "stotra" },
        {
          id: "adv-kaupina",
          sanskritTitle: "कौपीनपञ्चकम्",
          iastTitle: "Kaupīna Pañcakam",
          author: "Ādi Śaṅkarācārya",
          century: "8th Century CE",
          paramparaId: "advaita",
          nodeKind: "stotra",
          granthaId: "kaupinapancakam",
        },
      ],
    },
    { id: "adv-daksinamurti-stotra", sanskritTitle: "श्रीदक्षिणामूर्तिस्तोत्रम्", iastTitle: "Śrī Dakṣiṇāmūrti Stotram", nodeKind: "stotra" },
    { id: "adv-bhajagovindam", sanskritTitle: "भजगोविन्दम् (मोहमुद्गरः)", iastTitle: "Bhaja Govindam", nodeKind: "stotra" },
    {
      id: "adv-jivanmuktanandalahari",
      sanskritTitle: "जीवन्मुक्तानन्दलहरी",
      iastTitle: "Jīvanmuktānandalaharī",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "stotra",
      granthaId: "jivanmuktanandalahari",
    },
    {
      id: "adv-dasaslokistuti",
      sanskritTitle: "दशश्लोकीस्तुतिः",
      iastTitle: "Daśaślokīstutiḥ",
      author: "Ādi Śaṅkarācārya",
      century: "8th Century CE",
      paramparaId: "advaita",
      nodeKind: "stotra",
      granthaId: "dasaslokistuti",
    },
  ],
  otherPrakaranas: [
    {
      id: "adv-advaitasiddhi",
      sanskritTitle: "अद्वैतसिद्धिः",
      iastTitle: "Advaitasiddhiḥ",
      author: "Madhusūdana Sarasvatī",
      century: "16th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "advaitasiddhi",
      children: [
        { id: "adv-laghucandrika", sanskritTitle: "लघुचन्द्रिका", iastTitle: "Laghucandrikā", author: "Gauḍa Brahmānanda Sarasvatī", nodeKind: "tika" },
      ],
    },
    { id: "adv-nyayaraksamani", sanskritTitle: "न्यायरक्षामणिः", iastTitle: "Nyāyarakṣāmaṇiḥ", author: "Appayya Dīkṣita", nodeKind: "prakarana" },
    {
      id: "adv-siddhantalesa",
      sanskritTitle: "शास्त्रसिद्धान्तलेशसङ्ग्रहः",
      iastTitle: "Śāstrasiddhāntaleśasaṅgrahaḥ",
      author: "Appayya Dīkṣita",
      century: "16th Century CE",
      nodeKind: "prakarana",
      children: [
        { id: "adv-krsnalankara", sanskritTitle: "कृष्णालङ्कारः", iastTitle: "Kṛṣṇālaṅkāraḥ", author: "Acyutakṛṣṇānanda Tīrtha", nodeKind: "tika" },
      ],
    },
    {
      id: "adv-vedantaparibhasa",
      sanskritTitle: "वेदान्तपरिभाषा",
      iastTitle: "Vedāntaparibhāṣā",
      author: "Dharmarāja Adhvarīndra",
      century: "17th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "vedantaparibhasa",
    },
    {
      id: "adv-vedantasara",
      sanskritTitle: "वेदान्तसारः",
      iastTitle: "Vedāntasāraḥ",
      author: "Sadānanda Yogīndra Sarasvatī",
      century: "15th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "vedantasara",
    },
    {
      id: "adv-jivanmuktiviveka",
      sanskritTitle: "जीवन्मुक्तिविवेकः",
      iastTitle: "Jīvanmuktivivekaḥ",
      author: "Swāmī Vidyāraṇya",
      century: "14th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "jivanmuktiviveka",
    },
    { id: "adv-pancadasi", sanskritTitle: "पञ्चदशी", iastTitle: "Pañcadaśī", author: "Swāmī Vidyāraṇya", century: "14th Century CE", nodeKind: "prakarana" },
    { id: "adv-naiskarmyasiddhi", sanskritTitle: "नैष्कर्म्यसिद्धिः", iastTitle: "Naiṣkarmyasiddhiḥ", author: "Sureśvarācārya", century: "8th–9th Century CE", nodeKind: "prakarana" },
    {
      id: "adv-advaitamakaranda",
      sanskritTitle: "अद्वैतमकरन्दः",
      iastTitle: "Advaitamakarandaḥ",
      author: "Lakṣmīdhara Kavi",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "advaitamakaranda",
    },
    {
      id: "adv-advaitarasamanjari",
      sanskritTitle: "अद्वैतरसमञ्जरी",
      iastTitle: "Advaitarasamañjarī",
      author: "Sadāśiva Brahmendra Sarasvatī",
      century: "18th Century CE",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "advaitarasamanjari",
    },
    {
      id: "adv-taptacakrankanavidhvamsanam",
      sanskritTitle: "तप्तचक्रांकनविध्वंसनम्",
      iastTitle: "Taptacakrāṅkanavidhvaṁsanam",
      author: "Śrī Garuḍācala Yajvā",
      century: "Classical Post-Śaṅkara Tradition",
      paramparaId: "advaita",
      nodeKind: "prakarana",
      granthaId: "taptacakrankanavidhvamsanam",
    },
  ],
});

// =========================================================
// 2. VIŚIṢṬĀDVAITA VEDĀNTA (ŚRĪ SAMPRADĀYA)
// =========================================================
const VISISTADVAITA_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "visistadvaita-root",
  prefix: "vis",
  sanskritTitle: "विशिष्टाद्वैतम् (श्रीसम्प्रदायः)",
  iastTitle: "Viśiṣṭādvaita Vedānta (Śrī Sampradāya)",
  author: "Śrī Rāmānujācārya & Lineage",
  englishSubtitle: "Qualified Non-Dualism (Śarīra-Śarīrī-Bhāva)",
  paramparaId: "visistadvaita",
  commentaryParamparaId: "visistadvaita",
  founderPrakaranasTitleSanskrit: "श्रीमद्रामानुजाचार्यविरचिताः प्रकरणग्रन्थाः",
  founderPrakaranasTitleIast: "Śrī Rāmānuja Prakaraṇa Granthas",
  founderStotrasTitleSanskrit: "श्रीमद्रामानुज-पूर्वाचार्यविरचितानि स्तोत्राणि",
  founderStotrasTitleIast: "Śrī Vaiṣṇava Stotras & Gadya Hymns",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other Viśiṣṭādvaita Prakaraṇas (Vaḍakalai & Teṅkalai)",
  buildUpanisadBranch: (u) => {
    if (u.key === "isa") {
      return [
        {
          id: "vis-isa-desika-bhashya",
          sanskritTitle: "ईशावास्योपनिषद्भाष्यम् (वेदान्तदेशिककृतम्)",
          iastTitle: "Īśāvāsyopaniṣad-Bhāṣyam",
          author: "Svāmī Vedānta Deśika",
          century: "13th–14th Century CE",
          paramparaId: "visistadvaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "visistadvaita",
          granthaId: "isopanisad",
          children: [
            {
              id: "vis-isa-rahasyaraksa",
              sanskritTitle: "रहस्यरक्षा-व्याख्या",
              iastTitle: "Rahasyarakṣā",
              author: "Śrī Raṅgarāmānuja Tradition",
              paramparaId: "visistadvaita",
              nodeKind: "tika",
              commentaryParamparaId: "visistadvaita",
              granthaId: "isopanisad",
            },
          ],
        },
        {
          id: "vis-isa-ranga-prakasika",
          sanskritTitle: "ईशावास्योपनिषत्प्रकाशिका",
          iastTitle: "Īśāvāsyopaniṣat-Prakāśikā",
          author: "Śrī Raṅgarāmānuja Muni",
          century: "16th–17th Century CE",
          paramparaId: "visistadvaita",
          nodeKind: "bhashya",
          commentaryParamparaId: "visistadvaita",
          granthaId: "isopanisad",
        },
      ];
    }
    return [
      {
        id: `vis-${u.key}-bhashya`,
        sanskritTitle: `${u.stemSanskrit}प्रकाशिका (रङ्गरामानुजीया)`,
        iastTitle: `${u.stemIast}-Prakāśikā`,
        author: "Śrī Raṅgarāmānuja Muni",
        century: "16th–17th Century CE",
        paramparaId: "visistadvaita",
        nodeKind: "bhashya",
        commentaryParamparaId: "visistadvaita",
        granthaId: u.granthaId,
        children: [
          {
            id: `vis-${u.key}-tika`,
            sanskritTitle: "भावबोध-तात्पर्यदीपिका",
            iastTitle: "Bhāvabodha / Viśiṣṭādvaita-Tātparyadīpikā",
            author: "Śrī Vaiṣṇava Exegetical Tradition",
            paramparaId: "visistadvaita",
            nodeKind: "tika",
            commentaryParamparaId: "visistadvaita",
            granthaId: u.granthaId,
          },
        ],
      },
    ];
  },
  gitaBhashyas: [
    {
      id: "vis-gita-bhashya",
      sanskritTitle: "श्रीमद्भगवद्गीताभाष्यम्",
      iastTitle: "Śrīmad Bhagavadgītā-Bhāṣyam",
      author: "Śrī Rāmānujācārya",
      century: "11th–12th Century CE",
      paramparaId: "visistadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "visistadvaita",
      granthaId: "bhagavadgita",
      children: [
        {
          id: "vis-tatparyacandrika",
          sanskritTitle: "तात्पर्यचन्द्रिका",
          iastTitle: "Tātparyacandrikā",
          author: "Svāmī Vedānta Deśika",
          century: "13th–14th Century CE",
          paramparaId: "visistadvaita",
          nodeKind: "tika",
          commentaryParamparaId: "visistadvaita",
          tikaMatchKey: "Tātparya",
          granthaId: "bhagavadgita",
        },
      ],
    },
    {
      id: "vis-gitartha-sangraha",
      sanskritTitle: "गीतार्थसङ्ग्रहः",
      iastTitle: "Gītārthasaṅgrahaḥ",
      author: "Śrī Yāmunācārya",
      paramparaId: "visistadvaita",
      nodeKind: "bhashya",
      children: [
        {
          id: "vis-gitartha-raksa",
          sanskritTitle: "गीतार्थसङ्ग्रहरक्षा",
          iastTitle: "Gītārthasaṅgraha-Rakṣā",
          author: "Svāmī Vedānta Deśika",
          nodeKind: "tika",
        },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "vis-sribhasya",
      sanskritTitle: "श्रीभाष्यम् (ब्रह्मसूत्रभाष्यम्)",
      iastTitle: "Śrībhāṣyam",
      author: "Bhagavad Rāmānujācārya",
      century: "11th–12th Century CE",
      paramparaId: "visistadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "visistadvaita",
      granthaId: "sribhasya",
      children: [
        {
          id: "vis-srutaprakasika",
          sanskritTitle: "श्रुतप्रकाशिका",
          iastTitle: "Śrutaprakāśikā",
          author: "Sudarśana Sūri",
          century: "13th Century CE",
          paramparaId: "visistadvaita",
          nodeKind: "tika",
          commentaryParamparaId: "visistadvaita",
          tikaMatchKey: "Śrutaprakāśikā",
          granthaId: "brahmasutra",
          children: [
            {
              id: "vis-bhavaprakasika",
              sanskritTitle: "भावप्रकाशिका",
              iastTitle: "Bhāvaprakāśikā",
              author: "Śrī Raṅgarāmānuja Muni",
              nodeKind: "tika",
            },
          ],
        },
        {
          id: "vis-tattvatika",
          sanskritTitle: "तत्त्वटीका",
          iastTitle: "Tattvaṭīkā",
          author: "Svāmī Vedānta Deśika",
          century: "14th Century CE",
          paramparaId: "visistadvaita",
          nodeKind: "tika",
        },
        {
          id: "vis-adhikaranasaravali",
          sanskritTitle: "अधिकरणसारावली",
          iastTitle: "Adhikaraṇasārāvalī",
          author: "Svāmī Vedānta Deśika",
          nodeKind: "tika",
        },
      ],
    },
    {
      id: "vis-vedantadipa-bs",
      sanskritTitle: "वेदान्तदीपः",
      iastTitle: "Vedāntadīpaḥ",
      author: "Śrī Rāmānujācārya",
      nodeKind: "bhashya",
    },
    {
      id: "vis-vedantasara-bs",
      sanskritTitle: "वेदान्तसारः (रामानुजीयः)",
      iastTitle: "Vedāntasāraḥ",
      author: "Śrī Rāmānujācārya",
      nodeKind: "bhashya",
    },
  ],
  founderPrakaranas: [
    { id: "vis-vedarthasangraha", sanskritTitle: "वेदार्थसङ्ग्रहः", iastTitle: "Vedārthasaṅgrahaḥ", author: "Śrī Rāmānujācārya", nodeKind: "prakarana" },
    { id: "vis-vedantadipa", sanskritTitle: "वेदान्तदीपः", iastTitle: "Vedāntadīpaḥ", author: "Śrī Rāmānujācārya", nodeKind: "prakarana" },
    { id: "vis-vedantasara-ram", sanskritTitle: "वेदान्तसारः", iastTitle: "Vedāntasāraḥ", author: "Śrī Rāmānujācārya", nodeKind: "prakarana" },
    { id: "vis-nityagrantha", sanskritTitle: "नित्यग्रन्थः", iastTitle: "Nityagranthaḥ", author: "Śrī Rāmānujācārya", nodeKind: "prakarana" },
  ],
  founderStotras: [
    {
      id: "vis-gadyatraya",
      sanskritTitle: "गद्यत्रयम्",
      iastTitle: "Gadyatrayam",
      author: "Śrī Rāmānujācārya",
      nodeKind: "branch",
      children: [
        { id: "vis-saranagatigadyam", sanskritTitle: "शरणागतिगद्यम्", iastTitle: "Śaraṇāgatigadyam", author: "Śrī Rāmānujācārya", nodeKind: "stotra" },
        { id: "vis-srirangagadyam", sanskritTitle: "श्रीरङ्गगद्यम्", iastTitle: "Śrīraṅgagadyam", author: "Śrī Rāmānujācārya", nodeKind: "stotra" },
        { id: "vis-vaikunthagadyam", sanskritTitle: "श्रीवैकुण्ठगद्यम्", iastTitle: "Śrīvaikuṇṭhagadyam", author: "Śrī Rāmānujācārya", nodeKind: "stotra" },
      ],
    },
    { id: "vis-stotraratna", sanskritTitle: "स्तोत्ररत्नम्", iastTitle: "Stotraratnam", author: "Śrī Yāmunācārya", nodeKind: "stotra" },
    { id: "vis-catussloki", sanskritTitle: "चतुःश्लोकी", iastTitle: "Catuḥślokī", author: "Śrī Yāmunācārya", nodeKind: "stotra" },
    { id: "vis-rangarajastava", sanskritTitle: "श्रीरङ्गराजस्तवः", iastTitle: "Śrīraṅgarājastavaḥ", author: "Parāśara Bhaṭṭa", nodeKind: "stotra" },
    { id: "vis-dayasatakam", sanskritTitle: "दयाशतकम्", iastTitle: "Dayāśatakam", author: "Svāmī Vedānta Deśika", nodeKind: "stotra" },
    { id: "vis-hayagrivastotra", sanskritTitle: "श्रीहयग्रीवस्तोत्रम्", iastTitle: "Śrī Hayagrīva Stotram", author: "Svāmī Vedānta Deśika", nodeKind: "stotra" },
  ],
  otherPrakaranas: [
    {
      id: "vis-yatindramatadipika",
      sanskritTitle: "यतीन्द्रमतदीपिका",
      iastTitle: "Yatīndramatadīpikā",
      author: "Śrīnivāsadāsa",
      century: "17th Century CE",
      paramparaId: "visistadvaita",
      nodeKind: "prakarana",
      granthaId: "yatindramatadipika",
    },
    { id: "vis-siddhitraya", sanskritTitle: "सिद्धित्रयम् (आत्म-ईश्वर-संवित्)", iastTitle: "Siddhitrayam", author: "Śrī Yāmunācārya", century: "10th–11th Century CE", nodeKind: "prakarana" },
    { id: "vis-satadusani", sanskritTitle: "शतदूषणी", iastTitle: "Śatadūṣaṇī", author: "Svāmī Vedānta Deśika", nodeKind: "prakarana" },
    {
      id: "vis-tattvamukta",
      sanskritTitle: "तत्त्वमुक्ताकलापः",
      iastTitle: "Tattvamuktākalāpaḥ",
      author: "Svāmī Vedānta Deśika",
      nodeKind: "prakarana",
      children: [
        { id: "vis-sarvarthasiddhi", sanskritTitle: "सर्वार्थसिद्धिः", iastTitle: "Sarvārthasiddhiḥ", author: "Svāmī Vedānta Deśika", nodeKind: "tika" },
      ],
    },
    { id: "vis-nyayaparisuddhi", sanskritTitle: "न्यायपरिशुद्धिः", iastTitle: "Nyāyapariśuddhiḥ", author: "Svāmī Vedānta Deśika", nodeKind: "prakarana" },
    { id: "vis-rahasyatraya", sanskritTitle: "रहस्यत्रयसारः", iastTitle: "Rahasyatrayasāraḥ", author: "Svāmī Vedānta Deśika", nodeKind: "prakarana" },
    { id: "vis-tattvatraya", sanskritTitle: "तत्त्वत्रयम्", iastTitle: "Tattvatrayam", author: "Piḷḷai Lokācārya", nodeKind: "prakarana" },
    { id: "vis-srivacanabhusana", sanskritTitle: "श्रीवचनभूषणम्", iastTitle: "Śrīvacanabhūṣaṇam", author: "Piḷḷai Lokācārya", nodeKind: "prakarana" },
  ],
});

// =========================================================
// 3. DVAITA VEDĀNTA (MĀDHVA TATTVAVĀDA)
// =========================================================
const DVAITA_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "dvaita-root",
  prefix: "dva",
  sanskritTitle: "द्वैतम् (माध्व-तत्त्ववादः)",
  iastTitle: "Dvaita Vedānta (Mādhva Tattvavāda)",
  author: "Śrī Madhvācārya (Ānandatīrtha)",
  englishSubtitle: "Realist Dualism (Pañcabheda)",
  paramparaId: "dvaita",
  commentaryParamparaId: "dvaita",
  founderPrakaranasTitleSanskrit: "श्रीमध्वाचार्यविरचिताः प्रकरणग्रन्थाः (दशप्रकरणानि)",
  founderPrakaranasTitleIast: "Śrī Madhva Daśa Prakaraṇas",
  founderStotrasTitleSanskrit: "श्रीमध्वाचार्यविरचितानि स्तोत्राणि",
  founderStotrasTitleIast: "Śrī Madhva Stotras & Devotional Works",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other Dvaita Prakaraṇas (Jayatīrtha, Vyāsatīrtha & Lineage)",
  buildUpanisadBranch: (u) => [
    {
      id: `dva-${u.key}-bhashya`,
      sanskritTitle: `${u.stemSanskrit}भाष्यम् (माध्वभाष्यम्)`,
      iastTitle: `${u.stemIast}-Madhvabhāṣyam`,
      author: "Śrī Madhvācārya (Ānandatīrtha)",
      century: "13th Century CE",
      paramparaId: "dvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "dvaita",
      granthaId: u.granthaId,
      children: [
        {
          id: `dva-${u.key}-tika`,
          sanskritTitle: "जयतीर्थटीका / राघवेन्द्रखण्डार्थः",
          iastTitle: "Jayatīrtha Ṭīkā / Rāghavendra Khaṇḍārthaḥ",
          author: "Śrī Jayatīrtha / Śrī Rāghavendra Tīrtha",
          paramparaId: "dvaita",
          nodeKind: "tika",
          commentaryParamparaId: "dvaita",
          granthaId: u.granthaId,
        },
      ],
    },
  ],
  gitaBhashyas: [
    {
      id: "dva-gita-bhashya",
      sanskritTitle: "श्रीमद्भगवद्गीताभाष्यम्",
      iastTitle: "Śrīmad Bhagavadgītā-Bhāṣyam",
      author: "Śrī Madhvācārya",
      century: "13th Century CE",
      paramparaId: "dvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "dvaita",
      granthaId: "bhagavadgita",
      children: [
        {
          id: "dva-gita-prameyadipika",
          sanskritTitle: "प्रमेयदीपिका",
          iastTitle: "Prameyadīpikā",
          author: "Śrī Jayatīrtha",
          century: "14th Century CE",
          paramparaId: "dvaita",
          nodeKind: "tika",
          commentaryParamparaId: "dvaita",
          granthaId: "bhagavadgita",
          children: [
            { id: "dva-gita-bhavadipa", sanskritTitle: "भावदीपः", iastTitle: "Bhāvadīpaḥ", author: "Śrī Rāghavendra Tīrtha", nodeKind: "tika" },
          ],
        },
      ],
    },
    {
      id: "dva-gita-tatparya",
      sanskritTitle: "गीतातात्पर्यनिर्णयः",
      iastTitle: "Gītātātparyanirṇayaḥ",
      author: "Śrī Madhvācārya",
      nodeKind: "bhashya",
      children: [
        { id: "dva-gita-nyayadipika", sanskritTitle: "न्यायदीपिका", iastTitle: "Nyāyadīpikā", author: "Śrī Jayatīrtha", nodeKind: "tika" },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "dva-bs-bhashya",
      sanskritTitle: "ब्रह्मसूत्रमध्वभाष्यम्",
      iastTitle: "Brahmasūtra-Madhvabhāṣyam",
      author: "Śrī Madhvācārya",
      century: "13th Century CE",
      paramparaId: "dvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "dvaita",
      granthaId: "brahmasutra",
      children: [
        {
          id: "dva-tattvaprakasika",
          sanskritTitle: "तत्त्वप्रकाशिका",
          iastTitle: "Tattvaprakāśikā",
          author: "Śrī Jayatīrtha",
          century: "14th Century CE",
          paramparaId: "dvaita",
          nodeKind: "tika",
          commentaryParamparaId: "dvaita",
          tikaMatchKey: "Tattva-Prakāśikā",
          granthaId: "brahmasutra",
          children: [
            { id: "dva-tatparya-candrika", sanskritTitle: "तात्पर्यचन्द्रिका", iastTitle: "Tātparyacandrikā", author: "Śrī Vyāsatīrtha", nodeKind: "tika" },
            { id: "dva-bhavadipa", sanskritTitle: "भावदीपः", iastTitle: "Bhāvadīpaḥ", author: "Śrī Rāghavendra Tīrtha", nodeKind: "tika" },
          ],
        },
      ],
    },
    {
      id: "dva-anuvyakhyana",
      sanskritTitle: "अणुव्याख्यानम्",
      iastTitle: "Aṇuvyākhyānam",
      author: "Śrī Madhvācārya",
      paramparaId: "dvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "dvaita",
      granthaId: "brahmasutra",
      children: [
        {
          id: "dva-nyayasudha",
          sanskritTitle: "श्रीमन्न्यायसुधा",
          iastTitle: "Śrīman-Nyāyasudhā",
          author: "Śrī Jayatīrtha (Ṭīkācārya)",
          paramparaId: "dvaita",
          nodeKind: "tika",
          commentaryParamparaId: "dvaita",
          tikaMatchKey: "Nyāyasudhā",
          granthaId: "brahmasutra",
          children: [
            {
              id: "dva-parimala",
              sanskritTitle: "न्यायसुधा-परिमलः",
              iastTitle: "Nyāyasudhā-Parimalaḥ",
              author: "Śrī Rāghavendra Tīrtha",
              paramparaId: "dvaita",
              nodeKind: "tika",
              commentaryParamparaId: "dvaita",
              tikaMatchKey: "Parimala",
              granthaId: "brahmasutra",
            },
          ],
        },
      ],
    },
    {
      id: "dva-anubhasya",
      sanskritTitle: "अणुभाष्यम्",
      iastTitle: "Aṇubhāṣyam (Madhva)",
      author: "Śrī Madhvācārya",
      nodeKind: "bhashya",
      children: [
        { id: "dva-tattvamanjari", sanskritTitle: "तत्त्वमञ्जरी", iastTitle: "Tattvamañjarī", author: "Śrī Rāghavendra Tīrtha", nodeKind: "tika" },
      ],
    },
  ],
  founderPrakaranas: [
    {
      id: "dva-upadhikhandana",
      sanskritTitle: "उपाधिखण्डनम्",
      iastTitle: "Upādhikhaṇḍanam",
      author: "Śrī Madhvācārya",
      century: "13th Century CE",
      paramparaId: "dvaita",
      nodeKind: "prakarana",
      granthaId: "upadhikhandana",
    },
    { id: "dva-mayavadakhandana", sanskritTitle: "मायावादखण्डनम्", iastTitle: "Māyāvādakhaṇḍanam", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-prapancamithyatva", sanskritTitle: "प्रपञ्चमिथ्यात्वानुमानखण्डनम्", iastTitle: "Prapañcamithyātvānumānakhaṇḍanam", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-tattvasankhyana", sanskritTitle: "तत्त्वसङ्ख्यानम्", iastTitle: "Tattvasaṅkhyānam", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-tattvaviveka", sanskritTitle: "तत्त्वविवेकः", iastTitle: "Tattvavivekaḥ", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-tattvodyota", sanskritTitle: "तत्त्वोद्योतः", iastTitle: "Tattvodyotaḥ", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-visnutattvanirnaya", sanskritTitle: "विष्णुतत्त्वनिर्णयः", iastTitle: "Viṣṇutattvanirṇayaḥ", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-karmanirnaya", sanskritTitle: "कर्मनिर्णयः", iastTitle: "Karmanirṇayaḥ", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-kathalaksana", sanskritTitle: "कथालक्षणम्", iastTitle: "Kathālakṣaṇam", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
    { id: "dva-pramanalaksana", sanskritTitle: "प्रमाणलक्षणम्", iastTitle: "Pramāṇalakṣaṇam", author: "Śrī Madhvācārya", nodeKind: "prakarana" },
  ],
  founderStotras: [
    { id: "dva-dvadasastotram", sanskritTitle: "द्वादशस्तोत्रम्", iastTitle: "Dvādaśastotram", author: "Śrī Madhvācārya", nodeKind: "stotra" },
    { id: "dva-krsnamrta", sanskritTitle: "कृष्णामृतमहार्णवः", iastTitle: "Kṛṣṇāmṛtamahārṇavaḥ", author: "Śrī Madhvācārya", nodeKind: "stotra" },
    { id: "dva-nakhastuti", sanskritTitle: "नखस्तुतिः", iastTitle: "Nakhastutiḥ", author: "Śrī Madhvācārya", nodeKind: "stotra" },
    { id: "dva-tantrasara", sanskritTitle: "तन्त्रसारसङ्ग्रहः", iastTitle: "Tantrasārasaṅgrahaḥ", author: "Śrī Madhvācārya", nodeKind: "stotra" },
  ],
  otherPrakaranas: [
    {
      id: "dva-nyayamrta",
      sanskritTitle: "न्यायामृतम्",
      iastTitle: "Nyāyāmṛtam",
      author: "Śrī Vyāsatīrtha",
      century: "15th–16th Century CE",
      paramparaId: "dvaita",
      nodeKind: "prakarana",
      granthaId: "nyayamrta",
      children: [
        { id: "dva-tarangini", sanskritTitle: "न्यायामृततरङ्गिणी", iastTitle: "Nyāyāmṛtataraṅgiṇī", author: "Rāmācārya", nodeKind: "tika" },
        { id: "dva-kantakoddhara", sanskritTitle: "न्यायामृतकण्टकोद्धारः", iastTitle: "Nyāyāmṛtakaṇṭakoddhāraḥ", author: "Ānandabhaṭṭāraka", nodeKind: "tika" },
      ],
    },
    { id: "dva-tarkatandava", sanskritTitle: "तर्कताण्डवम्", iastTitle: "Tarkatāṇḍavam", author: "Śrī Vyāsatīrtha", nodeKind: "prakarana" },
    { id: "dva-bhedojjivana", sanskritTitle: "भेदोज्जीवनम्", iastTitle: "Bhedojjīvanam", author: "Śrī Vyāsatīrtha", nodeKind: "prakarana" },
    { id: "dva-pramanapaddhati", sanskritTitle: "प्रमाणपद्धतिः", iastTitle: "Pramāṇapaddhatiḥ", author: "Śrī Jayatīrtha", nodeKind: "prakarana" },
    { id: "dva-vadavali", sanskritTitle: "वादावली", iastTitle: "Vādāvalī", author: "Śrī Jayatīrtha", nodeKind: "prakarana" },
    { id: "dva-yuktimallika", sanskritTitle: "युक्तमल्लिका", iastTitle: "Yuktimallikā", author: "Śrī Vādirāja Tīrtha", nodeKind: "prakarana" },
  ],
});

// =========================================================
// 4. ŚUDDHĀDVAITA (VALLABHA PUṢṬIMĀRGA)
// =========================================================
const SUDDHADVAITA_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "suddhadvaita-root",
  prefix: "sud",
  sanskritTitle: "शुद्धाद्वैतम् (पुष्टिमार्गः)",
  iastTitle: "Śuddhādvaita Vedānta (Puṣṭimārga)",
  author: "Śrī Vallabhācārya Mahāprabhu",
  englishSubtitle: "Pure Non-Dualism (Avikṛta-Pariṇāma)",
  paramparaId: "suddhadvaita",
  commentaryParamparaId: "suddhadvaita",
  founderPrakaranasTitleSanskrit: "श्रीमद्वल्लभाचार्यविरचिताः प्रकरणग्रन्थाः",
  founderPrakaranasTitleIast: "Śrī Vallabhācārya Prakaraṇa Granthas",
  founderStotrasTitleSanskrit: "श्रीमद्वल्लभाचार्यविरचितानि स्तोत्राणि",
  founderStotrasTitleIast: "Śrī Vallabhācārya Stotras",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other Puṣṭimārga Prakaraṇas",
  buildUpanisadBranch: (u) => [
    {
      id: `sud-${u.key}-bhashya`,
      sanskritTitle: `${u.stemSanskrit}दीपिका (पुष्टिमार्गीया)`,
      iastTitle: `${u.stemIast}-Dīpikā (Puṣṭimārga)`,
      author: "Gosvāmī Śrī Puruṣottamajī / Puṣṭi Tradition",
      paramparaId: "suddhadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "suddhadvaita",
      granthaId: u.granthaId,
      children: [
        {
          id: `sud-${u.key}-tika`,
          sanskritTitle: "अविकृतपरिणामार्थविवृतिः",
          iastTitle: "Avikṛtapariṇāmārtha-Vivṛtiḥ",
          author: "Śuddhādvaita Exegetical Lineage",
          paramparaId: "suddhadvaita",
          nodeKind: "tika",
        },
      ],
    },
  ],
  gitaBhashyas: [
    {
      id: "sud-gita-tattvadipika",
      sanskritTitle: "श्रीमद्भगवद्गीता-तत्त्वदीपिका",
      iastTitle: "Bhagavadgītā-Tattvadīpikā",
      author: "Śrī Vallabhācārya Tradition / Vrajanātha",
      paramparaId: "suddhadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "suddhadvaita",
      granthaId: "bhagavadgita",
      children: [
        { id: "sud-gita-amrtatarangini", sanskritTitle: "अमृततरङ्गिणी", iastTitle: "Amṛtataraṅgiṇī", author: "Gosvāmī Puruṣottamajī", nodeKind: "tika" },
        { id: "sud-gita-hetunirnaya", sanskritTitle: "गीताहेतुनिर्णयः", iastTitle: "Gītāhetunirṇayaḥ", author: "Śrī Viṭṭhalanātha", nodeKind: "tika" },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "sud-anubhasya",
      sanskritTitle: "ब्रह्मसूत्राणुभाष्यम्",
      iastTitle: "Brahmasūtrāṇubhāṣyam",
      author: "Śrī Vallabhācārya & Viṭṭhalanātha",
      century: "15th–16th Century CE",
      paramparaId: "suddhadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "suddhadvaita",
      granthaId: "anubhasya",
      children: [
        {
          id: "sud-bhashyaprakasa",
          sanskritTitle: "भाष्यप्रकाशः",
          iastTitle: "Bhāṣyaprakāśaḥ",
          author: "Gosvāmī Śrī Puruṣottamajī",
          century: "17th–18th Century CE",
          paramparaId: "suddhadvaita",
          nodeKind: "tika",
          children: [
            { id: "sud-rasmi", sanskritTitle: "रश्मिः", iastTitle: "Raśmiḥ", author: "Gopīśvara Gosvāmī", nodeKind: "tika" },
          ],
        },
        { id: "sud-balabodhini", sanskritTitle: "बालबोधिनी", iastTitle: "Bālabodhinī", author: "Śrī Giridhara Mahārāja", nodeKind: "tika" },
      ],
    },
  ],
  founderPrakaranas: [
    { id: "sud-tattvadipa", sanskritTitle: "तत्त्वार्थदीपनिबन्धः", iastTitle: "Tattvārthadīpanibandhaḥ", author: "Śrī Vallabhācārya", nodeKind: "prakarana" },
    {
      id: "sud-sodasa",
      sanskritTitle: "षोडशग्रन्थाः",
      iastTitle: "Ṣoḍaśa Granthas",
      author: "Śrī Vallabhācārya",
      nodeKind: "branch",
      children: [
        { id: "sud-siddhantamuktavali", sanskritTitle: "सिद्धान्तमुक्तावली", iastTitle: "Siddhāntamuktāvalī", nodeKind: "prakarana" },
        { id: "sud-pustipravaha", sanskritTitle: "पुष्टिप्रवाहमर्यादा", iastTitle: "Puṣṭipravāhamaryādā", nodeKind: "prakarana" },
        { id: "sud-siddhantarahasya", sanskritTitle: "सिद्धान्तरहस्यम्", iastTitle: "Siddhāntarahasya", nodeKind: "prakarana" },
        { id: "sud-bhaktivardhini", sanskritTitle: "भक्तिवर्धिनी", iastTitle: "Bhaktivardhinī", nodeKind: "prakarana" },
        { id: "sud-sevaphalam", sanskritTitle: "सेवाफलम्", iastTitle: "Sevāphalam", nodeKind: "prakarana" },
      ],
    },
    { id: "sud-subodhini", sanskritTitle: "श्रीसुबोधिनी (श्रीमद्भागवतव्याख्या)", iastTitle: "Śrī Subodhinī", author: "Śrī Vallabhācārya", nodeKind: "prakarana" },
  ],
  founderStotras: [
    { id: "sud-madhurastakam", sanskritTitle: "मधुराष्टकम्", iastTitle: "Madhurāṣṭakam", author: "Śrī Vallabhācārya", nodeKind: "stotra" },
    { id: "sud-yamunastakam", sanskritTitle: "यमुनाष्टकम्", iastTitle: "Yamunāṣṭakam", author: "Śrī Vallabhācārya", nodeKind: "stotra" },
    { id: "sud-navaratnam", sanskritTitle: "नवरत्नम्", iastTitle: "Navaratnam", author: "Śrī Vallabhācārya", nodeKind: "stotra" },
    { id: "sud-krsnasrayah", sanskritTitle: "कृष्णाश्रयः", iastTitle: "Kṛṣṇāśrayaḥ", author: "Śrī Vallabhācārya", nodeKind: "stotra" },
    { id: "sud-parivrdhastakam", sanskritTitle: "परिवृढाष्टकम्", iastTitle: "Parivṛḍhāṣṭakam", author: "Śrī Vallabhācārya", nodeKind: "stotra" },
  ],
  otherPrakaranas: [
    {
      id: "sud-vidvanmandana",
      sanskritTitle: "विद्वन्मण्डनम्",
      iastTitle: "Vidvanmaṇḍanam",
      author: "Śrī Viṭṭhalanātha (Gusāīñjī)",
      nodeKind: "prakarana",
      children: [
        { id: "sud-suvarnasutra", sanskritTitle: "सुवर्णसूत्रम्", iastTitle: "Suvarṇasūtram", author: "Gosvāmī Puruṣottamajī", nodeKind: "tika" },
      ],
    },
    { id: "sud-prameyaratnarnava", sanskritTitle: "प्रमेयरत्नार्णवः", iastTitle: "Prameyaratnārṇavaḥ", author: "Bālakṛṣṇa Bhaṭṭa (Lālu Bhaṭṭa)", nodeKind: "prakarana" },
    { id: "sud-suddhadvaitamartanda", sanskritTitle: "शुद्धाद्वैतमार्तण्डः", iastTitle: "Śuddhādvaitamārtaṇḍaḥ", author: "Śrī Giridhara Mahārāja", nodeKind: "prakarana" },
    { id: "sud-prasthanaratnakara", sanskritTitle: "प्रस्थानरत्नाकरः", iastTitle: "Prasthānaratnākaraḥ", author: "Gosvāmī Puruṣottamajī", nodeKind: "prakarana" },
    { id: "sud-bhaktihamsa", sanskritTitle: "भक्तिहंसः", iastTitle: "Bhaktihaṁsaḥ", author: "Śrī Viṭṭhalanātha", nodeKind: "prakarana" },
  ],
});

// =========================================================
// 5. DVAITĀDVAITA (NIMBĀRKA SAMPRADĀYA)
// =========================================================
const DVAITADVAITA_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "dvaitadvaita-root",
  prefix: "nim",
  sanskritTitle: "द्वैताद्वैतम् (निम्बार्क-सम्प्रदायः)",
  iastTitle: "Dvaitādvaita Vedānta (Nimbārka Sampradāya)",
  author: "Śrī Nimbārkācārya",
  englishSubtitle: "Svābhāvika Bhedābheda",
  paramparaId: "dvaitadvaita",
  commentaryParamparaId: "dvaitadvaita",
  founderPrakaranasTitleSanskrit: "श्रीनिम्बार्काचार्यविरचिताः प्रकरणग्रन्थाः",
  founderPrakaranasTitleIast: "Śrī Nimbārka Prakaraṇa Granthas",
  founderStotrasTitleSanskrit: "श्रीनिम्बार्काचार्यविरचितानि स्तोत्राणि",
  founderStotrasTitleIast: "Śrī Nimbārka Stotras",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other Nimbārka Sampradāya Prakaraṇas",
  buildUpanisadBranch: (u) => [
    {
      id: `nim-${u.key}-bhashya`,
      sanskritTitle: `${u.stemSanskrit}-निम्बार्कसम्प्रदायव्याख्या`,
      iastTitle: `${u.stemIast} Nimbārka Exegesis`,
      author: "Sanatkumāra-Nimbārka Tradition",
      paramparaId: "dvaitadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "dvaitadvaita",
      granthaId: u.granthaId,
      children: [
        {
          id: `nim-${u.key}-tika`,
          sanskritTitle: "स्वाभाविकभेदाभेद-दीपिका",
          iastTitle: "Svābhāvikabhedābheda-Dīpikā",
          author: "Nimbārka Exegetical Lineage",
          paramparaId: "dvaitadvaita",
          nodeKind: "tika",
        },
      ],
    },
  ],
  gitaBhashyas: [
    {
      id: "nim-gita-tattvaprakasika",
      sanskritTitle: "श्रीमद्भगवद्गीतातत्त्वप्रकाशिका",
      iastTitle: "Gītātattvaprakāśikā",
      author: "Keśava Kāśmīrī Bhaṭṭa",
      century: "15th–16th Century CE",
      paramparaId: "dvaitadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "dvaitadvaita",
      granthaId: "bhagavadgita",
      children: [
        { id: "nim-gita-bhavaprakasika", sanskritTitle: "गीता-भावप्रकाशिका", iastTitle: "Gītā-Bhāvaprakāśikā", author: "Harivyāsadevācārya", nodeKind: "tika" },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "nim-parijata",
      sanskritTitle: "वेदान्तपारिजातसौरभम्",
      iastTitle: "Vedānta-Pārijāta-Saurabham",
      author: "Śrī Nimbārkācārya",
      century: "11th–12th Century CE",
      paramparaId: "dvaitadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "dvaitadvaita",
      granthaId: "vedanta-parijata-saurabha",
      children: [
        {
          id: "nim-kaustubha",
          sanskritTitle: "वेदान्तकौस्तुभः",
          iastTitle: "Vedānta-Kaustubhaḥ",
          author: "Śrī Śrīnivāsācārya",
          century: "13th Century CE",
          paramparaId: "dvaitadvaita",
          nodeKind: "tika",
          children: [
            {
              id: "nim-kaustubha-prabha",
              sanskritTitle: "वेदान्तकौस्तुभप्रभा",
              iastTitle: "Vedānta-Kaustubha-Prabhā",
              author: "Keśava Kāśmīrī Bhaṭṭa",
              century: "15th–16th Century CE",
              nodeKind: "tika",
            },
          ],
        },
      ],
    },
  ],
  founderPrakaranas: [
    {
      id: "nim-dasasloki",
      sanskritTitle: "दशश्लोकी (वेदान्तकामधेनुः)",
      iastTitle: "Daśaślokī (Vedāntakāmadhenu)",
      author: "Śrī Nimbārkācārya",
      nodeKind: "prakarana",
      children: [
        { id: "nim-ratnamanjusa", sanskritTitle: "वेदान्तरत्नमञ्जूषा", iastTitle: "Vedāntaratnamañjūṣā", author: "Śrī Puruṣottamācārya", nodeKind: "tika" },
        { id: "nim-laghumanjusa", sanskritTitle: "लघुमञ्जूषा", iastTitle: "Laghumañjūṣā", author: "Giridhara Prapanna", nodeKind: "tika" },
      ],
    },
    { id: "nim-sadacarasanksepa", sanskritTitle: "सदाचारप्रकाशः", iastTitle: "Sadācāraprakāśaḥ", author: "Śrī Nimbārkācārya", nodeKind: "prakarana" },
  ],
  founderStotras: [
    {
      id: "nim-savisesa",
      sanskritTitle: "सविशेषनिर्विशेषश्रीकृष्णस्तवराजः",
      iastTitle: "Saviśeṣa-Nirviśeṣa-Śrīkṛṣṇa-Stavarājaḥ",
      author: "Śrī Nimbārkācārya",
      nodeKind: "stotra",
      children: [
        { id: "nim-srutyantakalpavalli", sanskritTitle: "श्रुत्यन्तकल्पवल्ली", iastTitle: "Śrutyantakalpavallī", author: "Puruṣottama Prasāda", nodeKind: "tika" },
      ],
    },
    { id: "nim-pratahsmaranam", sanskritTitle: "प्रातःस्मरणस्तोत्रम्", iastTitle: "Prātaḥsmaraṇastotram", author: "Śrī Nimbārkācārya", nodeKind: "stotra" },
    { id: "nim-radhastakam", sanskritTitle: "राधाष्टकम्", iastTitle: "Rādhāṣṭakam", author: "Śrī Nimbārkācārya (Trad.)", nodeKind: "stotra" },
  ],
  otherPrakaranas: [
    {
      id: "nim-siddhantajahnavi",
      sanskritTitle: "सिद्धान्तजाह्नवी",
      iastTitle: "Siddhāntajāhnavī",
      author: "Śrī Devācārya",
      nodeKind: "prakarana",
      children: [
        { id: "nim-siddhantasetuka", sanskritTitle: "सिद्धान्तसेतुका", iastTitle: "Siddhāntasetukā", author: "Śrī Sundara Bhaṭṭa", nodeKind: "tika" },
      ],
    },
    { id: "nim-adhyatmasudha", sanskritTitle: "अध्यात्मसुधातरङ्गिणी", iastTitle: "Adhyātmasudhātaraṅgiṇī", author: "Śrī Puruṣottamācārya", nodeKind: "prakarana" },
    { id: "nim-parapaksagirivajra", sanskritTitle: "परपक्षगिरिवज्रः", iastTitle: "Parapakṣagirivajraḥ", author: "Mādhava Mukunda", nodeKind: "prakarana" },
    { id: "nim-vedantatattvabodha", sanskritTitle: "वेदान्ततत्त्वबोधः", iastTitle: "Vedāntatattvabodhaḥ", author: "Śrī Anantarāma", nodeKind: "prakarana" },
  ],
});

// =========================================================
// 6. ACINTYA BHEDĀBHEDA (GAUḌĪYA VAIṢṆAVA SAMPRADĀYA)
// =========================================================
const ACINTYA_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "acintya-root",
  prefix: "aci",
  sanskritTitle: "अचिन्त्यभेदाभेदः (गौडीय-सम्प्रदायः)",
  iastTitle: "Acintyabhedābheda Vedānta (Gauḍīya Sampradāya)",
  author: "Śrī Caitanya Mahāprabhu, Ṣaḍ-Gosvāmīs & Baladeva Vidyābhūṣaṇa",
  englishSubtitle: "Inconceivable Simultaneous Oneness & Difference",
  paramparaId: "acintya",
  commentaryParamparaId: "acintya",
  founderPrakaranasTitleSanskrit: "श्रीमद्गौडीयाचार्यविरचिताः प्रकरणग्रन्थाः",
  founderPrakaranasTitleIast: "Gauḍīya Gosvāmī Prakaraṇa Granthas",
  founderStotrasTitleSanskrit: "श्रीमद्गौडीयाचार्यविरचितानि स्तोत्राणि",
  founderStotrasTitleIast: "Gauḍīya Vaiṣṇava Stotras",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other Gauḍīya Vedānta Prakaraṇas",
  buildUpanisadBranch: (u) => [
    {
      id: `aci-${u.key}-bhashya`,
      sanskritTitle:
        u.key === "isa"
          ? "ईशावास्योपनिषद्भाष्यम् (बलदेवकृतम्)"
          : `${u.stemSanskrit}-गौडीयभाष्यम्`,
      iastTitle:
        u.key === "isa"
          ? "Īśāvāsyopaniṣad-Bhāṣyam (Baladeva)"
          : `${u.stemIast} Gauḍīya Bhāṣyam`,
      author: "Śrī Baladeva Vidyābhūṣaṇa & Gauḍīya Tradition",
      century: "18th Century CE",
      paramparaId: "acintya",
      nodeKind: "bhashya",
      commentaryParamparaId: "acintya",
      granthaId: u.granthaId,
      children: [
        {
          id: `aci-${u.key}-tika`,
          sanskritTitle:
            u.key === "isa"
              ? "वेदान्तचिन्तामणिः / विवृतिः"
              : "अचिन्त्यभेदाभेद-विवृतिः",
          iastTitle: "Vedānta-Cintāmaṇi / Acintya Vivṛtiḥ",
          author: "Śrīla Bhaktivinoda Ṭhākura & Tradition",
          paramparaId: "acintya",
          nodeKind: "tika",
        },
      ],
    },
  ],
  gitaBhashyas: [
    {
      id: "aci-gita-bhusana",
      sanskritTitle: "गीताभूषणभाष्यम्",
      iastTitle: "Gītābhūṣaṇa-Bhāṣyam",
      author: "Śrī Baladeva Vidyābhūṣaṇa",
      century: "18th Century CE",
      paramparaId: "acintya",
      nodeKind: "bhashya",
      commentaryParamparaId: "acintya",
      granthaId: "bhagavadgita",
      children: [
        { id: "aci-gita-sarartha", sanskritTitle: "सारार्थवर्षिणी", iastTitle: "Sārārthavarṣiṇī", author: "Śrīla Viśvanātha Cakravartī Ṭhākura", nodeKind: "tika" },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "aci-govindabhashya",
      sanskritTitle: "गोविन्दभाष्यम् (ब्रह्मसूत्रभाष्यम्)",
      iastTitle: "Govindabhāṣyam",
      author: "Śrī Baladeva Vidyābhūṣaṇa",
      century: "18th Century CE",
      paramparaId: "acintya",
      nodeKind: "bhashya",
      commentaryParamparaId: "acintya",
      granthaId: "brahmasutra",
      children: [
        { id: "aci-suksma", sanskritTitle: "सूक्ष्मटीका", iastTitle: "Sūkṣma Ṭīkā", author: "Śrī Baladeva Vidyābhūṣaṇa", nodeKind: "tika" },
        {
          id: "aci-siddhantaratna-bs",
          sanskritTitle: "सिद्धान्तरत्नम् (गोविन्दभाष्यपीठकम्)",
          iastTitle: "Siddhāntaratnam",
          author: "Śrī Baladeva Vidyābhūṣaṇa",
          paramparaId: "acintya",
          nodeKind: "tika",
          granthaId: "siddhantaratna",
        },
      ],
    },
  ],
  founderPrakaranas: [
    {
      id: "aci-sandarbha",
      sanskritTitle: "षट्सन्दर्भाः",
      iastTitle: "Ṣaṭ-Sandarbhaḥ",
      author: "Śrī Jīva Gosvāmī",
      nodeKind: "branch",
      children: [
        { id: "aci-tattvasandarbha", sanskritTitle: "तत्त्वसन्दर्भः", iastTitle: "Tattvasandarbhaḥ", nodeKind: "prakarana" },
        { id: "aci-bhagavatsandarbha", sanskritTitle: "भगवत्सन्दर्भः", iastTitle: "Bhagavatsandarbhaḥ", nodeKind: "prakarana" },
        { id: "aci-paramatmasandarbha", sanskritTitle: "परमात्मसन्दर्भः", iastTitle: "Paramātmasandarbhaḥ", nodeKind: "prakarana" },
        { id: "aci-krsnasandarbha", sanskritTitle: "श्रीकृष्णसन्दर्भः", iastTitle: "Śrīkṛṣṇasandarbhaḥ", nodeKind: "prakarana" },
        { id: "aci-bhaktisandarbha", sanskritTitle: "भक्तिसन्दर्भः", iastTitle: "Bhaktisandarbhaḥ", nodeKind: "prakarana" },
        { id: "aci-pritisandarbha", sanskritTitle: "प्रीतिसन्दर्भः", iastTitle: "Prītisandarbhaḥ", nodeKind: "prakarana" },
      ],
    },
    { id: "aci-bhaktirasamrta", sanskritTitle: "भक्तिरसामृतसिन्धुः", iastTitle: "Bhaktirasāmṛtasindhuḥ", author: "Śrī Rūpa Gosvāmī", nodeKind: "prakarana" },
    { id: "aci-ujjvalanilamani", sanskritTitle: "उज्ज्वलनीलमणिः", iastTitle: "Ujjvalanīlamaṇiḥ", author: "Śrī Rūpa Gosvāmī", nodeKind: "prakarana" },
    { id: "aci-sarvasamvadini", sanskritTitle: "सर्वसंवादिनी", iastTitle: "Sarvasaṁvādinī", author: "Śrī Jīva Gosvāmī", nodeKind: "prakarana" },
  ],
  founderStotras: [
    { id: "aci-siksastakam", sanskritTitle: "शिक्षाष्टकम्", iastTitle: "Śikṣāṣṭakam", author: "Śrī Caitanya Mahāprabhu", nodeKind: "stotra" },
    { id: "aci-stavamala", sanskritTitle: "स्तवमाला", iastTitle: "Stavamālā", author: "Śrī Rūpa Gosvāmī", nodeKind: "stotra" },
    { id: "aci-stavavali", sanskritTitle: "स्तवावली", iastTitle: "Stavāvalī", author: "Śrī Raghunātha Dāsa Gosvāmī", nodeKind: "stotra" },
    { id: "aci-dasavatara", sanskritTitle: "दशावतारस्तोत्रम्", iastTitle: "Daśāvatāra Stotram", author: "Śrī Jayadeva Gosvāmī", nodeKind: "stotra" },
  ],
  otherPrakaranas: [
    {
      id: "aci-siddhantaratna",
      sanskritTitle: "सिद्धान्तरत्नम्",
      iastTitle: "Siddhāntaratnam",
      author: "Śrī Baladeva Vidyābhūṣaṇa",
      century: "18th Century CE",
      paramparaId: "acintya",
      nodeKind: "prakarana",
      granthaId: "siddhantaratna",
    },
    { id: "aci-prameyaratnavali", sanskritTitle: "प्रमेयरत्नावली", iastTitle: "Prameyaratnāvalī", author: "Śrī Baladeva Vidyābhūṣaṇa", nodeKind: "prakarana" },
    { id: "aci-laghubhagavatamrta", sanskritTitle: "लघुभागवतामृतम्", iastTitle: "Laghubhāgavatāmṛtam", author: "Śrī Rūpa Gosvāmī", nodeKind: "prakarana" },
    { id: "aci-brhadbhagavatamrta", sanskritTitle: "बृहद्भागवतामृतम्", iastTitle: "Bṛhadbhāgavatāmṛtam", author: "Śrī Sanātana Gosvāmī", nodeKind: "prakarana" },
    { id: "aci-gopalacampu", sanskritTitle: "गोपालचम्पूः", iastTitle: "Gopālacampūḥ", author: "Śrī Jīva Gosvāmī", nodeKind: "prakarana" },
  ],
});

// =========================================================
// 7. ŚĀKTAVIŚIṢṬĀDVAITA (BHATPARA ŚĀKTABHĀṢYA)
// =========================================================
const SAKTA_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "sakta-root",
  prefix: "sak",
  sanskritTitle: "शाक्तविशिष्टाद्वैतम् (शाक्तभाष्य-प्रस्थानम्)",
  iastTitle: "Śāktaviśiṣṭādvaita (Bhatpara Śāktabhāṣya)",
  author: "MM Pañcānana Bhaṭṭācārya Tarkaratna",
  englishSubtitle: "Svarūpādvaita & Integral Tantra-Vedānta",
  paramparaId: "saktavisistadvaita",
  commentaryParamparaId: "saktavisistadvaita",
  founderPrakaranasTitleSanskrit: "महामहोपाध्याय-पञ्चाननतर्करत्नविरचिताः प्रकरणग्रन्थाः",
  founderPrakaranasTitleIast: "Śākta-Vedānta Prakaraṇa Granthas",
  founderStotrasTitleSanskrit: "शाक्त-वेदान्त-स्तोत्राणि",
  founderStotrasTitleIast: "Śākta & Devī Stotras",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other Śākta & Śaivādvaita Prakaraṇas",
  buildUpanisadBranch: (u) => [
    {
      id: `sak-${u.key}-bhashya`,
      sanskritTitle:
        u.key === "isa"
          ? "ईशोपनिषद्-शाक्तभाष्यम्"
          : `${u.stemSanskrit}-शाक्तभाष्यम्`,
      iastTitle:
        u.key === "isa"
          ? "Īśopaniṣad Śāktabhāṣyam"
          : `${u.stemIast}-Śāktabhāṣyam`,
      author: "MM Pañcānana Tarkaratna & Bhatpara Tradition",
      paramparaId: "saktavisistadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "saktavisistadvaita",
      granthaId: u.granthaId,
      children: [
        {
          id: `sak-${u.key}-tika`,
          sanskritTitle: "स्वरूपाद्वैत-दीपिका",
          iastTitle: "Svarūpādvaita-Dīpikā",
          author: "Bhatpara Scholastic Tradition",
          paramparaId: "saktavisistadvaita",
          nodeKind: "tika",
          commentaryParamparaId: "saktavisistadvaita",
          tikaMatchKey: "Svarūpārtha",
          granthaId: u.granthaId,
        },
      ],
    },
  ],
  gitaBhashyas: [
    {
      id: "sak-gita-bhashya",
      sanskritTitle: "श्रीमद्भगवद्गीता-शाक्तभाष्यम्",
      iastTitle: "Bhagavadgītā-Śāktabhāṣyam",
      author: "Śākta-Vedānta Tradition",
      paramparaId: "saktavisistadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "saktavisistadvaita",
      granthaId: "bhagavadgita",
      children: [
        {
          id: "sak-gita-tika",
          sanskritTitle: "स्वरूपाद्वैत-तात्पर्यविवेचनम्",
          iastTitle: "Svarūpādvaita-Tātparyavivecanam",
          paramparaId: "saktavisistadvaita",
          nodeKind: "tika",
          commentaryParamparaId: "saktavisistadvaita",
          granthaId: "bhagavadgita",
        },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "sak-brahmasutra",
      sanskritTitle: "ब्रह्मसूत्र-शाक्तभाष्यम्",
      iastTitle: "Brahmasūtra-Śāktabhāṣyam",
      author: "MM Pañcānana Bhaṭṭācārya Tarkaratna",
      century: "20th Century CE (1938)",
      paramparaId: "saktavisistadvaita",
      nodeKind: "bhashya",
      commentaryParamparaId: "saktavisistadvaita",
      granthaId: "brahmasutra-saktabhasya",
      children: [
        {
          id: "sak-svarupartha",
          sanskritTitle: "शाक्तभाष्य-स्वरूपाद्वैत-दीपिका",
          iastTitle: "Svarūpārtha-Dīpikā",
          paramparaId: "saktavisistadvaita",
          nodeKind: "tika",
          commentaryParamparaId: "saktavisistadvaita",
          tikaMatchKey: "Svarūpārtha",
          granthaId: "brahmasutra",
        },
        {
          id: "sak-tattvabodhakhya",
          sanskritTitle: "तत्त्वबोधाख्या-विवृतिः",
          iastTitle: "Tattvabodhākhyā Vivṛtiḥ",
          paramparaId: "saktavisistadvaita",
          nodeKind: "tika",
        },
      ],
    },
    {
      id: "sak-srikantha",
      sanskritTitle: "श्रीकण्ठभाष्यम् (शैवविशिष्टाद्वैतम्)",
      iastTitle: "Śrīkaṇṭhabhāṣyam",
      author: "Śrīkaṇṭha Śivācārya",
      nodeKind: "bhashya",
      children: [
        { id: "sak-sivarkamanidipika", sanskritTitle: "शिवार्कमणिदीपिका", iastTitle: "Śivārkamaṇidīpikā", author: "Appayya Dīkṣita", nodeKind: "tika" },
      ],
    },
  ],
  founderPrakaranas: [
    { id: "sak-saktirahasya", sanskritTitle: "शक्तिरहस्यम्", iastTitle: "Śaktirahasyam", author: "MM Pañcānana Tarkaratna", nodeKind: "prakarana" },
    { id: "sak-svarupadvaitasiddhanta", sanskritTitle: "स्वरूपाद्वैतसिद्धान्तः", iastTitle: "Svarūpādvaitasiddhāntaḥ", author: "MM Pañcānana Tarkaratna", nodeKind: "prakarana" },
    { id: "sak-sarvamangala", sanskritTitle: "सर्वमङ्गला महाकाव्यम्", iastTitle: "Sarvamaṅgalā Mahākāvyam", author: "MM Pañcānana Tarkaratna", nodeKind: "prakarana" },
  ],
  founderStotras: [
    { id: "sak-anandalahari", sanskritTitle: "आनन्दलहरी / सौन्दर्यलहरी", iastTitle: "Ānandalaharī / Saundaryalaharī", nodeKind: "stotra" },
    { id: "sak-devimahatmya", sanskritTitle: "देवीमाहात्म्य-स्तोत्राणि", iastTitle: "Devīmāhātmya Stotras", nodeKind: "stotra" },
    { id: "sak-srividya", sanskritTitle: "श्रीविद्या-नवरत्नमालिका", iastTitle: "Śrīvidyā-Navaratnamālikā", nodeKind: "stotra" },
  ],
  otherPrakaranas: [
    { id: "sak-saktitattvavimarsa", sanskritTitle: "शक्तितत्त्वविमर्शः", iastTitle: "Śaktitattvavimarśaḥ", nodeKind: "prakarana" },
    { id: "sak-tantrasara", sanskritTitle: "तन्त्रसारः", iastTitle: "Tantrasāraḥ", author: "Kṛṣṇānanda Āgamavāgīśa", nodeKind: "prakarana" },
    { id: "sak-agamakalpadruma", sanskritTitle: "आगमकल्पद्रुमः", iastTitle: "Āgamakalpadrumaḥ", nodeKind: "prakarana" },
    { id: "sak-kularnava", sanskritTitle: "कुलार्णवतन्त्रम्", iastTitle: "Kulārṇavatantram", nodeKind: "prakarana" },
  ],
});

// =========================================================
// 8. AKṢARA-PURUṢOTTAMA DARŚANA (SVĀMINĀRĀYAṆA VEDĀNTA)
// =========================================================
const SWAMINARAYAN_TREE: TraditionTreeNode = buildUniformTraditionTree({
  rootId: "swaminarayan-root",
  prefix: "swa",
  sanskritTitle: "अक्षरपुरुषोत्तम-दर्शनम् (स्वामिनारायण-भाष्यम्)",
  iastTitle: "Akṣara-Puruṣottama Darśana (Svāminārāyaṇa Vedānta)",
  author: "Bhagavān Svāminārāyaṇa & MM Bhadreśadāsa Svāmī",
  englishSubtitle: "Ontology of Five Eternal Realities (Pañca-Tattvas)",
  paramparaId: "swaminarayan",
  commentaryParamparaId: "aksarapurusottama",
  founderPrakaranasTitleSanskrit: "भगवत्स्वामिनारायण-प्रोक्ताः प्रकरणग्रन्थाः",
  founderPrakaranasTitleIast: "Bhagavān Svāminārāyaṇa Prakaraṇa Granthas",
  founderStotrasTitleSanskrit: "स्वामिनारायण-सम्प्रदाय-स्तोत्राणि",
  founderStotrasTitleIast: "Svāminārāyaṇa Tradition Stotras",
  otherPrakaranasTitleSanskrit: "इतरे प्रकरणग्रन्थाः",
  otherPrakaranasTitleIast: "Other Akṣara-Puruṣottama Prakaraṇas",
  buildUpanisadBranch: (u) => {
    const chapterHint =
      u.key === "mundaka"
        ? "sb-up-mundaka"
        : u.key === "katha"
        ? "sb-up-katha"
        : u.key === "taittiriya"
        ? "sb-up-taittiriya"
        : undefined;
    return [
      {
        id: `swa-${u.key}-bhashya`,
        sanskritTitle: `${u.stemSanskrit}-स्वामिनारायणभाष्यम्`,
        iastTitle: `${u.stemIast}-Svāminārāyaṇa-Bhāṣyam`,
        author: "MM Bhadreśadāsa Svāmī",
        century: "21st Century CE",
        paramparaId: "swaminarayan",
        nodeKind: "bhashya",
        commentaryParamparaId: "aksarapurusottama",
        granthaId: chapterHint ? "swaminarayan-upanishad-bhashyam" : u.granthaId,
        chapterId: chapterHint,
        children: [
          {
            id: `swa-${u.key}-sudha`,
            sanskritTitle: "स्वामिनारायणसिद्धान्तसुधा",
            iastTitle: "Svāminārāyaṇa-Siddhānta-Sudhā",
            author: "MM Bhadreśadāsa Svāmī",
            paramparaId: "swaminarayan",
            nodeKind: "tika",
            commentaryParamparaId: "aksarapurusottama",
            tikaMatchKey: "Sudha",
            granthaId: "swaminarayan-siddhanta-sudha",
          },
        ],
      },
    ];
  },
  gitaBhashyas: [
    {
      id: "swa-gita-bhashya",
      sanskritTitle: "श्रीमद्भगवद्गीता-स्वामिनारायणभाष्यम्",
      iastTitle: "Śrīmad-Bhagavad-Gītā-Svāminārāyaṇa-Bhāṣyam",
      author: "MM Bhadreśadāsa Svāmī",
      century: "21st Century CE",
      paramparaId: "swaminarayan",
      nodeKind: "bhashya",
      commentaryParamparaId: "aksarapurusottama",
      granthaId: "swaminarayan-gita-bhashyam",
      children: [
        {
          id: "swa-gita-sudha",
          sanskritTitle: "स्वामिनारायणसिद्धान्तसुधा",
          iastTitle: "Svāminārāyaṇa-Siddhānta-Sudhā",
          author: "MM Bhadreśadāsa Svāmī",
          paramparaId: "swaminarayan",
          nodeKind: "tika",
          granthaId: "swaminarayan-siddhanta-sudha",
        },
      ],
    },
  ],
  brahmasutraBhashyas: [
    {
      id: "swa-bs-bhashya",
      sanskritTitle: "ब्रह्मसूत्र-स्वामिनारायणभाष्यम्",
      iastTitle: "Brahmasūtra-Svāminārāyaṇa-Bhāṣyam",
      author: "MM Bhadreśadāsa Svāmī",
      century: "21st Century CE",
      paramparaId: "swaminarayan",
      nodeKind: "bhashya",
      commentaryParamparaId: "aksarapurusottama",
      granthaId: "swaminarayan-brahmasutra-bhashyam",
      children: [
        {
          id: "swa-bs-sudha",
          sanskritTitle: "स्वामिनारायणसिद्धान्तसुधा (वादविस्तारः)",
          iastTitle: "Svāminārāyaṇa-Siddhānta-Sudhā",
          author: "MM Bhadreśadāsa Svāmī",
          paramparaId: "swaminarayan",
          nodeKind: "tika",
          commentaryParamparaId: "aksarapurusottama",
          tikaMatchKey: "Sudha",
          granthaId: "swaminarayan-siddhanta-sudha",
        },
      ],
    },
  ],
  founderPrakaranas: [
    {
      id: "swa-vachanamrut",
      sanskritTitle: "वचनामृतम्",
      iastTitle: "Vachanāmrut",
      author: "Bhagavān Svāminārāyaṇa",
      century: "19th Century CE",
      paramparaId: "swaminarayan",
      nodeKind: "prakarana",
      granthaId: "vachanamrut",
    },
    { id: "swa-shikshapatri", sanskritTitle: "शिक्षापत्री", iastTitle: "Śikṣāpatrī", author: "Bhagavān Svāminārāyaṇa", nodeKind: "prakarana" },
    { id: "swa-vedarasa", sanskritTitle: "वेदरसः", iastTitle: "Vedarasaḥ", author: "Bhagavān Svāminārāyaṇa", nodeKind: "prakarana" },
  ],
  founderStotras: [
    { id: "swa-sarvamangala", sanskritTitle: "सर्वमङ्गलस्तोत्रम्", iastTitle: "Sarvamaṅgala Stotram", author: "Śatānanda Muni", nodeKind: "stotra" },
    { id: "swa-narayanagita", sanskritTitle: "नारायणगीता", iastTitle: "Nārāyaṇagītā", author: "Brahmananda Svāmī", nodeKind: "stotra" },
    { id: "swa-murtidhyana", sanskritTitle: "मूर्तिध्यानाष्टकम्", iastTitle: "Mūrtidhyānāṣṭakam", nodeKind: "stotra" },
  ],
  otherPrakaranas: [
    {
      id: "swa-siddhanta-sudha",
      sanskritTitle: "स्वामिनारायणसिद्धान्तसुधा",
      iastTitle: "Svāminārāyaṇa-Siddhānta-Sudhā",
      author: "MM Bhadreśadāsa Svāmī",
      paramparaId: "swaminarayan",
      nodeKind: "prakarana",
      granthaId: "swaminarayan-siddhanta-sudha",
    },
    { id: "swa-satsangijivanam", sanskritTitle: "सत्सङ्गिजीवनम्", iastTitle: "Satsaṅgijīvanam", author: "Śatānanda Muni", nodeKind: "prakarana" },
    { id: "swa-harivakyasudhasindhu", sanskritTitle: "हरिवाक्यसुधासिन्धुः", iastTitle: "Harivākyasudhāsindhuḥ", author: "Śatānanda Muni", nodeKind: "prakarana" },
  ],
});

/** Ordered list of classical traditions that share the exact uniform 4-branch Grantha Pāṭhanam skeleton */
export const UNIFORM_TRADITION_TREES: {
  id: string;
  label: string;
  sanskritLabel: string;
  root: TraditionTreeNode;
}[] = [
  { id: "advaita", label: "Śāṅkarādvaita", sanskritLabel: "शाङ्कराद्वैतम्", root: ADVAITA_TREE },
  { id: "visistadvaita", label: "Viśiṣṭādvaita", sanskritLabel: "विशिष्टाद्वैतम्", root: VISISTADVAITA_TREE },
  { id: "dvaita", label: "Dvaita", sanskritLabel: "द्वैतम्", root: DVAITA_TREE },
  { id: "suddhadvaita", label: "Śuddhādvaita", sanskritLabel: "शुद्धाद्वैतम्", root: SUDDHADVAITA_TREE },
  { id: "dvaitadvaita", label: "Dvaitādvaita", sanskritLabel: "द्वैताद्वैतम्", root: DVAITADVAITA_TREE },
  { id: "acintya", label: "Acintya Bhedābheda", sanskritLabel: "अचिन्त्यभेदाभेदः", root: ACINTYA_TREE },
  { id: "sakta", label: "Śāktaviśiṣṭādvaita", sanskritLabel: "शाक्तविशिष्टाद्वैतम्", root: SAKTA_TREE },
  { id: "swaminarayan", label: "Akṣara-Puruṣottama", sanskritLabel: "अक्षरपुरुषोत्तमम्", root: SWAMINARAYAN_TREE },
];

export const VEDANTA_TRADITION_TREE: TraditionTreeNode = {
  id: "vedanta-root",
  sanskritTitle: "वेदान्त-वाङ्मयम्",
  iastTitle: "Vedānta-Vāṅmayam",
  englishSubtitle: "Complete Corpus Across All Vedānta Traditions",
  nodeKind: "root",
  defaultExpanded: true,
  children: [
    // =========================================================
    // 0. PRASTHĀNATRAYĪ (VEDIC ŚRUTI, NYĀYA & SMṚTI ROOT)
    // =========================================================
    {
      id: "prasthanatrayi-root",
      sanskritTitle: "प्रस्थानत्रयम् (मूलम्)",
      iastTitle: "Prasthānatrayam",
      englishSubtitle: "The Triple Canonical Foundation",
      paramparaId: "vedic_root",
      nodeKind: "branch",
      defaultExpanded: true,
      children: [
        {
          id: "pt-upanishads",
          sanskritTitle: "उपनिषदः (श्रुति-प्रस्थानम्)",
          iastTitle: "Upaniṣadaḥ (Śruti Prasthāna)",
          englishSubtitle: "Revealed Upaniṣadic Corpus",
          paramparaId: "vedic_root",
          nodeKind: "branch",
          defaultExpanded: true,
          children: [
            {
              id: "pt-dashopanishad",
              sanskritTitle: "दशोपनिषदः",
              iastTitle: "Daśopaniṣadaḥ (10 Principal Upaniṣads)",
              paramparaId: "vedic_root",
              nodeKind: "branch",
              defaultExpanded: false,
              children: TEN_UPANISADS.map((u) => ({
                id: `pt-${u.key}`,
                sanskritTitle: u.sanskritTitle,
                iastTitle: u.iastTitle,
                paramparaId: "vedic_root" as ParamparaId,
                nodeKind: "mula" as const,
                granthaId: u.granthaId,
                chapterId: u.chapterId,
              })),
            },
            {
              id: "pt-itaropanishad",
              sanskritTitle: "इतरोपनिषदः",
              iastTitle: "Itaropaniṣadaḥ (Other Upaniṣads)",
              paramparaId: "vedic_root",
              nodeKind: "branch",
              children: [
                {
                  id: "pt-acamana",
                  sanskritTitle: "आचमनोपनिषत्",
                  iastTitle: "Ācamanopaniṣad",
                  englishSubtitle: "Minor Upaniṣadic Text",
                  paramparaId: "vedic_root",
                  nodeKind: "mula",
                  granthaId: "acamanopanisad",
                },
                {
                  id: "pt-svetasvatara",
                  sanskritTitle: "श्वेताश्वतरोपनिषत्",
                  iastTitle: "Śvetāśvataropaniṣad",
                  englishSubtitle: "Kṛṣṇa Yajurveda",
                  paramparaId: "vedic_root",
                  nodeKind: "mula",
                },
                {
                  id: "pt-kausitaki",
                  sanskritTitle: "कौषीतक्युपनिषत्",
                  iastTitle: "Kauṣītakyupaniṣad",
                  englishSubtitle: "Ṛgveda",
                  paramparaId: "vedic_root",
                  nodeKind: "mula",
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
          nodeKind: "mula",
          granthaId: "bhagavadgita",
        },
        {
          id: "pt-brahmasutra",
          sanskritTitle: "ब्रह्मसूत्राणि (न्याय-प्रस्थानम्)",
          iastTitle: "Brahmasūtrāṇi (Nyāya Prasthāna)",
          author: "Maharṣi Bādarāyaṇa Vyāsa",
          englishSubtitle: "4 Adhyāyas • 555 Sūtras",
          paramparaId: "vedic_root",
          nodeKind: "mula",
          granthaId: "brahmasutra",
          children: [
            {
              id: "pt-bs-1",
              sanskritTitle: "प्रथमोऽध्यायः — समन्वयाध्यायः",
              iastTitle: "Adhyāya 1: Samanvaya",
              nodeKind: "mula",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-1",
            },
            {
              id: "pt-bs-2",
              sanskritTitle: "द्वितीयोऽध्यायः — अविरोधाध्यायः",
              iastTitle: "Adhyāya 2: Avirodha",
              nodeKind: "mula",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-2",
            },
            {
              id: "pt-bs-3",
              sanskritTitle: "तृतीयोऽध्यायः — साधनाध्यायः",
              iastTitle: "Adhyāya 3: Sādhana",
              nodeKind: "mula",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-3",
            },
            {
              id: "pt-bs-4",
              sanskritTitle: "चतुर्थोऽध्यायः — फलाध्यायः",
              iastTitle: "Adhyāya 4: Phala",
              nodeKind: "mula",
              granthaId: "brahmasutra",
              chapterId: "brahmasutra-adhyaya-4",
            },
          ],
        },
      ],
    },

    // Uniform 4-branch canonical trees across all 8 classical traditions:
    ADVAITA_TREE,
    VISISTADVAITA_TREE,
    DVAITA_TREE,
    SUDDHADVAITA_TREE,
    DVAITADVAITA_TREE,
    ACINTYA_TREE,
    SAKTA_TREE,
    SWAMINARAYAN_TREE,

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
      nodeKind: "root",
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
