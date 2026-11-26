export type ProofreadField =
  | "mulaSanskrit"
  | "mulaIast"
  | "padaccheda"
  | "anvaya"
  | "englishTranslation"
  | "bhashyaExtract"
  | "commentaryNotes";

export interface ProofreadSubmissionRecord {
  id: string;
  submitterUid: string;
  submitterName: string;
  submitterEmail: string;
  textId: string;
  textTitle: string;
  chapterId?: string;
  chapterTitle?: string;
  verseId: string;
  verseNumber: string;
  field: ProofreadField;
  originalText: string;
  proposedText: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  reviewerUid?: string;
  reviewerNote?: string;
  approvedCorrectionId?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface DriveSyncResult {
  spreadsheetFileId: string;
  spreadsheetUrl: string;
  fileName: string;
  syncedCount: number;
}

export const PROOFREAD_FIELD_LABELS: Record<ProofreadField, string> = {
  mulaSanskrit: "Mūla Sanskrit (मूलपाठः)",
  mulaIast: "IAST Transliteration",
  padaccheda: "Padaccheda (पदच्छेदः)",
  anvaya: "Anvaya (अन्वयः)",
  englishTranslation: "English Translation",
  bhashyaExtract: "Bhāṣya Extract",
  commentaryNotes: "Commentary Notes",
};

function escapeCsvCell(value: string | undefined | null): string {
  const str = (value ?? "").toString();
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

function formatTimestampForCsv(ts: any): string {
  if (!ts) return "";
  try {
    if (typeof ts.toDate === "function") {
      return ts.toDate().toISOString();
    }
    if (ts instanceof Date) {
      return ts.toISOString();
    }
    return String(ts);
  } catch {
    return "";
  }
}

/**
 * Generates UTF-8 CSV (with BOM so Devanagari/IAST opens cleanly in Google Sheets)
 */
export function buildProofreadCsv(submissions: ProofreadSubmissionRecord[]): string {
  const headers = [
    "Submission ID",
    "Status",
    "Text ID",
    "Scripture / Grantha",
    "Chapter",
    "Verse / Section",
    "Verse ID",
    "Field",
    "Original Text",
    "Proposed Correction",
    "Proofreader Reason / Source",
    "Submitted By",
    "Submitter Email",
    "Reviewer Note",
    "Submitted At (ISO)",
    "Last Updated (ISO)",
  ];

  const rows = submissions.map((s) =>
    [
      escapeCsvCell(s.id),
      escapeCsvCell(s.status.toUpperCase()),
      escapeCsvCell(s.textId),
      escapeCsvCell(s.textTitle),
      escapeCsvCell(s.chapterTitle || s.chapterId || ""),
      escapeCsvCell(s.verseNumber),
      escapeCsvCell(s.verseId),
      escapeCsvCell(PROOFREAD_FIELD_LABELS[s.field] || s.field),
      escapeCsvCell(s.originalText),
      escapeCsvCell(s.proposedText),
      escapeCsvCell(s.reason),
      escapeCsvCell(s.submitterName),
      escapeCsvCell(s.submitterEmail),
      escapeCsvCell(s.reviewerNote || ""),
      escapeCsvCell(formatTimestampForCsv(s.createdAt)),
      escapeCsvCell(formatTimestampForCsv(s.updatedAt)),
    ].join(",")
  );

  // Prefix UTF-8 BOM for proper Indic Unicode rendering in spreadsheet importers
  return "\uFEFF" + [headers.map(escapeCsvCell).join(","), ...rows].join("\r\n");
}

export function buildUsersCsv(
  users: Array<{
    uid: string;
    displayName: string;
    email: string;
    role: string;
    occupation?: string;
    interestedInVolunteering?: boolean;
    institutionName?: string;
    phoneNumber?: string;
    profileCompleted?: boolean;
    createdAt?: any;
  }>
): string {
  const headers = [
    "User ID",
    "Name",
    "Email",
    "Role",
    "Occupation",
    "Interested in Volunteering",
    "Institution Name",
    "Contact Number",
    "Registration Completed",
    "Registered At (ISO)",
  ];

  const rows = users.map((u) =>
    [
      escapeCsvCell(u.uid),
      escapeCsvCell(u.displayName),
      escapeCsvCell(u.email),
      escapeCsvCell(u.role),
      escapeCsvCell(u.occupation || ""),
      escapeCsvCell(
        u.interestedInVolunteering === true
          ? "Yes"
          : u.interestedInVolunteering === false
          ? "No"
          : ""
      ),
      escapeCsvCell(u.institutionName || ""),
      escapeCsvCell(u.phoneNumber || ""),
      escapeCsvCell(u.profileCompleted ? "Yes" : "Pending"),
      escapeCsvCell(formatTimestampForCsv(u.createdAt)),
    ].join(",")
  );

  return "\uFEFF" + [headers.map(escapeCsvCell).join(","), ...rows].join("\r\n");
}

/**
 * Creates or updates a native Google Spreadsheet in the user's Google Drive
 * using the `drive.file` scope (converting UTF-8 CSV -> Google Sheet).
 */
export async function syncProofreadSheetToDrive(options: {
  accessToken: string;
  submissions: ProofreadSubmissionRecord[];
  existingFileId?: string;
  fileName?: string;
}): Promise<DriveSyncResult> {
  const {
    accessToken,
    submissions,
    existingFileId,
    fileName = "VedantaTattvam Proofreading List",
  } = options;

  const csvContent = buildProofreadCsv(submissions);
  const boundary = `vedanta_drive_sync_${Date.now()}`;

  const metadata: Record<string, string> = existingFileId
    ? { name: fileName }
    : {
        name: fileName,
        mimeType: "application/vnd.google-apps.spreadsheet",
        description:
          "Live proofreading submission registry & moderation list for VedantaTattvam.",
      };

  const multipartBody = [
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify(metadata),
    `--${boundary}`,
    "Content-Type: text/csv; charset=UTF-8",
    "",
    csvContent,
    `--${boundary}--`,
  ].join("\r\n");

  const uploadUrl = existingFileId
    ? `https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(existingFileId)}?uploadType=multipart&fields=id,name,webViewLink`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink";

  const response = await fetch(uploadUrl, {
    method: existingFileId ? "PATCH" : "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    const err = new Error(
      response.status === 401 || response.status === 403
        ? "DRIVE_AUTH_EXPIRED"
        : `Google Drive sync failed (${response.status}): ${errorText}`
    );
    throw err;
  }

  const data = await response.json();
  const spreadsheetFileId: string = data.id;
  const spreadsheetUrl: string =
    data.webViewLink || `https://docs.google.com/spreadsheets/d/${spreadsheetFileId}/edit`;

  return {
    spreadsheetFileId,
    spreadsheetUrl,
    fileName: data.name || fileName,
    syncedCount: submissions.length,
  };
}

/**
 * Creates or updates a native Google Spreadsheet in Google Drive listing
 * every Grantha in the repository along with commentary, translation, and
 * proofreading update details.
 */
export async function syncCatalogSheetToDrive(options: {
  accessToken: string;
  csvContent: string;
  rowCount: number;
  existingFileId?: string;
  fileName?: string;
}): Promise<DriveSyncResult> {
  const {
    accessToken,
    csvContent,
    rowCount,
    existingFileId,
    fileName = "VedantaTattvam Sacred Text & Commentary Catalog",
  } = options;

  const boundary = `vedanta_catalog_sync_${Date.now()}`;

  const metadata: Record<string, string> = existingFileId
    ? { name: fileName }
    : {
        name: fileName,
        mimeType: "application/vnd.google-apps.spreadsheet",
        description:
          "Live inventory of all texts, translations, commentaries, tikas, and proofread updates in VedantaTattvam.",
      };

  const multipartBody = [
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify(metadata),
    `--${boundary}`,
    "Content-Type: text/csv; charset=UTF-8",
    "",
    csvContent,
    `--${boundary}--`,
  ].join("\r\n");

  const uploadUrl = existingFileId
    ? `https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(existingFileId)}?uploadType=multipart&fields=id,name,webViewLink`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink";

  const response = await fetch(uploadUrl, {
    method: existingFileId ? "PATCH" : "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    const err = new Error(
      response.status === 401 || response.status === 403
        ? "DRIVE_AUTH_EXPIRED"
        : `Google Drive catalog sync failed (${response.status}): ${errorText}`
    );
    throw err;
  }

  const data = await response.json();
  const spreadsheetFileId: string = data.id;
  const spreadsheetUrl: string =
    data.webViewLink || `https://docs.google.com/spreadsheets/d/${spreadsheetFileId}/edit`;

  return {
    spreadsheetFileId,
    spreadsheetUrl,
    fileName: data.name || fileName,
    syncedCount: rowCount,
  };
}

/**
 * Exports a linked Google Sheet from Google Drive directly as a .xlsx Excel workbook.
 */
export async function downloadGoogleSheetAsXlsx(options: {
  accessToken: string;
  fileId: string;
  fileName?: string;
}): Promise<void> {
  const {
    accessToken,
    fileId,
    fileName = "VedantaTattvam_Text_Catalog.xlsx",
  } = options;

  const exportMime =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}/export?mimeType=${encodeURIComponent(exportMime)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(
      response.status === 401 || response.status === 403
        ? "DRIVE_AUTH_EXPIRED"
        : `Excel (.xlsx) export failed (${response.status}): ${errorText}`
    );
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
}

