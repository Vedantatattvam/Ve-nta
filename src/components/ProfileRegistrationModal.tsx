import React, { useState, useEffect } from "react";
import { useAuthProofread } from "../context/AuthProofreadContext";
import {
  X,
  UserCheck,
  Briefcase,
  Building2,
  Phone,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
} from "lucide-react";

const OCCUPATION_SUGGESTIONS = [
  "Student",
  "Research Scholar",
  "Professor / Ācārya",
  "Engineer / Tech",
  "Independent Seeker",
];

export default function ProfileRegistrationModal() {
  const {
    user,
    userProfile,
    isRegistrationModalOpen,
    closeRegistrationModal,
    saveUserRegistration,
  } = useAuthProofread();

  const [occupation, setOccupation] = useState("");
  const [interestedInVolunteering, setInterestedInVolunteering] = useState<
    boolean | null
  >(null);
  const [institutionName, setInstitutionName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isRegistrationModalOpen) return;
    setOccupation(userProfile?.occupation || "");
    setInterestedInVolunteering(
      typeof userProfile?.interestedInVolunteering === "boolean"
        ? userProfile.interestedInVolunteering
        : null
    );
    setInstitutionName(userProfile?.institutionName || "");
    setPhoneNumber(userProfile?.phoneNumber || "");
    setErrorMsg(null);
  }, [isRegistrationModalOpen, userProfile]);

  if (!isRegistrationModalOpen || !user) return null;

  const isEditingExisting = Boolean(userProfile?.profileCompleted);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedOccupation = occupation.trim();
    const trimmedInstitution = institutionName.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedOccupation) {
      setErrorMsg("Please enter your occupation.");
      return;
    }
    if (trimmedOccupation.length > 160) {
      setErrorMsg("Occupation must be 160 characters or fewer.");
      return;
    }
    if (interestedInVolunteering === null) {
      setErrorMsg(
        "Please select whether you are interested in volunteering with us."
      );
      return;
    }
    if (!trimmedInstitution) {
      setErrorMsg("Please enter your institution or organization name.");
      return;
    }
    if (trimmedInstitution.length > 200) {
      setErrorMsg("Institution name must be 200 characters or fewer.");
      return;
    }
    if (!trimmedPhone) {
      setErrorMsg("Please enter your contact / phone number.");
      return;
    }
    if (trimmedPhone.length > 40) {
      setErrorMsg("Phone number must be 40 characters or fewer.");
      return;
    }

    setIsSaving(true);
    try {
      await saveUserRegistration({
        occupation: trimmedOccupation,
        interestedInVolunteering,
        institutionName: trimmedInstitution,
        phoneNumber: trimmedPhone,
      });
    } catch (err: any) {
      setErrorMsg(
        err?.message || "Could not save registration details. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#2D2319]/55 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={closeRegistrationModal}
    >
      <div
        className="w-full max-w-xl bg-[#FFFDF9] border-2 border-[#C59B27] rounded-2xl shadow-[0_25px_60px_rgba(90,60,15,0.4)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-gradient-to-r from-[#aa771c] via-[#fcf6ba] to-[#aa771c]" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-[#bf953f]/30 bg-[#FAF5EC] flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#c59b27] text-[#120e0b] shadow-xs mt-0.5">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#2D2319] leading-tight">
                {isEditingExisting
                  ? "Update Scholar & Volunteer Registration"
                  : "Complete Your Scholar Registration"}
              </h3>
              <p className="text-xs font-mono text-[#8c6011] mt-0.5">
                {user.displayName || "Reader"} • {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeRegistrationModal}
            className="p-1.5 rounded-lg text-[#8c6011] hover:bg-[#f2e4cb] transition cursor-pointer"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <p className="text-xs font-serif text-[#5c4731] leading-relaxed bg-[#FAF5EC] border border-[#bf953f]/30 rounded-xl p-3">
            Welcome to <strong>VedāntaTattvam</strong>. Please share your academic or professional background and let us know if you would like to volunteer in scriptural preservation and proofreading.
          </p>

          {/* 1. Occupation */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-occupation-input"
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>1. Occupation</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {OCCUPATION_SUGGESTIONS.map((item) => {
                const isSelected = occupation.trim() === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOccupation(item)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-serif font-bold border transition cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#d4af37] to-[#c59b27] text-[#120e0b] border-[#aa771c] shadow-xs"
                        : "bg-[#FAF5ED] hover:bg-[#FAF1E2] text-[#5c4731] border-[#bf953f]/35"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <input
              id="reg-occupation-input"
              type="text"
              maxLength={160}
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g., Research Scholar, Ācārya, Software Engineer..."
              className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#bf953f]/45 focus:border-[#8c6011] focus:outline-none font-serif text-sm text-[#2D2319]"
            />
          </div>

          {/* 2. Interested in Volunteering */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>2. Interested in Volunteering with Us?</span>
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setInterestedInVolunteering(true)}
                className={`p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                  interestedInVolunteering === true
                    ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs"
                    : "bg-[#FAF5EC] hover:bg-[#FAF1E2] border-[#bf953f]/35 text-[#5c4731]"
                }`}
              >
                <div className="font-serif font-bold text-sm flex items-center justify-between">
                  <span>Yes, I&apos;d like to volunteer</span>
                  {interestedInVolunteering === true && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  )}
                </div>
                <div className="text-[11px] font-serif opacity-80 mt-0.5">
                  Proofreading, Sanskrit digitization, or translation review
                </div>
              </button>

              <button
                type="button"
                onClick={() => setInterestedInVolunteering(false)}
                className={`p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                  interestedInVolunteering === false
                    ? "bg-[#FAF1E2] border-[#8c6011] text-[#2D2319] shadow-xs"
                    : "bg-[#FAF5EC] hover:bg-[#FAF1E2] border-[#bf953f]/35 text-[#5c4731]"
                }`}
              >
                <div className="font-serif font-bold text-sm flex items-center justify-between">
                  <span>No, reader only for now</span>
                  {interestedInVolunteering === false && (
                    <CheckCircle2 className="w-4 h-4 text-[#8c6011] shrink-0" />
                  )}
                </div>
                <div className="text-[11px] font-serif opacity-80 mt-0.5">
                  Study scriptures &amp; track personal reading history
                </div>
              </button>
            </div>
          </div>

          {/* 3. Institution Name */}
          <div className="space-y-1">
            <label
              htmlFor="reg-institution-input"
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>3. Institution / Organization Name</span>
            </label>
            <input
              id="reg-institution-input"
              type="text"
              maxLength={200}
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder="University, Maṭha, Vidyāpīṭha, School, or Independent"
              className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#bf953f]/45 focus:border-[#8c6011] focus:outline-none font-serif text-sm text-[#2D2319]"
            />
          </div>

          {/* 4. Phone / Contact Number */}
          <div className="space-y-1">
            <label
              htmlFor="reg-phone-input"
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>4. Contact / Phone Number</span>
            </label>
            <input
              id="reg-phone-input"
              type="tel"
              maxLength={40}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 98XXXXXXXX"
              className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#bf953f]/45 focus:border-[#8c6011] focus:outline-none font-mono text-sm text-[#2D2319]"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-serif flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] font-serif text-[#6e5842]">
            <Shield className="w-3.5 h-3.5 text-[#8c6011] shrink-0" />
            <span>
              Your contact details are kept private and accessible only to you and VedāntaTattvam curators.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#bf953f]/25">
            <button
              type="button"
              onClick={closeRegistrationModal}
              className="px-3.5 py-2 rounded-xl border border-[#bf953f]/40 bg-[#FFFDF9] hover:bg-[#FAF1E2] text-[#735013] text-xs font-serif font-bold transition cursor-pointer"
            >
              {isEditingExisting ? "Cancel" : "Skip for now"}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-3d-gold text-xs font-serif font-bold cursor-pointer disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Registration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
