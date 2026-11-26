import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import {
  db,
  ADMIN_EMAIL,
  initAuthListener,
  googleSignIn,
  logout,
  getAccessToken,
  clearAccessToken,
  OperationType,
  handleFirestoreError,
} from "../firebase";
import {
  ProofreadField,
  ProofreadSubmissionRecord,
  DriveSyncResult,
  syncProofreadSheetToDrive,
  syncCatalogSheetToDrive,
  downloadGoogleSheetAsXlsx,
} from "../utils/driveSync";
import {
  CatalogInventoryResult,
  computeCatalogInventory,
  buildCatalogInventoryCsv,
} from "../utils/catalogInventory";
import { PRESEEDED_GRANTHAS } from "../data";
import { GranthaVerse } from "../types";

export interface ReadingHistoryItem {
  id: string;
  userId: string;
  textId: string;
  textTitle: string;
  chapterId?: string;
  chapterTitle?: string;
  verseId?: string;
  verseNumber?: string;
  actionType: "read" | "proofread_submitted";
  visitedAt?: any;
  updatedAt?: any;
}

export interface ApprovedCorrectionRecord {
  id: string;
  textId: string;
  chapterId?: string;
  verseId: string;
  field: ProofreadField;
  originalText: string;
  correctedText: string;
  submissionId: string;
  approvedByUid: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface DriveSyncStateRecord {
  id: string;
  spreadsheetFileId: string;
  spreadsheetUrl: string;
  fileName: string;
  syncedCount: number;
  lastSyncedByUid: string;
  catalogSignature?: string;
  updatedAt?: any;
}

export interface UserProfileRecord {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: "reader" | "admin";
  occupation?: string;
  interestedInVolunteering?: boolean;
  institutionName?: string;
  phoneNumber?: string;
  profileCompleted?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface ProofreadDraftTarget {
  textId: string;
  textTitle: string;
  chapterId?: string;
  chapterTitle?: string;
  verseId: string;
  verseNumber: string;
  initialField?: ProofreadField;
  verseSnapshot: Partial<Record<ProofreadField, string>>;
}

interface AuthProofreadContextValue {
  user: User | null;
  authReady: boolean;
  userProfile: UserProfileRecord | null;
  profileLoaded: boolean;
  isAdmin: boolean;
  hasDriveToken: boolean;
  isSigningIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  saveUserRegistration: (params: {
    occupation: string;
    interestedInVolunteering: boolean;
    institutionName: string;
    phoneNumber: string;
  }) => Promise<void>;
  isRegistrationModalOpen: boolean;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
  allUsers: UserProfileRecord[];
  approvedCorrections: ApprovedCorrectionRecord[];
  mySubmissions: ProofreadSubmissionRecord[];
  allSubmissions: ProofreadSubmissionRecord[];
  readingHistory: ReadingHistoryItem[];
  driveSyncState: DriveSyncStateRecord | null;
  catalogDriveSyncState: DriveSyncStateRecord | null;
  catalogInventory: CatalogInventoryResult;
  catalogNeedsDriveSync: boolean;
  pendingCount: number;
  getApprovedCorrection: (
    textId: string,
    verseId: string,
    field: ProofreadField
  ) => ApprovedCorrectionRecord | undefined;
  getVerseApprovedCorrections: (
    textId: string,
    verseId: string
  ) => ApprovedCorrectionRecord[];
  resolveVerseField: (
    textId: string,
    verse: GranthaVerse,
    field: ProofreadField
  ) => string;
  recordReadingVisit: (params: {
    textId: string;
    textTitle: string;
    chapterId?: string;
    chapterTitle?: string;
    verseId?: string;
    verseNumber?: string;
    actionType?: "read" | "proofread_submitted";
  }) => Promise<void>;
  submitProofread: (params: {
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
  }) => Promise<string>;
  reviewProofread: (params: {
    submission: ProofreadSubmissionRecord;
    decision: "approved" | "rejected";
    finalText?: string;
    reviewerNote?: string;
  }) => Promise<void>;
  syncSubmissionsToDrive: (options?: {
    overwriteExisting?: boolean;
  }) => Promise<DriveSyncResult>;
  syncCatalogToDrive: (options?: {
    overwriteExisting?: boolean;
  }) => Promise<DriveSyncResult>;
  exportCatalogXlsx: () => Promise<void>;
  proofreadModalTarget: ProofreadDraftTarget | null;
  openProofreadModal: (target: ProofreadDraftTarget) => void;
  closeProofreadModal: () => void;
  asyncError: string | null;
  clearAsyncError: () => void;
}

const AuthProofreadContext = createContext<
  AuthProofreadContextValue | undefined
>(undefined);

/**
 * Generates deterministic ID matching ^[a-zA-Z0-9_-]+$ and <= 128 chars
 */
export function sanitizeFirestoreId(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
  if (!cleaned) return "item";
  if (cleaned.length <= 120) return cleaned;
  // Deterministic short hash suffix to prevent truncation collisions
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash * 31 + raw.charCodeAt(i)) >>> 0;
  }
  return `${cleaned.slice(0, 108)}_${hash.toString(36)}`;
}

