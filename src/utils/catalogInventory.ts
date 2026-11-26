import { TextEntry } from "../types";

export interface CatalogTextStatusRow {
  order: number;
  textId: string;
  title: string;
  transliteratedTitle: string;
  author: string;
  century: string;
  school: string;
  paramparaId: string;
  chapterCount: number;
  verseCount: number;
  mulaSanskritStatus: string;
  iastStatus: string;
  padacchedaStatus: string;
  anvayaStatus: string;
  englishTranslationStatus: string;
  bhashyaExtractStatus: string;
  commentaryNotesStatus: string;
  classicalBhashyaCount: number;
  classicalBhashyaNames: string[];
  tikaCount: number;
  approvedProofreadCount: number;
  hasAnyCommentary: boolean;
  hasTranslation: boolean;
  editionSummary: string;
}

export interface CatalogInventorySummary {
  totalTexts: number;
  totalChapters: number;
  totalVerses: number;
  textsWithTranslation: number;
  textsWithCommentary: number;
  totalProofreadUpdates: number;
}

export interface CatalogInventoryResult {
  rows: CatalogTextStatusRow[];
  summary: CatalogInventorySummary;
  signature: string;
}

function formatCoverage(covered: number, total: number): string {
  if (total === 0) return "No (0/0)";
  if (covered === 0) return `No (0/${total})`;
  if (covered >= total) return `Yes (${covered}/${total})`;
  return `Partial (${covered}/${total})`;
}

function hasNonEmptyText(val: string | undefined | null): boolean {
  return typeof val === "string" && val.trim().length > 0;
}

export function computeCatalogInventory(
  texts: TextEntry[],
  approvedCorrections: Array<{ textId: string; field: string }>
): CatalogInventoryResult {
  const correctionsByText = new Map<string, number>();
  for (const c of approvedCorrections) {
    correctionsByText.set(c.textId, (correctionsByText.get(c.textId) || 0) + 1);
  }

  let totalChapters = 0;
  let totalVerses = 0;
  let textsWithTranslation = 0;
  let textsWithCommentary = 0;

  const rows: CatalogTextStatusRow[] = texts.map((text, idx) => {
    const chapters = text.chapters || [];
    const chapterCount = chapters.length;
    totalChapters += chapterCount;

    let verseCount = 0;
    let mulaCount = 0;
    let iastCount = 0;
    let padacchedaCount = 0;
    let anvayaCount = 0;
    let translationCount = 0;
    let bhashyaExtractCount = 0;
    let commentaryNotesCount = 0;
    let classicalBhashyaCount = 0;
    let tikaCount = 0;
    const bhashyaNameSet = new Set<string>();

    for (const ch of chapters) {
      const verses = ch.verses || [];
      verseCount += verses.length;
      for (const v of verses) {
        if (hasNonEmptyText(v.mulaSanskrit)) mulaCount++;
        if (hasNonEmptyText(v.mulaIast)) iastCount++;
        if (hasNonEmptyText(v.padaccheda)) padacchedaCount++;
        if (hasNonEmptyText(v.anvaya)) anvayaCount++;
        if (hasNonEmptyText(v.englishTranslation)) translationCount++;
        if (hasNonEmptyText(v.bhashyaExtract)) bhashyaExtractCount++;
        if (hasNonEmptyText(v.commentaryNotes)) commentaryNotesCount++;

        const bhashyas = v.bhashyas || [];
        classicalBhashyaCount += bhashyas.length;
        for (const b of bhashyas) {
          if (hasNonEmptyText(b.name)) {
            bhashyaNameSet.add(b.name.trim());
          }
          const tikas = b.tikas || [];
          tikaCount += tikas.length;
        }
      }
    }

    totalVerses += verseCount;
    const approvedProofreadCount = correctionsByText.get(text.id) || 0;
    const hasTranslation = translationCount > 0;
    const hasAnyCommentary =
      classicalBhashyaCount > 0 ||
      bhashyaExtractCount > 0 ||
      commentaryNotesCount > 0;

    if (hasTranslation) textsWithTranslation++;
    if (hasAnyCommentary) textsWithCommentary++;

    return {
      order: idx + 1,
      textId: text.id,
      title: text.title,
      transliteratedTitle: text.transliteratedTitle,
      author: text.author,
      century: text.century,
      school: text.school,
      paramparaId: text.paramparaId || "",
      chapterCount,
      verseCount,
      mulaSanskritStatus: formatCoverage(mulaCount, verseCount),
      iastStatus: formatCoverage(iastCount, verseCount),
      padacchedaStatus: formatCoverage(padacchedaCount, verseCount),
      anvayaStatus: formatCoverage(anvayaCount, verseCount),
      englishTranslationStatus: formatCoverage(translationCount, verseCount),
      bhashyaExtractStatus: formatCoverage(bhashyaExtractCount, verseCount),
      commentaryNotesStatus: formatCoverage(commentaryNotesCount, verseCount),
      classicalBhashyaCount,
      classicalBhashyaNames: Array.from(bhashyaNameSet),
      tikaCount,
      approvedProofreadCount,
      hasAnyCommentary,
      hasTranslation,
      editionSummary: text.totalVersesOrSutras || text.foundationalText || "",
    };
  });

  // Deterministic lightweight signature capturing any addition of texts, chapters,
  // verses, translations, commentaries, tikas, or live proofread approvals.
  const rawSigInput = rows
    .map(
      (r) =>
        `${r.textId}:${r.chapterCount}:${r.verseCount}:${r.mulaSanskritStatus}:${r.iastStatus}:${r.englishTranslationStatus}:${r.bhashyaExtractStatus}:${r.commentaryNotesStatus}:${r.classicalBhashyaCount}:${r.tikaCount}:${r.approvedProofreadCount}`
    )
    .join("|");

  let hashA = 2166136261;
  let hashB = 0;
  for (let i = 0; i < rawSigInput.length; i++) {
    const code = rawSigInput.charCodeAt(i);
    hashA ^= code;
    hashA = Math.imul(hashA, 16777619) >>> 0;
    hashB = ((hashB << 5) - hashB + code) >>> 0;
  }

  const signature = `v1_${rows.length}t_${totalChapters}c_${totalVerses}v_${approvedCorrections.length}p_${hashA.toString(36)}_${hashB.toString(36)}`;

  return {
    rows,
    summary: {
      totalTexts: rows.length,
      totalChapters,
      totalVerses,
      textsWithTranslation,
      textsWithCommentary,
      totalProofreadUpdates: approvedCorrections.length,
    },
    signature,
  };
}

