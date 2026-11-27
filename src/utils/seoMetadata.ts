import { TabType, TextEntry } from "../types";
import { PRESEEDED_GRANTHAS } from "../data";
import { BENGAL_VEDANTA_RESEARCH } from "../bengalVedantaData";
import { EARLY_VEDANTA_RESEARCH } from "../earlyVedantaData";

export interface PageSeoMetadata {
  title: string;
  description: string;
}

export interface ScholarlySeoInput {
  activeTab: TabType;
  mappingViewState?: {
    subView: "catalog" | "reader" | "compare" | "commentary";
    textId?: string;
    chapterId?: string;
    compareLeftId?: string;
    compareRightId?: string;
    commentaryId?: string;
  };
  comparativeCouncilSubTab?: "comparative" | "qa";
  bengalScholarId?: number | null;
  earlyThinkerId?: string | null;
}

export interface SimpleSeoInput {
  activeSimpleTab: "pathanam" | "reader" | "catalogue";
  grantha?: TextEntry;
  chapterTitle?: string;
  commentaryViewMode?: "mula" | "bhashya" | "tika";
  treeSelectionTitle?: string;
}

const BRAND_SUFFIX = " | vedāntatattvaṁ";

/**
 * Normalizes a meta description to land cleanly within 120–160 characters
 * without awkward mid-word truncation.
 */
function formatMetaDescription(raw: string): string {
  const clean = raw.replace(/\s+/g, " ").trim();
  if (clean.length >= 120 && clean.length <= 160) {
    return clean;
  }

  if (clean.length > 160) {
    const slice = clean.slice(0, 157);
    const lastSpace = slice.lastIndexOf(" ");
    const truncated = (lastSpace > 110 ? slice.slice(0, lastSpace) : slice).replace(/[.,;:—–-]+$/, "");
    return `${truncated}...`;
  }

  // Pad short descriptions meaningfully up to 120–160 characters
  const suffix = " Read original Sanskrit texts, translations, and classical Vedānta commentaries on vedāntatattvaṁ.";
  const combined = `${clean.replace(/\.$/, "")}.${suffix}`;
  if (combined.length <= 160) {
    return combined;
  }
  const slice = combined.slice(0, 157);
  const lastSpace = slice.lastIndexOf(" ");
  const truncated = (lastSpace > 110 ? slice.slice(0, lastSpace) : slice).replace(/[.,;:—–-]+$/, "");
  return `${truncated}.`;
}

/**
 * Formats a page title cleanly while preserving the brand suffix.
 */
