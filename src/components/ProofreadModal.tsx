import React, { useState, useEffect } from "react";
import { useAuthProofread } from "../context/AuthProofreadContext";
import {
  PROOFREAD_FIELD_LABELS,
  ProofreadField,
} from "../utils/driveSync";
import GoogleSignInButton from "./GoogleSignInButton";
import {
  X,
  FileEdit,
  CheckCircle2,
  AlertCircle,
  Loader2,
  History,
  Sparkles,
} from "lucide-react";

interface ProofreadModalProps {
  onViewHistory?: () => void;
}

const ALL_FIELDS: ProofreadField[] = [
  "mulaSanskrit",
  "mulaIast",
  "padaccheda",
  "anvaya",
  "englishTranslation",
  "bhashyaExtract",
  "commentaryNotes",
];

export default function ProofreadModal({ onViewHistory }: ProofreadModalProps) {
  const {
    user,
    isSigningIn,
    signInWithGoogle,
    proofreadModalTarget,
    closeProofreadModal,
    getApprovedCorrection,
    submitProofread,
  } = useAuthProofread();

  const [selectedField, setSelectedField] =
    useState<ProofreadField>("mulaSanskrit");
  const [proposedText, setProposedText] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Sync field & original snapshot whenever target or selected field changes
  useEffect(() => {
    if (!proofreadModalTarget) return;
    const initField = proofreadModalTarget.initialField || "mulaSanskrit";
    setSelectedField(initField);
    setReason("");
    setSubmitError(null);
    setSubmittedId(null);
  }, [proofreadModalTarget]);

  const currentDisplayedValue = React.useMemo(() => {
    if (!proofreadModalTarget) return "";
    const approved = getApprovedCorrection(
      proofreadModalTarget.textId,
      proofreadModalTarget.verseId,
      selectedField
    );
    if (approved) return approved.correctedText;
    return proofreadModalTarget.verseSnapshot[selectedField] || "";
  }, [proofreadModalTarget, selectedField, getApprovedCorrection]);

  useEffect(() => {
    setProposedText(currentDisplayedValue);
  }, [currentDisplayedValue]);

  if (!proofreadModalTarget) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedProposed = proposedText.trim();
    const trimmedReason = reason.trim();

    if (!trimmedProposed) {
      setSubmitError("Proposed correction text cannot be empty.");
      return;
    }
    if (trimmedProposed === currentDisplayedValue.trim()) {
      setSubmitError(
        "Your proposed text is identical to the current text. Please make the correction above before submitting."
      );
      return;
    }
    if (!trimmedReason) {
      setSubmitError(
        "Please provide a brief note explaining the correction or manuscript/edition reference."
      );
      return;
    }
    if (trimmedProposed.length > 12000) {
      setSubmitError("Proposed text exceeds the 12,000-character limit.");
      return;
    }
    if (trimmedReason.length > 2000) {
      setSubmitError("Note exceeds the 2,000-character limit.");
      return;
    }

    setIsSubmitting(true);
    try {
      const id = await submitProofread({
        textId: proofreadModalTarget.textId,
        textTitle: proofreadModalTarget.textTitle,
        chapterId: proofreadModalTarget.chapterId,
        chapterTitle: proofreadModalTarget.chapterTitle,
        verseId: proofreadModalTarget.verseId,
        verseNumber: proofreadModalTarget.verseNumber,
        field: selectedField,
        originalText: currentDisplayedValue,
        proposedText: trimmedProposed,
        reason: trimmedReason,
      });
      setSubmittedId(id);
    } catch (err: any) {
      setSubmitError(
        err?.message || "Could not submit proofreading suggestion. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#2D2319]/55 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={closeProofreadModal}
    >
      <div
        className="w-full max-w-2xl bg-[#FFFDF9] border-2 border-[#C59B27] rounded-2xl shadow-[0_25px_60px_rgba(90,60,15,0.4)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent */}
        <div className="h-1.5 bg-gradient-to-r from-[#aa771c] via-[#fcf6ba] to-[#aa771c]" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-[#bf953f]/30 bg-[#FAF5EC] flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#c59b27] text-[#120e0b] shadow-xs mt-0.5">
              <FileEdit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#2D2319] leading-tight">
                Suggest Proofreading Correction
              </h3>
              <p className="text-xs font-mono text-[#8c6011] mt-0.5">
                {proofreadModalTarget.textTitle}
                {proofreadModalTarget.chapterTitle
                  ? ` • ${proofreadModalTarget.chapterTitle}`
                  : ""}{" "}
                • Verse {proofreadModalTarget.verseNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeProofreadModal}
            className="p-1.5 rounded-lg text-[#8c6011] hover:bg-[#f2e4cb] transition cursor-pointer"
            aria-label="Close proofreading dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {!user ? (
            <div className="py-6 px-4 rounded-2xl bg-[#FAF5EC] border border-[#bf953f]/35 text-center space-y-4">
              <Sparkles className="w-8 h-8 text-[#8c6011] mx-auto" />
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="font-serif font-bold text-base text-[#2D2319]">
                  Sign in to Submit Proofreading Suggestions
                </h4>
                <p className="text-xs text-[#5c4731] font-serif leading-relaxed">
                  Sign in with Google so our curators can review your proposed correction, credit or follow up, and track its approval status in your personal history.
                </p>
              </div>
              <div className="flex justify-center pt-1">
                <GoogleSignInButton
                  onClick={() => void signInWithGoogle()}
                  disabled={isSigningIn}
                />
              </div>
            </div>
          ) : submittedId ? (
            <div className="py-6 px-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <div className="space-y-1.5 max-w-md mx-auto">
                <h4 className="font-serif font-bold text-base text-emerald-950">
                  Proofreading Suggestion Submitted
                </h4>
                <p className="text-xs text-emerald-900 font-serif leading-relaxed">
                  Thank you, <strong>{user.displayName || user.email}</strong>. Your correction for{" "}
                  <strong>{PROOFREAD_FIELD_LABELS[selectedField]}</strong> has been queued for curator review. Once approved, it will appear live on the sacred text.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {onViewHistory && (
                  <button
                    type="button"
                    onClick={() => {
                      closeProofreadModal();
                      onViewHistory();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-serif font-bold transition cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>View My History & Status</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeProofreadModal}
                  className="px-4 py-2 rounded-xl border border-[#bf953f]/50 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold transition cursor-pointer"
                >
                  Return to Reader
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Target Field Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider">
                  1. Which Section Needs Proofreading?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_FIELDS.map((fieldKey) => {
                    const hasContent = Boolean(
                      proofreadModalTarget.verseSnapshot[fieldKey] ||
                        getApprovedCorrection(
                          proofreadModalTarget.textId,
                          proofreadModalTarget.verseId,
                          fieldKey
                        )
                    );
                    const isSelected = selectedField === fieldKey;
                    return (
                      <button
                        key={fieldKey}
                        type="button"
                        onClick={() => setSelectedField(fieldKey)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-serif font-bold border transition cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-[#d4af37] to-[#c59b27] text-[#120e0b] border-[#aa771c] shadow-xs"
                            : hasContent
                            ? "bg-[#FAF5ED] hover:bg-[#FAF1E2] text-[#5c4731] border-[#bf953f]/35"
                            : "bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#8c6011]/70 border-dashed border-[#bf953f]/30"
                        }`}
                      >
                        {PROOFREAD_FIELD_LABELS[fieldKey]}
                        {!hasContent && " (+ Add)"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Text Read-Only Preview */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider">
                    2. Current Displayed Text
                  </span>
                  {getApprovedCorrection(
                    proofreadModalTarget.textId,
                    proofreadModalTarget.verseId,
                    selectedField
                  ) && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                      Includes Prior Approved Edit
                    </span>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-[#FAF5EC] border border-[#bf953f]/30 text-sm font-serif text-[#4a3928] whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {currentDisplayedValue || (
                    <span className="italic text-[#8c6011]/70">
                      (Currently empty — you may propose an addition)
                    </span>
                  )}
                </div>
              </div>

              {/* Proposed Text */}
              <div className="space-y-1">
                <label
                  htmlFor="proofread-proposed-input"
                  className="block text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider"
                >
                  3. Corrected / Proofread Text
                </label>
                <textarea
                  id="proofread-proposed-input"
                  rows={4}
                  value={proposedText}
                  onChange={(e) => setProposedText(e.target.value)}
                  placeholder="Enter the exact corrected Sanskrit, IAST, or translation text..."
                  className="w-full p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#bf953f]/50 focus:border-[#8c6011] focus:outline-none font-serif text-sm text-[#2D2319] leading-relaxed"
                />
                <div className="text-[10px] font-mono text-[#735d45] text-right">
                  {proposedText.length} / 12,000 characters
                </div>
              </div>

              {/* Reason / Source */}
              <div className="space-y-1">
                <label
                  htmlFor="proofread-reason-input"
                  className="block text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider"
                >
                  4. Correction Note / Manuscript or Edition Reference
                </label>
                <textarea
                  id="proofread-reason-input"
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Missing visarga in Nirnaya Sagar Press edition, or sandhi typo correction..."
                  className="w-full p-2.5 rounded-xl bg-[#FFFFFF] border border-[#bf953f]/45 focus:border-[#8c6011] focus:outline-none font-serif text-xs sm:text-sm text-[#2D2319]"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-serif flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#bf953f]/25">
                <span className="text-[11px] font-mono text-[#6e5842] truncate">
                  Submitting as {user.displayName || user.email}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={closeProofreadModal}
                    className="px-3.5 py-2 rounded-xl border border-[#bf953f]/40 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-3d-gold text-xs font-serif font-bold cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Submit Proofreading</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