export function makeCorrectionId(
  textId: string,
  verseId: string,
  field: ProofreadField
): string {
  return sanitizeFirestoreId(`${textId}__${verseId}__${field}`);
}

function getTimestampMillis(ts: any): number {
  if (!ts) return 0;
  if (typeof ts.toMillis === "function") return ts.toMillis();
  if (ts instanceof Date) return ts.getTime();
  return 0;
}

export function AuthProofreadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [hasDriveToken, setHasDriveToken] = useState(false);
  const [isAdminFromDoc, setIsAdminFromDoc] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [profileReadyUid, setProfileReadyUid] = useState<string | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfileRecord | null>(
    null
  );
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [dismissedRegistrationPrompt, setDismissedRegistrationPrompt] =
    useState(false);
  const [allUsers, setAllUsers] = useState<UserProfileRecord[]>([]);

  const [approvedCorrections, setApprovedCorrections] = useState<
    ApprovedCorrectionRecord[]
  >([]);
  const [mySubmissions, setMySubmissions] = useState<
    ProofreadSubmissionRecord[]
  >([]);
  const [allSubmissions, setAllSubmissions] = useState<
    ProofreadSubmissionRecord[]
  >([]);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(
    []
  );
  const [driveSyncState, setDriveSyncState] =
    useState<DriveSyncStateRecord | null>(null);
  const [catalogDriveSyncState, setCatalogDriveSyncState] =
    useState<DriveSyncStateRecord | null>(null);

  const [proofreadModalTarget, setProofreadModalTarget] =
    useState<ProofreadDraftTarget | null>(null);
  const [asyncError, setAsyncError] = useState<string | null>(null);

  // Guard against duplicate history writes in the same session within 2 minutes
  const recentVisitTimestampsRef = useRef<Map<string, number>>(new Map());
  const profilePromiseRef = useRef<Promise<void> | null>(null);

  const isEmailAdmin = Boolean(
    user?.emailVerified &&
      user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );
  const isAdmin = isEmailAdmin || isAdminFromDoc;

  // Ensure /users/{uid} exists cleanly before any history/submission writes
  const ensureUserProfile = useCallback(async (currentUser: User) => {
    if (!currentUser.emailVerified || !currentUser.email) return;
    const userPath = `users/${currentUser.uid}`;
    const userRef = doc(db, "users", currentUser.uid);
    try {
      const snap = await getDoc(userRef);
      const safeName = (
        currentUser.displayName ||
        currentUser.email.split("@")[0] ||
        "Scholar"
      ).slice(0, 120);
      const safeEmail = currentUser.email.slice(0, 200);
      const safePhoto = currentUser.photoURL
        ? currentUser.photoURL.slice(0, 500)
        : undefined;

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: currentUser.uid,
          displayName: safeName,
          email: safeEmail,
          ...(safePhoto ? { photoURL: safePhoto } : {}),
          role: "reader",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await updateDoc(userRef, {
          displayName: safeName,
          email: safeEmail,
          ...(safePhoto ? { photoURL: safePhoto } : {}),
          updatedAt: serverTimestamp(),
        });
      }
      setProfileReadyUid(currentUser.uid);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, userPath);
    }
  }, []);

  // 1. Auth State Listener + Profile Sync + Admin Role Lookup
  useEffect(() => {
    const unsubscribe = initAuthListener((nextUser, tokenAvailable) => {
      setUser(nextUser);
      setHasDriveToken(tokenAvailable);
      setAuthReady(true);

      if (!nextUser) {
        setIsAdminFromDoc(false);
        setProfileReadyUid(null);
        setUserProfile(null);
        setProfileLoaded(false);
        setIsRegistrationModalOpen(false);
        setDismissedRegistrationPrompt(false);
        setAllUsers([]);
        setMySubmissions([]);
        setAllSubmissions([]);
        setReadingHistory([]);
        setDriveSyncState(null);
        setCatalogDriveSyncState(null);
        recentVisitTimestampsRef.current.clear();
        return;
      }

      profilePromiseRef.current = ensureUserProfile(nextUser).catch((err) => {
        console.error("Failed to sync user profile:", err);
      });

      // Check optional /admins/{uid} grant
      getDoc(doc(db, "admins", nextUser.uid))
        .then((snap) => {
          setIsAdminFromDoc(snap.exists());
        })
        .catch(() => {
          setIsAdminFromDoc(false);
        });
    });

    return () => unsubscribe();
  }, [ensureUserProfile]);

  // 2. Public listener: Approved Corrections (Zero-PII overlay visible to all visitors)
  useEffect(() => {
    const path = "approvedCorrections";
    const unsub = onSnapshot(
      collection(db, path),
      (snapshot) => {
        const items: ApprovedCorrectionRecord[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ApprovedCorrectionRecord, "id">),
        }));
        setApprovedCorrections(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );
    return () => unsub();
  }, []);

  // 3. Authenticated listener: User Profile, Reading History & Personal Submissions
  useEffect(() => {
    if (!authReady || !user) return;

    const userDocPath = `users/${user.uid}`;
    const unsubProfile = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as UserProfileRecord;
          setUserProfile(data);
          setProfileLoaded(true);
          if (!data.profileCompleted && !dismissedRegistrationPrompt) {
            setIsRegistrationModalOpen(true);
          }
        } else {
          setUserProfile(null);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, userDocPath);
      }
    );

    const historyPath = `users/${user.uid}/history`;
    const historyQuery = query(
      collection(db, historyPath),
      orderBy("updatedAt", "desc"),
      limit(100)
    );
    const unsubHistory = onSnapshot(
      historyQuery,
      (snapshot) => {
        const items: ReadingHistoryItem[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ReadingHistoryItem, "id">),
        }));
        setReadingHistory(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, historyPath);
      }
    );

    const subsPath = "proofreadSubmissions";
    const mySubsQuery = query(
      collection(db, subsPath),
      where("submitterUid", "==", user.uid)
    );
    const unsubMySubs = onSnapshot(
      mySubsQuery,
      (snapshot) => {
        const items: ProofreadSubmissionRecord[] = snapshot.docs
          .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<ProofreadSubmissionRecord, "id">),
          }))
          .sort(
            (a, b) =>
              getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt)
          );
        setMySubmissions(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, subsPath);
      }
    );

    return () => {
      unsubProfile();
      unsubHistory();
      unsubMySubs();
    };
  }, [authReady, user, dismissedRegistrationPrompt]);

  // 4. Admin listeners: All Proofreading Submissions, Registered Members & Drive Sync State
  useEffect(() => {
    if (!authReady || !user || !isAdmin) return;

    const usersPath = "users";
    const unsubUsers = onSnapshot(
      query(collection(db, usersPath), orderBy("createdAt", "desc")),
      (snapshot) => {
        const items: UserProfileRecord[] = snapshot.docs.map((d) => ({
          ...(d.data() as UserProfileRecord),
          uid: d.id,
        }));
        setAllUsers(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, usersPath);
      }
    );

    const subsPath = "proofreadSubmissions";
    const allSubsQuery = query(
      collection(db, subsPath),
      orderBy("createdAt", "desc")
    );
    const unsubAllSubs = onSnapshot(
      allSubsQuery,
      (snapshot) => {
        const items: ProofreadSubmissionRecord[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ProofreadSubmissionRecord, "id">),
        }));
        setAllSubmissions(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, subsPath);
      }
    );

    const syncDocPath = "appSettings/driveSync";
    const unsubSync = onSnapshot(
      doc(db, "appSettings", "driveSync"),
      (snap) => {
        if (snap.exists()) {
          setDriveSyncState({
            id: snap.id,
            ...(snap.data() as Omit<DriveSyncStateRecord, "id">),
          });
        } else {
          setDriveSyncState(null);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, syncDocPath);
      }
    );

    const catalogSyncPath = "appSettings/catalogDriveSync";
    const unsubCatalogSync = onSnapshot(
      doc(db, "appSettings", "catalogDriveSync"),
      (snap) => {
        if (snap.exists()) {
          setCatalogDriveSyncState({
            id: snap.id,
            ...(snap.data() as Omit<DriveSyncStateRecord, "id">),
          });
        } else {
          setCatalogDriveSyncState(null);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, catalogSyncPath);
      }
    );

    return () => {
      unsubUsers();
      unsubAllSubs();
      unsubSync();
      unsubCatalogSync();
    };
  }, [authReady, user, isAdmin]);

  // Fast O(1) lookup map for approved corrections
  const approvedMap = useMemo(() => {
    const map = new Map<string, ApprovedCorrectionRecord>();
    approvedCorrections.forEach((item) => {
      map.set(item.id, item);
    });
    return map;
  }, [approvedCorrections]);

  const getApprovedCorrection = useCallback(
    (textId: string, verseId: string, field: ProofreadField) => {
      return approvedMap.get(makeCorrectionId(textId, verseId, field));
    },
    [approvedMap]
  );

  const getVerseApprovedCorrections = useCallback(
    (textId: string, verseId: string) => {
      return approvedCorrections.filter(
        (c) => c.textId === textId && c.verseId === verseId
      );
    },
    [approvedCorrections]
  );

  const resolveVerseField = useCallback(
    (textId: string, verse: GranthaVerse, field: ProofreadField): string => {
      const approved = getApprovedCorrection(textId, verse.id, field);
      if (approved) return approved.correctedText;
      const fallbackVal = verse[field];
      return typeof fallbackVal === "string" ? fallbackVal : "";
    },
    [getApprovedCorrection]
  );

  const signInWithGoogle = useCallback(async () => {
    setIsSigningIn(true);
    setAsyncError(null);
    setDismissedRegistrationPrompt(false);
    try {
      const result = await googleSignIn();
      setHasDriveToken(Boolean(result.accessToken));
      if (result.user) {
        await ensureUserProfile(result.user);
      }
    } catch (error: any) {
      const msg =
        error?.code === "auth/popup-closed-by-user"
          ? "Sign-in was cancelled before completing."
          : error?.message || "Google Sign-In failed.";
      setAsyncError(msg);
      throw error;
    } finally {
      setIsSigningIn(false);
    }
  }, [ensureUserProfile]);

  const saveUserRegistration = useCallback(
    async (params: {
      occupation: string;
      interestedInVolunteering: boolean;
      institutionName: string;
      phoneNumber: string;
    }) => {
      if (!user || !user.emailVerified || !user.email) {
        throw new Error("Please sign in with a verified Google account first.");
      }

      if (profileReadyUid !== user.uid) {
        if (profilePromiseRef.current) {
          await profilePromiseRef.current;
        } else {
          await ensureUserProfile(user);
        }
      }

      const userPath = `users/${user.uid}`;
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          occupation: params.occupation.trim().slice(0, 160),
          interestedInVolunteering: Boolean(params.interestedInVolunteering),
          institutionName: params.institutionName.trim().slice(0, 200),
          phoneNumber: params.phoneNumber.trim().slice(0, 40),
          profileCompleted: true,
          updatedAt: serverTimestamp(),
        });
        setIsRegistrationModalOpen(false);
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, userPath);
      }
    },
    [user, profileReadyUid, ensureUserProfile]
  );

  const signOutUser = useCallback(async () => {
    await logout();
    setHasDriveToken(false);
  }, []);

  const recordReadingVisit = useCallback(
    async (params: {
      textId: string;
      textTitle: string;
      chapterId?: string;
      chapterTitle?: string;
      verseId?: string;
      verseNumber?: string;
      actionType?: "read" | "proofread_submitted";
    }) => {
      if (!user || !user.emailVerified) return;

      const actionType = params.actionType || "read";
      const historyId = sanitizeFirestoreId(
        `${params.textId}__${params.chapterId || "root"}__${params.verseId || "overview"}__${actionType}`
      );

      // Avoid repetitive Firestore writes for the same verse within 90 seconds
      const now = Date.now();
      const lastRecorded = recentVisitTimestampsRef.current.get(historyId);
      if (actionType === "read" && lastRecorded && now - lastRecorded < 90_000) {
        return;
      }
      recentVisitTimestampsRef.current.set(historyId, now);

      // Ensure parent /users/{uid} exists first (Master Gate invariant)
      if (profileReadyUid !== user.uid) {
        if (profilePromiseRef.current) {
          await profilePromiseRef.current;
        } else {
          await ensureUserProfile(user);
        }
      }

      const docPath = `users/${user.uid}/history/${historyId}`;
      const historyRef = doc(db, "users", user.uid, "history", historyId);

      try {
        const existingSnap = await getDoc(historyRef);
        const optionalFields = {
          ...(params.chapterId
            ? { chapterId: params.chapterId.slice(0, 120) }
            : {}),
          ...(params.chapterTitle
            ? { chapterTitle: params.chapterTitle.slice(0, 240) }
            : {}),
          ...(params.verseId
            ? { verseId: params.verseId.slice(0, 120) }
            : {}),
          ...(params.verseNumber
            ? { verseNumber: params.verseNumber.slice(0, 60) }
            : {}),
        };

        if (existingSnap.exists()) {
          await updateDoc(historyRef, {
            ...optionalFields,
            actionType,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(historyRef, {
            id: historyId,
            userId: user.uid,
            textId: params.textId.slice(0, 120),
            textTitle: params.textTitle.slice(0, 200),
            ...optionalFields,
            actionType,
            visitedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, docPath);
      }
    },
    [user, profileReadyUid, ensureUserProfile]
  );

  const submitProofread = useCallback(
    async (params: {
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
    }): Promise<string> => {
      if (!user || !user.emailVerified || !user.email) {
        throw new Error("Please sign in with a verified Google account first.");
      }

      if (profileReadyUid !== user.uid) {
        await ensureUserProfile(user);
      }

      const submissionId = sanitizeFirestoreId(
        `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      );
      const subPath = `proofreadSubmissions/${submissionId}`;

      try {
        await setDoc(doc(db, "proofreadSubmissions", submissionId), {
          id: submissionId,
          submitterUid: user.uid,
          submitterName: (
            user.displayName ||
            user.email.split("@")[0] ||
            "Reader"
          ).slice(0, 120),
          submitterEmail: user.email.slice(0, 200),
          textId: params.textId.slice(0, 120),
          textTitle: params.textTitle.slice(0, 200),
          ...(params.chapterId
            ? { chapterId: params.chapterId.slice(0, 120) }
            : {}),
          ...(params.chapterTitle
            ? { chapterTitle: params.chapterTitle.slice(0, 240) }
            : {}),
          verseId: params.verseId.slice(0, 120),
          verseNumber: params.verseNumber.slice(0, 60),
          field: params.field,
          originalText: params.originalText.slice(0, 12000),
          proposedText: params.proposedText.trim().slice(0, 12000),
          reason: params.reason.trim().slice(0, 2000),
          status: "pending",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        await recordReadingVisit({
          textId: params.textId,
          textTitle: params.textTitle,
          chapterId: params.chapterId,
          chapterTitle: params.chapterTitle,
          verseId: params.verseId,
          verseNumber: params.verseNumber,
          actionType: "proofread_submitted",
        });

        return submissionId;
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, subPath);
      }
    },
    [user, profileReadyUid, ensureUserProfile, recordReadingVisit]
  );

  const reviewProofread = useCallback(
    async (params: {
      submission: ProofreadSubmissionRecord;
      decision: "approved" | "rejected";
      finalText?: string;
      reviewerNote?: string;
    }) => {
      if (!user || !isAdmin) {
        throw new Error("Curator/admin authorization is required.");
      }

      const { submission, decision, finalText, reviewerNote } = params;
      const effectiveProposed = (
        finalText !== undefined ? finalText : submission.proposedText
      )
        .trim()
        .slice(0, 12000);

      const batch = writeBatch(db);
      const subRef = doc(db, "proofreadSubmissions", submission.id);
      const safeNote = reviewerNote?.trim()
        ? reviewerNote.trim().slice(0, 2000)
        : undefined;

      if (decision === "approved") {
        const correctionId = makeCorrectionId(
          submission.textId,
          submission.verseId,
          submission.field
        );
        const correctionRef = doc(db, "approvedCorrections", correctionId);
        const existingCorrection = approvedMap.get(correctionId);

        if (existingCorrection) {
          batch.update(correctionRef, {
            originalText: submission.originalText.slice(0, 12000),
            correctedText: effectiveProposed,
            submissionId: submission.id,
            approvedByUid: user.uid,
            updatedAt: serverTimestamp(),
          });
        } else {
          batch.set(correctionRef, {
            id: correctionId,
            textId: submission.textId.slice(0, 120),
            ...(submission.chapterId
              ? { chapterId: submission.chapterId.slice(0, 120) }
              : {}),
            verseId: submission.verseId.slice(0, 120),
            field: submission.field,
            originalText: submission.originalText.slice(0, 12000),
            correctedText: effectiveProposed,
            submissionId: submission.id,
            approvedByUid: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }

        batch.update(subRef, {
          proposedText: effectiveProposed,
          status: "approved",
          reviewerUid: user.uid,
          ...(safeNote ? { reviewerNote: safeNote } : {}),
          approvedCorrectionId: correctionId,
          updatedAt: serverTimestamp(),
        });
      } else {
        batch.update(subRef, {
          status: "rejected",
          reviewerUid: user.uid,
          ...(safeNote ? { reviewerNote: safeNote } : {}),
          updatedAt: serverTimestamp(),
        });
      }

      try {
        await batch.commit();
      } catch (error) {
        handleFirestoreError(
          error,
          OperationType.WRITE,
          `proofreadSubmissions/${submission.id}`
        );
      }
    },
    [user, isAdmin, approvedMap]
  );

  const syncSubmissionsToDrive = useCallback(
    async (options?: { overwriteExisting?: boolean }): Promise<DriveSyncResult> => {
      if (!user || !isAdmin) {
        throw new Error("Only the curator/admin can sync the list to Google Drive.");
      }
      const token = getAccessToken();
      if (!token) {
        setHasDriveToken(false);
        throw new Error("DRIVE_AUTH_REQUIRED");
      }

      const existingFileId =
        options?.overwriteExisting && driveSyncState?.spreadsheetFileId
          ? driveSyncState.spreadsheetFileId
          : undefined;

      let result: DriveSyncResult;
      try {
        result = await syncProofreadSheetToDrive({
          accessToken: token,
          submissions: allSubmissions,
          existingFileId,
        });
      } catch (err: any) {
        if (
          err?.message === "DRIVE_AUTH_REQUIRED" ||
          err?.message === "DRIVE_AUTH_EXPIRED"
        ) {
          clearAccessToken();
          setHasDriveToken(false);
        }
        throw err;
      }

      const syncPath = "appSettings/driveSync";
      const syncRef = doc(db, "appSettings", "driveSync");
      try {
        if (driveSyncState) {
          await updateDoc(syncRef, {
            spreadsheetFileId: result.spreadsheetFileId.slice(0, 200),
            spreadsheetUrl: result.spreadsheetUrl.slice(0, 500),
            fileName: result.fileName.slice(0, 200),
            syncedCount: result.syncedCount,
            lastSyncedByUid: user.uid,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(syncRef, {
            id: "driveSync",
            spreadsheetFileId: result.spreadsheetFileId.slice(0, 200),
            spreadsheetUrl: result.spreadsheetUrl.slice(0, 500),
            fileName: result.fileName.slice(0, 200),
            syncedCount: result.syncedCount,
            lastSyncedByUid: user.uid,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, syncPath);
      }

      return result;
    },
    [user, isAdmin, allSubmissions, driveSyncState]
  );

  const catalogInventory = useMemo(
    () => computeCatalogInventory(PRESEEDED_GRANTHAS, approvedCorrections),
    [approvedCorrections]
  );

  const catalogNeedsDriveSync = useMemo(() => {
    if (!catalogDriveSyncState) return true;
    return catalogDriveSyncState.catalogSignature !== catalogInventory.signature;
  }, [catalogDriveSyncState, catalogInventory.signature]);

  const syncCatalogToDrive = useCallback(
    async (options?: { overwriteExisting?: boolean }): Promise<DriveSyncResult> => {
      if (!user || !isAdmin) {
        throw new Error(
          "Only the curator/admin can sync the text catalog to Google Drive."
        );
      }
      const token = getAccessToken();
      if (!token) {
        setHasDriveToken(false);
        throw new Error("DRIVE_AUTH_REQUIRED");
      }

      const existingFileId =
        options?.overwriteExisting && catalogDriveSyncState?.spreadsheetFileId
          ? catalogDriveSyncState.spreadsheetFileId
          : undefined;

      const csvContent = buildCatalogInventoryCsv(catalogInventory.rows);

      let result: DriveSyncResult;
      try {
        result = await syncCatalogSheetToDrive({
          accessToken: token,
          csvContent,
          rowCount: catalogInventory.rows.length,
          existingFileId,
        });
      } catch (err: any) {
        if (
          err?.message === "DRIVE_AUTH_REQUIRED" ||
          err?.message === "DRIVE_AUTH_EXPIRED"
        ) {
          clearAccessToken();
          setHasDriveToken(false);
        }
        throw err;
      }

      const syncPath = "appSettings/catalogDriveSync";
      const syncRef = doc(db, "appSettings", "catalogDriveSync");
      const sig = catalogInventory.signature.slice(0, 200);
      try {
        if (catalogDriveSyncState) {
          await updateDoc(syncRef, {
            spreadsheetFileId: result.spreadsheetFileId.slice(0, 200),
            spreadsheetUrl: result.spreadsheetUrl.slice(0, 500),
            fileName: result.fileName.slice(0, 200),
            syncedCount: result.syncedCount,
            lastSyncedByUid: user.uid,
            catalogSignature: sig,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(syncRef, {
            id: "catalogDriveSync",
            spreadsheetFileId: result.spreadsheetFileId.slice(0, 200),
            spreadsheetUrl: result.spreadsheetUrl.slice(0, 500),
            fileName: result.fileName.slice(0, 200),
            syncedCount: result.syncedCount,
            lastSyncedByUid: user.uid,
            catalogSignature: sig,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, syncPath);
      }

      return result;
    },
    [user, isAdmin, catalogInventory, catalogDriveSyncState]
  );

  const exportCatalogXlsx = useCallback(async () => {
    if (!user || !isAdmin) {
      throw new Error("Only the curator/admin can export from Google Drive.");
    }
    if (!catalogDriveSyncState?.spreadsheetFileId) {
      throw new Error("Create or link the Catalog Sheet in Google Drive first.");
    }
    const token = getAccessToken();
    if (!token) {
      setHasDriveToken(false);
      throw new Error("DRIVE_AUTH_REQUIRED");
    }
    try {
      await downloadGoogleSheetAsXlsx({
        accessToken: token,
        fileId: catalogDriveSyncState.spreadsheetFileId,
        fileName: `${catalogDriveSyncState.fileName || "VedantaTattvam_Text_Catalog"}.xlsx`,
      });
    } catch (err: any) {
      if (
        err?.message === "DRIVE_AUTH_REQUIRED" ||
        err?.message === "DRIVE_AUTH_EXPIRED"
      ) {
        clearAccessToken();
        setHasDriveToken(false);
      }
      throw err;
    }
  }, [user, isAdmin, catalogDriveSyncState]);

  const pendingCount = useMemo(() => {
    const source = isAdmin ? allSubmissions : mySubmissions;
    return source.filter((s) => s.status === "pending").length;
  }, [isAdmin, allSubmissions, mySubmissions]);

  const value: AuthProofreadContextValue = {
    user,
    authReady,
    userProfile,
    profileLoaded,
    isAdmin,
    hasDriveToken,
    isSigningIn,
    signInWithGoogle,
    signOutUser,
    saveUserRegistration,
    isRegistrationModalOpen,
    openRegistrationModal: () => setIsRegistrationModalOpen(true),
    closeRegistrationModal: () => {
      setDismissedRegistrationPrompt(true);
      setIsRegistrationModalOpen(false);
    },
    allUsers,
    approvedCorrections,
    mySubmissions,
    allSubmissions,
    readingHistory,
    driveSyncState,
    catalogDriveSyncState,
    catalogInventory,
    catalogNeedsDriveSync,
    pendingCount,
    getApprovedCorrection,
    getVerseApprovedCorrections,
    resolveVerseField,
    recordReadingVisit,
    submitProofread,
    reviewProofread,
    syncSubmissionsToDrive,
    syncCatalogToDrive,
    exportCatalogXlsx,
    proofreadModalTarget,
    openProofreadModal: (target) => setProofreadModalTarget(target),
    closeProofreadModal: () => setProofreadModalTarget(null),
    asyncError,
    clearAsyncError: () => setAsyncError(null),
  };

  return (
    <AuthProofreadContext.Provider value={value}>
      {children}
    </AuthProofreadContext.Provider>
  );
}

export function useAuthProofread() {
  const ctx = useContext(AuthProofreadContext);
  if (!ctx) {
    throw new Error(
      "useAuthProofread must be used inside an AuthProofreadProvider"
    );
  }
  return ctx;
}