function escapeCsvCell(value: string | number | undefined | null): string {
  const str = (value ?? "").toString();
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function buildCatalogInventoryCsv(rows: CatalogTextStatusRow[]): string {
  const exportedIso = new Date().toISOString();
  const headers = [
    "#",
    "Text ID",
    "Grantha Title",
    "Sanskrit / Transliterated Title",
    "Author",
    "Century",
    "School / Sampradāya",
    "Paramparā ID",
    "Chapters",
    "Verses / Sections",
    "Mūla Sanskrit Added?",
    "IAST Transliteration Added?",
    "Padaccheda Added?",
    "Anvaya Added?",
    "English Translation Added?",
    "Bhāṣya Extract Added?",
    "Commentary Notes Added?",
    "Classical Bhāṣyas Added?",
    "Classical Bhāṣya / Commentary Names",
    "Sub-Commentaries (Ṭīkās)",
    "Live Proofread Updates",
    "Edition / Scope Details",
    "Catalog Snapshot (ISO)",
  ];

  const csvRows = rows.map((r) =>
    [
      escapeCsvCell(r.order),
      escapeCsvCell(r.textId),
      escapeCsvCell(r.title),
      escapeCsvCell(r.transliteratedTitle),
      escapeCsvCell(r.author),
      escapeCsvCell(r.century),
      escapeCsvCell(r.school),
      escapeCsvCell(r.paramparaId),
      escapeCsvCell(r.chapterCount),
      escapeCsvCell(r.verseCount),
      escapeCsvCell(r.mulaSanskritStatus),
      escapeCsvCell(r.iastStatus),
      escapeCsvCell(r.padacchedaStatus),
      escapeCsvCell(r.anvayaStatus),
      escapeCsvCell(r.englishTranslationStatus),
      escapeCsvCell(r.bhashyaExtractStatus),
      escapeCsvCell(r.commentaryNotesStatus),
      escapeCsvCell(
        r.classicalBhashyaCount > 0
          ? `Yes (${r.classicalBhashyaCount} entries)`
          : "No"
      ),
      escapeCsvCell(r.classicalBhashyaNames.join("; ")),
      escapeCsvCell(r.tikaCount > 0 ? `Yes (${r.tikaCount} entries)` : "No"),
      escapeCsvCell(
        r.approvedProofreadCount > 0
          ? `Yes (${r.approvedProofreadCount} live)`
          : "None"
      ),
      escapeCsvCell(r.editionSummary),
      escapeCsvCell(exportedIso),
    ].join(",")
  );

  return "\uFEFF" + [headers.map(escapeCsvCell).join(","), ...csvRows].join("\r\n");
}