function formatPageTitle(primary: string): string {
  const clean = primary.replace(/\s+/g, " ").trim();
  if (clean.toLowerCase().includes("vedāntatattvaṁ") || clean.toLowerCase().includes("vedantatattvam")) {
    return clean;
  }
  const maxPrimaryLen = 62 - BRAND_SUFFIX.length;
  if (clean.length <= maxPrimaryLen) {
    return `${clean}${BRAND_SUFFIX}`;
  }
  const slice = clean.slice(0, maxPrimaryLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const trimmed = (lastSpace > 18 ? slice.slice(0, lastSpace) : slice).replace(/[.,;:—–-]+$/, "");
  return `${trimmed}${BRAND_SUFFIX}`;
}

function getGranthaDisplayTitle(granthaId?: string): string | undefined {
  if (!granthaId) return undefined;
  const found = PRESEEDED_GRANTHAS.find((g) => g.id === granthaId);
  return found?.title;
}

/**
 * Generates unique, descriptive <title> and <meta name="description"> for Scholarly views.
 */
export function getScholarlySeoMetadata(input: ScholarlySeoInput): PageSeoMetadata {
  const { activeTab, mappingViewState, comparativeCouncilSubTab, bengalScholarId, earlyThinkerId } = input;

  if (activeTab === "mapping") {
    const subView = mappingViewState?.subView || "catalog";

    if (subView === "reader" && mappingViewState?.textId) {
      const grantha = PRESEEDED_GRANTHAS.find((g) => g.id === mappingViewState.textId);
      if (grantha) {
        const chapter = mappingViewState.chapterId
          ? grantha.chapters?.find((c) => c.id === mappingViewState.chapterId)
          : undefined;
        const chapterLabel = chapter?.chapterTitle ? ` (${chapter.chapterTitle})` : "";
        return {
          title: formatPageTitle(`${grantha.title}${chapterLabel}`),
          description: formatMetaDescription(
            `Read ${grantha.title} (${grantha.school}) by ${grantha.author} with Sanskrit mūla, IAST, padaccheda, and bhāṣya commentaries on vedāntatattvaṁ.`
          ),
        };
      }
    }

    if (subView === "compare") {
      const left = getGranthaDisplayTitle(mappingViewState?.compareLeftId);
      const right = getGranthaDisplayTitle(mappingViewState?.compareRightId);
      const pairLabel = left && right ? `${left} vs ${right}` : "Comparative Grantha Reader";
      return {
        title: formatPageTitle(pairLabel),
        description: formatMetaDescription(
          `Compare ${left && right ? `${left} and ${right}` : "Vedānta scriptures and commentaries"} side by side across sampradāyas and scripts on vedāntatattvaṁ.`
        ),
      };
    }

    if (subView === "commentary") {
      const commName =
        mappingViewState?.commentaryId === "shaktibhashya"
          ? "Śāktabhāṣyam Exegesis"
          : `${mappingViewState?.commentaryId || "Commentary"} Exegesis`;
      return {
        title: formatPageTitle(commName),
        description: formatMetaDescription(
          `Study ${commName} with verse-by-verse Sanskrit bhāṣya, philosophical notes, and Prasthānatrayī cross-references on vedāntatattvaṁ.`
        ),
      };
    }

    return {
      title: formatPageTitle("Granthasāraṇī – Vedānta Canon"),
      description: formatMetaDescription(
        "Browse the Granthasāraṇī canon of Upaniṣads, Brahma Sūtras, Bhagavad Gītā, prakaraṇas, and classical bhāṣyas across all Vedānta schools."
      ),
    };
  }

  if (activeTab === "tree") {
    return {
      title: formatPageTitle("Paramparā Knowledge Tree"),
      description: formatMetaDescription(
        "Explore the Advaita, Viśiṣṭādvaita, Dvaita, Śuddhādvaita, Acintya, and Śākta Vedānta lineage tree, sub-prasthānas, and masters."
      ),
    };
  }

  if (activeTab === "bharatiya_lipi") {
    return {
      title: formatPageTitle("Bharatiya Lipi & Typography"),
      description: formatMetaDescription(
        "Switch and preview Sanskrit texts across 10 Bharatiya scripts including Devanāgarī, Bengali, Tamil, Telugu, Kannada, and Malayalam."
      ),
    };
  }

  if (
    activeTab === "comparative_council" ||
    activeTab === "comparative" ||
    activeTab === "qa" ||
    activeTab === "sastrartha"
  ) {
    const isQa = comparativeCouncilSubTab === "qa" || activeTab === "qa" || activeTab === "sastrartha";
    if (isQa) {
      return {
        title: formatPageTitle("Śāstrārtha Inquiry & Q&A"),
        description: formatMetaDescription(
          "Engage in Śāstrārtha philosophical inquiry across Vedānta traditions with grounded citations from the Upaniṣads, Gītā, and bhāṣyas."
        ),
      };
    }
    return {
      title: formatPageTitle("Comparative Bhāṣya Council"),
      description: formatMetaDescription(
        "Analyze verses and Brahmasūtras comparatively across Śaṅkara, Rāmānuja, Madhva, Vallabha, Nimbārka, and Gauḍīya bhāṣya traditions."
      ),
    };
  }

  if (activeTab === "translation") {
    return {
      title: formatPageTitle("Precision Translation & Anvaya"),
      description: formatMetaDescription(
        "Generate padaccheda word splits, syntactical anvaya, grammatical vibhakti analysis, and faithful Sanskrit-to-English translations."
      ),
    };
  }

  if (activeTab === "ocr") {
    return {
      title: formatPageTitle("Sanskrit Manuscript OCR Tool"),
      description: formatMetaDescription(
        "Transcribe and restore Devanāgarī, palm-leaf, and printed Sanskrit manuscript passages with orthographic correction on vedāntatattvaṁ."
      ),
    };
  }

  if (activeTab === "early_vedanta") {
    if (earlyThinkerId) {
      const thinker = EARLY_VEDANTA_RESEARCH.preSankaraThinkers.find((t) => t.id === earlyThinkerId);
      if (thinker) {
        return {
          title: formatPageTitle(`${thinker.name} – Early Vedānta`),
          description: formatMetaDescription(
            `Examine ${thinker.name} (${thinker.centuryPeriod}, ${thinker.philosophicalSchool}) and pre-Śaṅkara fragments documented in Nakamura's Early Vedānta archive.`
          ),
        };
      }
    }
    return {
      title: formatPageTitle("Early Vedānta Archive"),
      description: formatMetaDescription(
        "Explore Pre-Śaṅkara Vedānta masters, Upaniṣadic stratification, and early Buddhist and Jaina citations based on Hajime Nakamura's research."
      ),
    };
  }

  if (activeTab === "bengal_vedanta") {
    if (bengalScholarId) {
      const scholar = BENGAL_VEDANTA_RESEARCH.scholars.find((s) => s.id === bengalScholarId);
      if (scholar) {
        return {
          title: formatPageTitle(`${scholar.name} – Bengal Vedānta`),
          description: formatMetaDescription(
            `Discover ${scholar.name} (${scholar.eraPeriod}, ${scholar.traditionOrSchool}) in Bengal's 75-scholar Vedānta heritage matrix on vedāntatattvaṁ.`
          ),
        };
      }
    }
    return {
      title: formatPageTitle("Bengal Vedānta Heritage (75 Scholars)"),
      description: formatMetaDescription(
        "Investigate Bengal's 75 Vedānta thinkers from Gauḍapāda to modern ācāryas across three canonical streams on vedāntatattvaṁ."
      ),
    };
  }

  if (activeTab === "proofread") {
    return {
      title: formatPageTitle("Reading History & Proofreading"),
      description: formatMetaDescription(
        "Review your personal Vedānta reading history, manage scriptural proofreading edits, and sync study logs on vedāntatattvaṁ."
      ),
    };
  }

  if (activeTab === "about_us") {
    return {
      title: "About vedāntatattvaṁ – Mission & Vision",
      description: formatMetaDescription(
        "Learn about vedāntatattvaṁ's non-sectarian mission to digitize, preserve, and illuminate Vedānta scriptures, lineages, and commentaries."
      ),
    };
  }

  return {
    title: "vedāntatattvaṁ – Vedānta Texts & Philosophy Research",
    description: formatMetaDescription(
      "Explore primary Vedānta scriptures, Sanskrit bhāṣyas, multi-script Indic typography, and cross-school analysis on vedāntatattvaṁ."
    ),
  };
}

/**
 * Generates unique, descriptive <title> and <meta name="description"> for Simple Version views.
 */
export function getSimpleSeoMetadata(input: SimpleSeoInput): PageSeoMetadata {
  const { activeSimpleTab, grantha, chapterTitle, commentaryViewMode, treeSelectionTitle } = input;

  if (activeSimpleTab === "pathanam") {
    return {
      title: formatPageTitle("Grantha Pāṭhanam – Simple Reader"),
      description: formatMetaDescription(
        "Navigate the interactive Grantha Pāṭhanam study tree across 8 Vedānta traditions and open mūla texts, bhāṣyas, and ṭīkās directly."
      ),
    };
  }

  if (activeSimpleTab === "catalogue") {
    return {
      title: formatPageTitle("Granthasūcī – Sacred Text Catalogue"),
      description: formatMetaDescription(
        "Browse the distraction-free Granthasūcī catalogue of Upaniṣads, Brahma Sūtras, Bhagavad Gītā, prakaraṇas, stotras, and ācārya bhāṣyas."
      ),
    };
  }

  // Reader tab
  if (grantha) {
    const modeLabel =
      commentaryViewMode === "tika"
        ? "Bhāṣya & Ṭīkā"
        : commentaryViewMode === "bhashya"
        ? "Mūla & Bhāṣya"
        : "Sacred Text";
    const sectionDetail = treeSelectionTitle || chapterTitle;
    const titleCore = sectionDetail ? `${grantha.title} – ${sectionDetail}` : `${grantha.title} (${modeLabel})`;

    return {
      title: formatPageTitle(titleCore),
      description: formatMetaDescription(
        `Read ${grantha.title} by ${grantha.author} in clean Sanskrit and IAST ${
          commentaryViewMode && commentaryViewMode !== "mula" ? `with ${modeLabel.toLowerCase()} commentary` : "for focused svādhyāya"
        } on vedāntatattvaṁ.`
      ),
    };
  }

  return {
    title: formatPageTitle("Sacred Text Reader – Simple Mode"),
    description: formatMetaDescription(
      "Enjoy distraction-free reading of classical Vedānta scriptures in Devanāgarī, regional Bharatiya scripts, and IAST on vedāntatattvaṁ."
    ),
  };
}

function upsertMetaTag(attributeName: "name" | "property", attributeValue: string, content: string): void {
  if (typeof document === "undefined") return;
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attributeName}="${attributeValue}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonicalLink(href: string): void {
  if (typeof document === "undefined") return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Synchronizes document.title, description, OpenGraph, Twitter Cards, and canonical link dynamically.
 */
export function applyDocumentSeo(meta: PageSeoMetadata): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  document.title = meta.title;
  const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
  const shareImageUrl = `${window.location.origin}/logo.png`;

  upsertMetaTag("name", "description", meta.description);
  upsertMetaTag("property", "og:title", meta.title);
  upsertMetaTag("property", "og:description", meta.description);
  upsertMetaTag("property", "og:url", canonicalUrl);
  upsertMetaTag("property", "og:image", shareImageUrl);
  upsertMetaTag("name", "twitter:title", meta.title);
  upsertMetaTag("name", "twitter:description", meta.description);
  upsertMetaTag("name", "twitter:image", shareImageUrl);
  upsertCanonicalLink(canonicalUrl);
}
