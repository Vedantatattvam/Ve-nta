import React, { useState, useMemo } from "react";
import { useAuthProofread } from "../context/AuthProofreadContext";
import {
  PROOFREAD_FIELD_LABELS,
  ProofreadSubmissionRecord,
  buildProofreadCsv,
  buildUsersCsv,
} from "../utils/driveSync";
import { buildCatalogInventoryCsv } from "../utils/catalogInventory";
import GoogleSignInButton from "./GoogleSignInButton";
import {
  History,
  CheckCircle2,
  XCircle,
  Clock,
  FileSpreadsheet,
  ExternalLink,
  LogOut,
  ShieldCheck,
  BookOpen,
  FileEdit,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Download,
  Search,
  UserCheck,
  Sparkles,
  Users,
  Briefcase,
  Building2,
  Phone,
  HeartHandshake,
  Pencil,
  Library,
  FileDown,
} from "lucide-react";

interface AccountProofreadHubProps {
  onOpenText: (textId: string, chapterId?: string, verseId?: string) => void;
}

function formatTs(ts: any): string {
  if (!ts) return "Just now";
  try {
    const date = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function AccountProofreadHub({
  onOpenText,
}: AccountProofreadHubProps) {
  const {
    user,
    authReady,
    userProfile,
    profileLoaded,
    isAdmin,
    hasDriveToken,
    isSigningIn,
    signInWithGoogle,
    signOutUser,
    openRegistrationModal,
    allUsers,
    mySubmissions,
    allSubmissions,
    readingHistory,
    approvedCorrections,
    driveSyncState,
    catalogDriveSyncState,
    catalogInventory,
    catalogNeedsDriveSync,
    reviewProofread,
    syncSubmissionsToDrive,
    syncCatalogToDrive,
    exportCatalogXlsx,
  } = useAuthProofread();

  const [activeSection, setActiveSection] = useState<
    "history" | "review" | "drive" | "members"
  >("history");
  const [historyFilter, setHistoryFilter] = useState<
    "all" | "submissions" | "reading"
  >("all");
  const [reviewStatusFilter, setReviewStatusFilter] = useState<
    "pending" | "approved" | "rejected" | "all"
  >("pending");
  const [reviewSearch, setReviewSearch] = useState("");
  const [memberFilter, setMemberFilter] = useState<"all" | "volunteers">("all");
  const [memberSearch, setMemberSearch] = useState("");
  const [catalogSearch, setCatalogSearch] = useState("");

  // Per-submission curator edits & notes
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>({});
  const [reviewerNotes, setReviewerNotes] = useState<Record<string, string>>(
    {}
  );
  const [processingSubId, setProcessingSubId] = useState<string | null>(null);
  const [actionBanner, setActionBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Google Drive sync & mandatory overwrite confirmation state
  const [isSyncingDrive, setIsSyncingDrive] = useState(false);
  const [confirmDriveOverwriteOpen, setConfirmDriveOverwriteOpen] =
    useState(false);
  const [isSyncingCatalogDrive, setIsSyncingCatalogDrive] = useState(false);
  const [isExportingXlsx, setIsExportingXlsx] = useState(false);
  const [confirmCatalogOverwriteOpen, setConfirmCatalogOverwriteOpen] =
    useState(false);

  const pendingQueueCount = useMemo(
    () => allSubmissions.filter((s) => s.status === "pending").length,
    [allSubmissions]
  );

  const filteredReviewSubmissions = useMemo(() => {
    let list = allSubmissions;
    if (reviewStatusFilter !== "all") {
      list = list.filter((s) => s.status === reviewStatusFilter);
    }
    if (reviewSearch.trim()) {
      const q = reviewSearch.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.textTitle.toLowerCase().includes(q) ||
          s.verseNumber.toLowerCase().includes(q) ||
          s.submitterName.toLowerCase().includes(q) ||
          s.submitterEmail.toLowerCase().includes(q) ||
          s.proposedText.toLowerCase().includes(q) ||
          s.originalText.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allSubmissions, reviewStatusFilter, reviewSearch]);

  const volunteerCount = useMemo(
    () => allUsers.filter((u) => u.interestedInVolunteering === true).length,
    [allUsers]
  );

  const filteredMembers = useMemo(() => {
    let list = allUsers;
    if (memberFilter === "volunteers") {
      list = list.filter((u) => u.interestedInVolunteering === true);
    }
    if (memberSearch.trim()) {
      const q = memberSearch.toLowerCase().trim();
      list = list.filter(
        (u) =>
          (u.displayName || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q) ||
          (u.occupation || "").toLowerCase().includes(q) ||
          (u.institutionName || "").toLowerCase().includes(q) ||
          (u.phoneNumber || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [allUsers, memberFilter, memberSearch]);

  const filteredCatalogRows = useMemo(() => {
    if (!catalogSearch.trim()) return catalogInventory.rows;
    const q = catalogSearch.toLowerCase().trim();
    return catalogInventory.rows.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.transliteratedTitle.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.school.toLowerCase().includes(q) ||
        r.textId.toLowerCase().includes(q) ||
        r.classicalBhashyaNames.some((n) => n.toLowerCase().includes(q))
    );
  }, [catalogInventory.rows, catalogSearch]);

  const handleModerate = async (
    sub: ProofreadSubmissionRecord,
    decision: "approved" | "rejected"
  ) => {
    setProcessingSubId(sub.id);
    setActionBanner(null);
    try {
      await reviewProofread({
        submission: sub,
        decision,
        finalText:
          editedTexts[sub.id] !== undefined
            ? editedTexts[sub.id]
            : sub.proposedText,
        reviewerNote: reviewerNotes[sub.id] || "",
      });
      setActionBanner({
        type: "success",
        text:
          decision === "approved"
            ? `Approved correction for ${sub.textTitle} (${sub.verseNumber}). The updated text is now live for all visitors.`
            : `Marked suggestion for ${sub.textTitle} (${sub.verseNumber}) as declined.`,
      });
    } catch (err: any) {
      setActionBanner({
        type: "error",
        text: err?.message || "Failed to update proofreading submission.",
      });
    } finally {
      setProcessingSubId(null);
    }
  };

  const executeDriveSync = async (overwriteExisting: boolean) => {
    setConfirmDriveOverwriteOpen(false);
    setIsSyncingDrive(true);
    setActionBanner(null);
    try {
      const res = await syncSubmissionsToDrive({ overwriteExisting });
      setActionBanner({
        type: "success",
        text: `Synced ${res.syncedCount} proofreading record(s) to Google Sheet "${res.fileName}" in your Google Drive.`,
      });
    } catch (err: any) {
      if (
        err?.message === "DRIVE_AUTH_REQUIRED" ||
        err?.message === "DRIVE_AUTH_EXPIRED"
      ) {
        setActionBanner({
          type: "error",
          text: "Your Google Drive authorization session has not started or expired. Click 'Authorize Google Drive' below to connect.",
        });
      } else {
        setActionBanner({
          type: "error",
          text: err?.message || "Could not sync to Google Drive.",
        });
      }
    } finally {
      setIsSyncingDrive(false);
    }
  };

  const handleDownloadCsvBackup = () => {
    const source = isAdmin ? allSubmissions : mySubmissions;
    const csv = buildProofreadCsv(source);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vedantatattvam_proofreading_list.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadUsersCsv = () => {
    const csv = buildUsersCsv(allUsers);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vedantatattvam_members_volunteers.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const executeCatalogDriveSync = async (overwriteExisting: boolean) => {
    setConfirmCatalogOverwriteOpen(false);
    setIsSyncingCatalogDrive(true);
    setActionBanner(null);
    try {
      const res = await syncCatalogToDrive({ overwriteExisting });
      setActionBanner({
        type: "success",
        text: `Synced ${res.syncedCount} text entries (with commentary, translation & proofread status) to "${res.fileName}" in your Google Drive.`,
      });
    } catch (err: any) {
      if (
        err?.message === "DRIVE_AUTH_REQUIRED" ||
        err?.message === "DRIVE_AUTH_EXPIRED"
      ) {
        setActionBanner({
          type: "error",
          text: "Your Google Drive authorization session has not started or expired. Click 'Authorize Google Drive' below to connect.",
        });
      } else {
        setActionBanner({
          type: "error",
          text: err?.message || "Could not sync text catalog to Google Drive.",
        });
      }
    } finally {
      setIsSyncingCatalogDrive(false);
    }
  };

  const handleDownloadCatalogCsv = () => {
    const csv = buildCatalogInventoryCsv(catalogInventory.rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vedantatattvam_text_commentary_catalog.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCatalogXlsx = async () => {
    setIsExportingXlsx(true);
    setActionBanner(null);
    try {
      await exportCatalogXlsx();
      setActionBanner({
        type: "success",
        text: "Downloaded Excel (.xlsx) workbook directly from your linked Google Drive sheet.",
      });
    } catch (err: any) {
      if (
        err?.message === "DRIVE_AUTH_REQUIRED" ||
        err?.message === "DRIVE_AUTH_EXPIRED"
      ) {
        setActionBanner({
          type: "error",
          text: "Please click 'Authorize Google Drive' first to export the .xlsx file from Drive.",
        });
      } else {
        setActionBanner({
          type: "error",
          text: err?.message || "Could not export .xlsx from Google Drive.",
        });
      }
    } finally {
      setIsExportingXlsx(false);
    }
  };

  if (!authReady) {
    return (
      <div className="card-3d-gold p-10 text-center space-y-3">
        <Loader2 className="w-7 h-7 animate-spin text-[#8c6011] mx-auto" />
        <p className="font-serif text-sm text-[#5c4731]">
          Checking scholarly account session...
        </p>
      </div>
    );
  }

  // Signed-Out Experience
  if (!user) {
    return (
      <div className="space-y-6">
        <div className="card-3d-gold p-6 sm:p-10 text-center space-y-5 max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFFDF5] to-[#FAF1E2] border-2 border-[#C59B27] flex items-center justify-center mx-auto shadow-md">
            <UserCheck className="w-8 h-8 text-[#8c6011]" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif font-black text-2xl text-[#2D2319]">
              Personal History & Proofreading Portal
            </h2>
            <p className="text-sm text-[#5c4731] font-serif leading-relaxed max-w-xl mx-auto">
              Sign in with your Google account to keep a personal cross-device history of the sacred scriptures you read, propose textual or translation proofreading edits, and monitor when curators publish your approved corrections live.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
            <div className="p-3.5 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30 space-y-1">
              <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#8c6011]">
                <History className="w-4 h-4" />
                <span>Your Reading History</span>
              </div>
              <p className="text-xs text-[#5c4731] font-serif">
                Automatically records texts, chapters, and verses you visit across sessions.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30 space-y-1">
              <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#8c6011]">
                <FileEdit className="w-4 h-4" />
                <span>Submit Proofreading</span>
              </div>
              <p className="text-xs text-[#5c4731] font-serif">
                Flag typos, sandhi splits, IAST diacritics, or translation refinements directly in any verse.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30 space-y-1">
              <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#8c6011]">
                <Sparkles className="w-4 h-4" />
                <span>Curated Live Updates</span>
              </div>
              <p className="text-xs text-[#5c4731] font-serif">
                Curators review every request; approved corrections immediately update the canonical display.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center gap-2">
            <GoogleSignInButton
              onClick={() => void signInWithGoogle()}
              disabled={isSigningIn}
            />
            {approvedCorrections.length > 0 && (
              <span className="text-[11px] font-mono text-[#735d45]">
                {approvedCorrections.length} community-proofread correction(s) currently live across the canon
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Account Identity Header Card */}
      <div className="card-3d-gold p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User avatar"}
              className="w-12 h-12 rounded-2xl border-2 border-[#C59B27] object-cover shadow-xs"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-[#FAF1E2] border-2 border-[#C59B27] flex items-center justify-center font-serif font-bold text-lg text-[#8c6011]">
              {(user.displayName || user.email || "U")[0].toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif font-black text-lg text-[#2D2319] truncate">
                {user.displayName || "Vedānta Reader"}
              </h2>
              {isAdmin ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-[#d4af37] to-[#c59b27] text-[#120e0b] text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Curator & Admin</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF1E2] border border-[#bf953f]/40 text-[#8c6011] text-[10px] font-mono font-bold">
                  Verified Contributor
                </span>
              )}
            </div>
            <div className="text-xs font-mono text-[#6e5842] truncate">
              {user.email}
            </div>
          </div>
        </div>

        {/* Summary Counters + Sign Out */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30 text-xs font-mono text-[#5c4731]">
            <strong className="text-[#8c6011]">{readingHistory.length}</strong>{" "}
            History Entries
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30 text-xs font-mono text-[#5c4731]">
            <strong className="text-[#8c6011]">{mySubmissions.length}</strong>{" "}
            My Edits
          </div>
          {isAdmin && (
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-xs font-mono text-amber-950">
              <strong>{pendingQueueCount}</strong> Pending Review
            </div>
          )}
          <button
            type="button"
            onClick={() => void signOutUser()}
            className="px-3 py-1.5 rounded-xl border border-[#bf953f]/40 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Registration Details Summary Card */}
      {profileLoaded && (
        <div
          className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            userProfile?.profileCompleted
              ? "bg-[#FFFDF9] border-[#bf953f]/35 shadow-2xs"
              : "bg-amber-50/80 border-amber-300 shadow-xs"
          }`}
        >
          {userProfile?.profileCompleted ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-serif text-[#4a3928]">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#8c6011]" />
                <span className="text-[#735d45]">Occupation:</span>
                <strong className="text-[#2D2319]">{userProfile.occupation}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#8c6011]" />
                <span className="text-[#735d45]">Institution:</span>
                <strong className="text-[#2D2319]">{userProfile.institutionName}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#8c6011]" />
                <span className="text-[#735d45]">Phone:</span>
                <strong className="font-mono text-[#2D2319]">{userProfile.phoneNumber}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#8c6011]" />
                <span className="text-[#735d45]">Volunteering:</span>
                <span
                  className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                    userProfile.interestedInVolunteering
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-[#FAF1E2] text-[#6e5842] border border-[#bf953f]/35"
                  }`}
                >
                  {userProfile.interestedInVolunteering ? "Yes" : "No"}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5">
              <div className="font-serif font-bold text-sm text-amber-950">
                Complete Your Scholar &amp; Volunteer Registration
              </div>
              <p className="text-xs font-serif text-amber-900">
                Please add your occupation, institution name, phone number, and whether you&apos;d like to volunteer with us.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={openRegistrationModal}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 self-start sm:self-center ${
              userProfile?.profileCompleted
                ? "border border-[#bf953f]/45 bg-[#FAF5EC] hover:bg-[#FAF1E2] text-[#735013]"
                : "btn-3d-gold"
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>
              {userProfile?.profileCompleted
                ? "Edit Registration Details"
                : "Complete Registration"}
            </span>
          </button>
        </div>
      )}

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveSection("history")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center gap-2 transition cursor-pointer border ${
            activeSection === "history"
              ? "bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#c59b27] text-[#120e0b] border-[#C59B27] shadow-sm"
              : "bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#5c4731] border-[#bf953f]/35"
          }`}
        >
          <History className="w-4 h-4" />
          <span>My History & Proofreading ({readingHistory.length + mySubmissions.length})</span>
        </button>

        {isAdmin && (
          <>
            <button
              type="button"
              onClick={() => setActiveSection("review")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center gap-2 transition cursor-pointer border ${
                activeSection === "review"
                  ? "bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#c59b27] text-[#120e0b] border-[#C59B27] shadow-sm"
                  : "bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#5c4731] border-[#bf953f]/35"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Curator Approval Queue</span>
              {pendingQueueCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-700 text-white text-[10px] font-mono">
                  {pendingQueueCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("drive")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center gap-2 transition cursor-pointer border ${
                activeSection === "drive"
                  ? "bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#c59b27] text-[#120e0b] border-[#C59B27] shadow-sm"
                  : "bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#5c4731] border-[#bf953f]/35"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Google Drive Sheet Sync</span>
              {catalogNeedsDriveSync && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-700 text-white text-[10px] font-mono">
                  Sync Due
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("members")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center gap-2 transition cursor-pointer border ${
                activeSection === "members"
                  ? "bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#c59b27] text-[#120e0b] border-[#C59B27] shadow-sm"
                  : "bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#5c4731] border-[#bf953f]/35"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Members &amp; Volunteers ({allUsers.length})</span>
            </button>
          </>
        )}
      </div>

      {/* Feedback Banner */}
      {actionBanner && (
        <div
          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-serif flex items-center justify-between gap-3 ${
            actionBanner.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-red-50 border-red-300 text-red-900"
          }`}
        >
          <span>{actionBanner.text}</span>
          <button
            type="button"
            onClick={() => setActionBanner(null)}
            className="text-xs font-mono underline shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* SECTION 1: MY HISTORY & MY PROOFREADING */}
      {activeSection === "history" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {(
                [
                  { id: "all", label: "Everything" },
                  {
                    id: "submissions",
                    label: `My Proofreading Edits (${mySubmissions.length})`,
                  },
                  {
                    id: "reading",
                    label: `Reading History (${readingHistory.length})`,
                  },
                ] as const
              ).map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setHistoryFilter(pill.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                    historyFilter === pill.id
                      ? "bg-[#8c6011] text-[#FFFDF8] border-[#8c6011]"
                      : "bg-[#FFFDF9] text-[#6e5842] border-[#bf953f]/35 hover:bg-[#FAF1E2]"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Personal Proofreading Submissions */}
            {(historyFilter === "all" || historyFilter === "submissions") && (
              <div
                className={`card-3d-gold p-4 sm:p-5 space-y-3 ${
                  historyFilter === "submissions" ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#bf953f]/25 pb-2.5">
                  <div className="flex items-center gap-2">
                    <FileEdit className="w-4 h-4 text-[#8c6011]" />
                    <h3 className="font-serif font-bold text-base text-[#2D2319]">
                      My Proofreading Suggestions
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#8c6011]">
                    {mySubmissions.length} submitted
                  </span>
                </div>

                {mySubmissions.length === 0 ? (
                  <div className="py-8 text-center text-xs font-serif text-[#6e5842] space-y-2">
                    <p>
                      You haven&apos;t submitted any proofreading suggestions yet. Open any text in Granthasāraṇī or the Simple Reader and click{" "}
                      <strong>Suggest Proofread</strong> on a verse.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                    {mySubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onOpenText(sub.textId, sub.chapterId, sub.verseId)
                            }
                            className="font-serif font-bold text-sm text-[#7A3E00] hover:underline text-left cursor-pointer"
                          >
                            {sub.textTitle} — Verse {sub.verseNumber}
                          </button>

                          {sub.status === "approved" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-mono font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approved & Live</span>
                            </span>
                          )}
                          {sub.status === "pending" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold">
                              <Clock className="w-3 h-3" />
                              <span>Pending Review</span>
                            </span>
                          )}
                          {sub.status === "rejected" && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-200 border border-stone-300 text-stone-800 text-[10px] font-mono font-bold">
                              <XCircle className="w-3 h-3" />
                              <span>Declined</span>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#735d45]">
                          <span>
                            {PROOFREAD_FIELD_LABELS[sub.field] || sub.field}
                          </span>
                          <span>•</span>
                          <span>{formatTs(sub.createdAt)}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#bf953f]/25">
                            <div className="text-[10px] font-mono text-[#8c6011] uppercase">
                              Original
                            </div>
                            <p className="font-serif text-[#5c4731] whitespace-pre-wrap line-clamp-4 mt-0.5">
                              {sub.originalText || "(empty)"}
                            </p>
                          </div>
                          <div className="p-2 rounded-lg bg-[#FFFDF5] border border-emerald-500/35">
                            <div className="text-[10px] font-mono text-emerald-800 uppercase">
                              Proposed
                            </div>
                            <p className="font-serif text-[#2D2319] whitespace-pre-wrap line-clamp-4 mt-0.5">
                              {sub.proposedText}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs font-serif text-[#5c4731] italic">
                          Note: {sub.reason}
                        </p>

                        {sub.reviewerNote && (
                          <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#bf953f]/30 text-xs font-serif text-[#7A3E00]">
                            <strong>Curator Note:</strong> {sub.reviewerNote}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Personal Cross-Session Reading History */}
            {(historyFilter === "all" || historyFilter === "reading") && (
              <div
                className={`card-3d-gold p-4 sm:p-5 space-y-3 ${
                  historyFilter === "reading" ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#bf953f]/25 pb-2.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#8c6011]" />
                    <h3 className="font-serif font-bold text-base text-[#2D2319]">
                      My Reading & Study History
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#8c6011]">
                    Synced across devices
                  </span>
                </div>

                {readingHistory.length === 0 ? (
                  <div className="py-8 text-center text-xs font-serif text-[#6e5842]">
                    As you open Granthas, chapters, and verses while signed in, your reading trail will automatically appear here so you can resume anytime.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
                    {readingHistory.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          onOpenText(item.textId, item.chapterId, item.verseId)
                        }
                        className="w-full text-left p-3 rounded-xl bg-[#FAF5EC] hover:bg-[#f4e8d4] border border-[#bf953f]/30 hover:border-[#C59B27] transition flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="min-w-0">
                          <div className="font-serif font-bold text-sm text-[#2D2319] group-hover:text-[#7A3E00] truncate">
                            {item.textTitle}
                            {item.verseNumber
                              ? ` • Verse ${item.verseNumber}`
                              : ""}
                          </div>
                          {item.chapterTitle && (
                            <div className="text-xs font-serif text-[#6e5842] truncate">
                              {item.chapterTitle}
                            </div>
                          )}
                          <div className="text-[10px] font-mono text-[#8c6011] mt-0.5 flex items-center gap-2">
                            <span>
                              {item.actionType === "proofread_submitted"
                                ? "Proofread Submitted"
                                : "Studied"}
                            </span>
                            <span>•</span>
                            <span>{formatTs(item.updatedAt || item.visitedAt)}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#8c6011] shrink-0 group-hover:translate-x-0.5 transition-transform">
                          Open →
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: CURATOR APPROVAL QUEUE (Admin Only) */}
      {activeSection === "review" && isAdmin && (
        <div className="card-3d-gold p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#bf953f]/25 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {(["pending", "approved", "rejected", "all"] as const).map(
                (statusKey) => (
                  <button
                    key={statusKey}
                    type="button"
                    onClick={() => setReviewStatusFilter(statusKey)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold capitalize border transition cursor-pointer ${
                      reviewStatusFilter === statusKey
                        ? "bg-[#8c6011] text-[#FFFDF8] border-[#8c6011]"
                        : "bg-[#FAF5EC] text-[#5c4731] border-[#bf953f]/35 hover:bg-[#FAF1E2]"
                    }`}
                  >
                    {statusKey} (
                    {statusKey === "all"
                      ? allSubmissions.length
                      : allSubmissions.filter((s) => s.status === statusKey)
                          .length}
                    )
                  </button>
                )
              )}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8c6011] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                placeholder="Filter text, verse, contributor..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#bf953f]/40 text-xs font-serif focus:outline-none focus:border-[#8c6011]"
              />
            </div>
          </div>

          {filteredReviewSubmissions.length === 0 ? (
            <div className="py-10 text-center text-sm font-serif text-[#6e5842]">
              No proofreading submissions match the selected filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviewSubmissions.map((sub) => {
                const editedVal =
                  editedTexts[sub.id] !== undefined
                    ? editedTexts[sub.id]
                    : sub.proposedText;
                const isBusy = processingSubId === sub.id;

                return (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#bf953f]/35 space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onOpenText(sub.textId, sub.chapterId, sub.verseId)
                            }
                            className="font-serif font-black text-base text-[#7A3E00] hover:underline cursor-pointer"
                          >
                            {sub.textTitle} — Verse {sub.verseNumber}
                          </button>
                          <span className="px-2 py-0.5 rounded bg-[#FFFDF9] border border-[#bf953f]/30 text-[11px] font-mono text-[#8c6011] font-bold">
                            {PROOFREAD_FIELD_LABELS[sub.field] || sub.field}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-[#6e5842] mt-0.5">
                          Submitted by <strong>{sub.submitterName}</strong> (
                          {sub.submitterEmail}) • {formatTs(sub.createdAt)}
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase ${
                          sub.status === "approved"
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : sub.status === "rejected"
                            ? "bg-stone-200 text-stone-800 border border-stone-300"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#bf953f]/30 space-y-1">
                        <div className="text-[10px] font-mono font-bold text-[#8c6011] uppercase">
                          Original Text
                        </div>
                        <p className="text-sm font-serif text-[#4a3928] whitespace-pre-wrap">
                          {sub.originalText || "(empty)"}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FFFFFF] border border-emerald-500/40 space-y-1">
                        <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase">
                          Proposed Text (Editable Before Approval)
                        </div>
                        <textarea
                          rows={3}
                          value={editedVal}
                          onChange={(e) =>
                            setEditedTexts((prev) => ({
                              ...prev,
                              [sub.id]: e.target.value,
                            }))
                          }
                          className="w-full p-2 rounded-lg bg-[#FFFDF8] border border-[#bf953f]/30 text-sm font-serif text-[#2D2319] focus:outline-none focus:border-[#8c6011]"
                        />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#bf953f]/25 text-xs font-serif text-[#5c4731]">
                      <strong className="text-[#8c6011]">
                        Proofreader Reason:
                      </strong>{" "}
                      {sub.reason}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={
                          reviewerNotes[sub.id] !== undefined
                            ? reviewerNotes[sub.id]
                            : sub.reviewerNote || ""
                        }
                        onChange={(e) =>
                          setReviewerNotes((prev) => ({
                            ...prev,
                            [sub.id]: e.target.value,
                          }))
                        }
                        placeholder="Optional curator note (visible to contributor)..."
                        className="flex-1 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#bf953f]/35 text-xs font-serif focus:outline-none focus:border-[#8c6011]"
                      />

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => void handleModerate(sub, "rejected")}
                          className="px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => void handleModerate(sub, "approved")}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs disabled:opacity-50"
                        >
                          {isBusy ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          <span>Approve & Publish Live</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: GOOGLE DRIVE SPREADSHEET SYNC (Admin Only) */}
      {activeSection === "drive" && isAdmin && (
        <div className="space-y-6">
          {/* REGISTRY 1: SACRED TEXT, COMMENTARY & TRANSLATION CATALOG */}
          <div className="card-3d-gold p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#bf953f]/25 pb-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-[#8c6011]">
                  <Library className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif font-black text-lg text-[#2D2319]">
                      Sacred Text, Commentary &amp; Translation Catalog (Drive Excel / Sheet)
                    </h3>
                    {catalogNeedsDriveSync ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-mono font-bold">
                        Updates Ready to Sync
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-mono font-bold">
                        Up to Date in Drive
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-serif text-[#5c4731] mt-0.5">
                    Dynamically tracks all <strong>{catalogInventory.summary.totalTexts}</strong> texts ({catalogInventory.summary.totalChapters} chapters, {catalogInventory.summary.totalVerses} verses/units) in the repository—listing Mūla Sanskrit, IAST, Padaccheda, Anvaya, English Translation, Classical Bhāṣyas, Ṭīkās, and live community proofread updates.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                {catalogDriveSyncState && hasDriveToken && (
                  <button
                    type="button"
                    disabled={isExportingXlsx}
                    onClick={() => void handleExportCatalogXlsx()}
                    className="px-3 py-1.5 rounded-xl border border-emerald-600/40 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
                  >
                    {isExportingXlsx ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileDown className="w-3.5 h-3.5" />
                    )}
                    <span>Download .xlsx (Excel)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDownloadCatalogCsv}
                  className="px-3 py-1.5 rounded-xl border border-[#bf953f]/40 bg-[#FAF5EC] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel CSV</span>
                </button>
              </div>
            </div>

            {/* Summary KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div className="p-3 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30">
                <div className="text-[10px] font-mono text-[#8c6011] uppercase">
                  Total Texts
                </div>
                <div className="font-serif font-black text-lg text-[#2D2319]">
                  {catalogInventory.summary.totalTexts}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30">
                <div className="text-[10px] font-mono text-[#8c6011] uppercase">
                  Chapters / Units
                </div>
                <div className="font-serif font-black text-lg text-[#2D2319]">
                  {catalogInventory.summary.totalChapters} / {catalogInventory.summary.totalVerses}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30">
                <div className="text-[10px] font-mono text-[#8c6011] uppercase">
                  With Translation
                </div>
                <div className="font-serif font-black text-lg text-emerald-800">
                  {catalogInventory.summary.textsWithTranslation} / {catalogInventory.summary.totalTexts}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30">
                <div className="text-[10px] font-mono text-[#8c6011] uppercase">
                  With Commentary
                </div>
                <div className="font-serif font-black text-lg text-emerald-800">
                  {catalogInventory.summary.textsWithCommentary} / {catalogInventory.summary.totalTexts}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30">
                <div className="text-[10px] font-mono text-[#8c6011] uppercase">
                  Live Proofreads
                </div>
                <div className="font-serif font-black text-lg text-[#7A3E00]">
                  {catalogInventory.summary.totalProofreadUpdates}
                </div>
              </div>
            </div>

            {/* Linked Catalog Sheet Status */}
            {catalogDriveSyncState ? (
              <div
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  catalogNeedsDriveSync
                    ? "bg-amber-50/75 border-amber-300"
                    : "bg-[#FAF5EC] border-[#bf953f]/35"
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-800 uppercase">
                    Connected Catalog Sheet in Google Drive
                  </div>
                  <div className="font-serif font-bold text-base text-[#2D2319]">
                    {catalogDriveSyncState.fileName}
                  </div>
                  <div className="text-xs font-mono text-[#6e5842]">
                    Last synced {formatTs(catalogDriveSyncState.updatedAt)} •{" "}
                    {catalogDriveSyncState.syncedCount} text entries
                    {catalogNeedsDriveSync
                      ? " • New text, commentary, or translation updates detected since last sync!"
                      : ""}
                  </div>
                </div>
                <a
                  href={catalogDriveSyncState.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#FFFFFF] border-2 border-[#C59B27] text-[#7A3E00] text-xs font-serif font-bold shadow-xs transition self-start sm:self-center"
                >
                  <span>Open Catalog in Google Sheets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-dashed border-[#bf953f]/45 text-xs font-serif text-[#5c4731]">
                No Sacred Text Catalog sheet has been created in your Google Drive yet. Authorize Google Drive below to create it—and every future text, commentary, or translation added here will be automatically flagged for updating your Drive sheet.
              </div>
            )}

            {/* Catalog Drive Sync Controls */}
            {!hasDriveToken ? (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-serif font-bold text-sm text-amber-950">
                    Authorize Google Drive to Create or Update Sheets
                  </div>
                  <p className="text-xs font-serif text-amber-900">
                    Google Drive permissions stay strictly in memory for this session. Sign in once to create, update, or download `.xlsx` workbooks directly from your Drive.
                  </p>
                </div>
                <div className="shrink-0">
                  <GoogleSignInButton
                    onClick={() => void signInWithGoogle()}
                    disabled={isSigningIn}
                    label="Authorize Google Drive"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                {catalogDriveSyncState ? (
                  <button
                    type="button"
                    disabled={isSyncingCatalogDrive}
                    onClick={() => setConfirmCatalogOverwriteOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-3d-gold text-xs sm:text-sm font-serif font-bold cursor-pointer disabled:opacity-60"
                  >
                    {isSyncingCatalogDrive ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    <span>
                      Update Linked Catalog Sheet in Drive ({catalogInventory.rows.length} texts)
                    </span>
                  </button>
                ) : null}

                <button
                  type="button"
                  disabled={isSyncingCatalogDrive}
                  onClick={() => void executeCatalogDriveSync(false)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-bold cursor-pointer transition disabled:opacity-60 ${
                    catalogDriveSyncState
                      ? "border border-[#bf953f]/50 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013]"
                      : "btn-3d-gold"
                  }`}
                >
                  {isSyncingCatalogDrive ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="w-4 h-4" />
                  )}
                  <span>
                    {catalogDriveSyncState
                      ? "Create New Catalog Copy in Drive"
                      : `Create Text Catalog Sheet in Drive (${catalogInventory.rows.length} texts)`}
                  </span>
                </button>
              </div>
            )}

            {/* Live Preview Table of Every Text & Its Commentary/Translation Status */}
            <div className="space-y-3 pt-2 border-t border-[#bf953f]/25">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider">
                  Live Catalog Preview ({filteredCatalogRows.length} of {catalogInventory.rows.length} texts)
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#8c6011] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Filter texts, authors, commentaries..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#bf953f]/40 text-xs font-serif focus:outline-none focus:border-[#8c6011]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#bf953f]/30 bg-[#FFFDF9] max-h-96 overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#FAF1E2] sticky top-0 z-10 border-b border-[#bf953f]/35 font-mono text-[10px] text-[#7A3E00] uppercase">
                    <tr>
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Text / Grantha</th>
                      <th className="p-2.5">Units</th>
                      <th className="p-2.5">Sanskrit &amp; IAST</th>
                      <th className="p-2.5">Translation</th>
                      <th className="p-2.5">Commentaries / Bhāṣyas</th>
                      <th className="p-2.5">Proofreads</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#bf953f]/20 font-serif">
                    {filteredCatalogRows.map((row) => (
                      <tr key={row.textId} className="hover:bg-[#FAF5EC]/70">
                        <td className="p-2.5 font-mono text-[#8c6011]">
                          {row.order}
                        </td>
                        <td className="p-2.5 min-w-[200px]">
                          <button
                            type="button"
                            onClick={() => onOpenText(row.textId)}
                            className="font-bold text-[#7A3E00] hover:underline text-left cursor-pointer"
                          >
                            {row.title}
                          </button>
                          <div className="text-[11px] text-[#6e5842]">
                            {row.author} • {row.school}
                          </div>
                        </td>
                        <td className="p-2.5 font-mono text-[11px] whitespace-nowrap">
                          {row.chapterCount} ch • {row.verseCount} v
                        </td>
                        <td className="p-2.5 text-[11px]">
                          <div>Mūla: {row.mulaSanskritStatus}</div>
                          <div className="text-[#6e5842]">IAST: {row.iastStatus}</div>
                        </td>
                        <td className="p-2.5 text-[11px]">
                          <span
                            className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                              row.hasTranslation
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : "bg-stone-100 text-stone-700 border border-stone-300"
                            }`}
                          >
                            {row.englishTranslationStatus}
                          </span>
                        </td>
                        <td className="p-2.5 text-[11px] max-w-[260px]">
                          <div className="font-mono text-[10px] font-bold text-[#2D2319]">
                            {row.classicalBhashyaCount > 0
                              ? `${row.classicalBhashyaCount} Bhāṣyas`
                              : "Extract: " + row.bhashyaExtractStatus}
                            {row.tikaCount > 0 ? ` • ${row.tikaCount} Ṭīkās` : ""}
                          </div>
                          {row.classicalBhashyaNames.length > 0 && (
                            <div className="text-[10px] text-[#6e5842] line-clamp-2">
                              {row.classicalBhashyaNames.join(", ")}
                            </div>
                          )}
                        </td>
                        <td className="p-2.5 font-mono text-[11px]">
                          {row.approvedProofreadCount > 0 ? (
                            <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-950 font-bold text-[10px]">
                              {row.approvedProofreadCount} live
                            </span>
                          ) : (
                            <span className="text-[#8c6011]/70">0</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* REGISTRY 2: PROOFREADING SUBMISSIONS REGISTRY */}
          <div className="card-3d-gold p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#bf953f]/25 pb-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-[#2D2319]">
                    Google Drive Proofreading Registry
                  </h3>
                  <p className="text-xs font-serif text-[#5c4731] mt-0.5">
                    Maintain an up-to-date Google Sheet in your Google Drive containing all {allSubmissions.length} proofreading submissions (pending, approved, and declined).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadCsvBackup}
                className="px-3 py-1.5 rounded-xl border border-[#bf953f]/40 bg-[#FAF5EC] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-center"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download UTF-8 CSV</span>
              </button>
            </div>

            {/* Linked Sheet Status */}
            {driveSyncState ? (
              <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#bf953f]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-800 uppercase">
                    Connected Google Sheet
                  </div>
                  <div className="font-serif font-bold text-base text-[#2D2319]">
                    {driveSyncState.fileName}
                  </div>
                  <div className="text-xs font-mono text-[#6e5842]">
                    Last synced {formatTs(driveSyncState.updatedAt)} •{" "}
                    {driveSyncState.syncedCount} rows
                  </div>
                </div>
                <a
                  href={driveSyncState.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#FFFFFF] border-2 border-[#C59B27] text-[#7A3E00] text-xs font-serif font-bold shadow-xs transition self-start sm:self-center"
                >
                  <span>Open in Google Sheets</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-dashed border-[#bf953f]/45 text-xs font-serif text-[#5c4731]">
                No proofreading Google Drive spreadsheet has been created yet.
              </div>
            )}

            {/* Drive Token Connection & Sync Controls */}
            {hasDriveToken && (
              <div className="flex flex-wrap items-center gap-3">
                {driveSyncState ? (
                  <button
                    type="button"
                    disabled={isSyncingDrive}
                    onClick={() => setConfirmDriveOverwriteOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-3d-gold text-xs sm:text-sm font-serif font-bold cursor-pointer disabled:opacity-60"
                  >
                    {isSyncingDrive ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    <span>Update Linked Google Drive Sheet ({allSubmissions.length} rows)</span>
                  </button>
                ) : null}

                <button
                  type="button"
                  disabled={isSyncingDrive}
                  onClick={() => void executeDriveSync(false)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-bold cursor-pointer transition disabled:opacity-60 ${
                    driveSyncState
                      ? "border border-[#bf953f]/50 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013]"
                      : "btn-3d-gold"
                  }`}
                >
                  {isSyncingDrive ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="w-4 h-4" />
                  )}
                  <span>
                    {driveSyncState
                      ? "Create New Sheet Copy in Drive"
                      : `Create Proofreading Sheet in Drive (${allSubmissions.length} rows)`}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 4: REGISTERED MEMBERS & VOLUNTEERS DIRECTORY (Admin Only) */}
      {activeSection === "members" && isAdmin && (
        <div className="card-3d-gold p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#bf953f]/25 pb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMemberFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                  memberFilter === "all"
                    ? "bg-[#8c6011] text-[#FFFDF8] border-[#8c6011]"
                    : "bg-[#FAF5EC] text-[#5c4731] border-[#bf953f]/35 hover:bg-[#FAF1E2]"
                }`}
              >
                All Members ({allUsers.length})
              </button>
              <button
                type="button"
                onClick={() => setMemberFilter("volunteers")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                  memberFilter === "volunteers"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-[#FAF5EC] text-[#5c4731] border-[#bf953f]/35 hover:bg-[#FAF1E2]"
                }`}
              >
                Volunteers Only ({volunteerCount})
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#8c6011] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Search name, occupation, institution..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#bf953f]/40 text-xs font-serif focus:outline-none focus:border-[#8c6011]"
                />
              </div>

              <button
                type="button"
                onClick={handleDownloadUsersCsv}
                className="px-3 py-1.5 rounded-xl border border-[#bf953f]/40 bg-[#FAF5EC] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="py-10 text-center text-sm font-serif text-[#6e5842]">
              No registered members match your current filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredMembers.map((member) => (
                <div
                  key={member.uid}
                  className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#bf953f]/35 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-serif font-black text-sm text-[#2D2319] truncate">
                        {member.displayName}
                      </div>
                      <div className="text-xs font-mono text-[#6e5842] truncate">
                        {member.email}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {member.interestedInVolunteering === true ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-mono font-bold">
                          Volunteer: Yes
                        </span>
                      ) : member.interestedInVolunteering === false ? (
                        <span className="px-2 py-0.5 rounded-md bg-stone-200 border border-stone-300 text-stone-800 text-[10px] font-mono font-bold">
                          Volunteer: No
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold">
                          Incomplete
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif pt-1 border-t border-[#bf953f]/20">
                    <div className="flex items-center gap-1.5 text-[#4a3928]">
                      <Briefcase className="w-3.5 h-3.5 text-[#8c6011] shrink-0" />
                      <span className="truncate">
                        {member.occupation || "Not provided"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#4a3928]">
                      <Phone className="w-3.5 h-3.5 text-[#8c6011] shrink-0" />
                      <span className="font-mono truncate">
                        {member.phoneNumber || "Not provided"}
                      </span>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-1.5 text-[#4a3928]">
                      <Building2 className="w-3.5 h-3.5 text-[#8c6011] shrink-0" />
                      <span className="truncate">
                        {member.institutionName || "Institution not provided"}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-[#8c6011]">
                    Signed up {formatTs(member.createdAt)} • Role: {member.role}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mandatory Explicit Confirmation Modal Before Updating Existing Drive Spreadsheet */}
      {confirmDriveOverwriteOpen && driveSyncState && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/55 backdrop-blur-xs"
          onClick={() => setConfirmDriveOverwriteOpen(false)}
        >
          <div
            className="max-w-md w-full bg-[#FFFDF9] border-2 border-[#C59B27] rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-[#2D2319]">
                  Update Existing Google Drive Spreadsheet?
                </h4>
                <p className="text-xs font-serif text-[#5c4731] leading-relaxed">
                  This will overwrite the contents of{" "}
                  <strong>&quot;{driveSyncState.fileName}&quot;</strong> in your Google Drive with the current list of{" "}
                  <strong>{allSubmissions.length}</strong> proofreading submission(s).
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#bf953f]/25">
              <button
                type="button"
                onClick={() => setConfirmDriveOverwriteOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-[#bf953f]/40 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void executeDriveSync(true)}
                className="px-4 py-2 rounded-xl btn-3d-gold text-xs font-serif font-bold cursor-pointer"
              >
                Confirm &amp; Update Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Explicit Confirmation Modal Before Updating Existing Catalog Drive Spreadsheet */}
      {confirmCatalogOverwriteOpen && catalogDriveSyncState && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2319]/55 backdrop-blur-xs"
          onClick={() => setConfirmCatalogOverwriteOpen(false)}
        >
          <div
            className="max-w-md w-full bg-[#FFFDF9] border-2 border-[#C59B27] rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-[#2D2319]">
                  Update Catalog Sheet in Google Drive?
                </h4>
                <p className="text-xs font-serif text-[#5c4731] leading-relaxed">
                  This will overwrite the contents of{" "}
                  <strong>&quot;{catalogDriveSyncState.fileName}&quot;</strong> in your Google Drive with the latest catalog of{" "}
                  <strong>{catalogInventory.rows.length}</strong> texts ({catalogInventory.summary.totalChapters} chapters, {catalogInventory.summary.totalVerses} verses, commentary/translation statuses, and {catalogInventory.summary.totalProofreadUpdates} live proofread updates).
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#bf953f]/25">
              <button
                type="button"
                onClick={() => setConfirmCatalogOverwriteOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-[#bf953f]/40 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void executeCatalogDriveSync(true)}
                className="px-4 py-2 rounded-xl btn-3d-gold text-xs font-serif font-bold cursor-pointer"
              >
                Confirm &amp; Update Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
