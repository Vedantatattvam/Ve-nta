# Firestore Security Specification (`security_spec.md`)

## Phase 0: Data & Security Invariants

1. **Default-Deny Catch-All**: Every path not explicitly matched is denied (`allow read, write: if false`).
2. **Verified Identity & Anti-Spoofing**: All writes require `request.auth != null && request.auth.token.email_verified == true`. Bootstrapped admin (`vedantatattvam@gmail.com`) MUST ALSO pass `request.auth.token.email_verified == true` or hold a document in `/admins/{uid}`.
3. **Self-Registration Role Lock**: Creating `/users/{userId}` strictly requires `incoming().role == 'reader'`. Users can NEVER assign themselves `admin`.
4. **PII Isolation**: `/users/{userId}` (including `email`, `occupation`, `institutionName`, `phoneNumber`, `interestedInVolunteering`) and `/proofreadSubmissions/{submissionId}` contain personal contact/profile data. Neither allows blanket `isSignedIn()` reads or public `list`. Access is strictly limited to `isOwner(...) || isAdmin()`.
5. **Master Gate on Subcollections**: `/users/{userId}/history/{historyId}` requires parent `/users/{userId}` to exist on `create` via `exists()`.
6. **Terminal State Locking & Atomic Approval**: Once a `/proofreadSubmissions/{submissionId}` transitions from `'pending'` to `'approved'` or `'rejected'`, the submitter cannot alter it. Approving a submission requires `isAdmin()` and atomically enforces `existsAfter(/databases/$(database)/documents/approvedCorrections/$(incoming().approvedCorrectionId))` in the same `writeBatch`.
7. **Public Zero-PII Corrections**: `/approvedCorrections/{correctionId}` holds no emails or user names and is publicly readable (`get`, `list`), writable exclusively by verified admins (`isAdmin()`).
8. **Temporal & Structural Integrity**: Document IDs match `^[a-zA-Z0-9_\\-]+$` (`size() <= 128`). All string fields enforce bounded `.size()`. `createdAt` and `updatedAt` must equal `request.time`. Immutable fields (`uid`, `submitterUid`, `createdAt`, `visitedAt`) cannot change on update.

## The "Dirty Dozen" Adversarial Test Payloads

1. **ID Poisoning**: Creating `/proofreadSubmissions/<2000-char string with slashes or spaces>` -> `PERMISSION_DENIED` (`isValidId` fails).
2. **Shadow / Ghost Field Injection**: Creating `/proofreadSubmissions/sub1` with extra `isAutoApproved: true` -> `PERMISSION_DENIED` (`keys().hasOnly(...)` fails).
3. **Self-Admin Privilege Escalation**: Creating `/users/attacker` with `role: "admin"` -> `PERMISSION_DENIED` (`incoming().role == 'reader'` fails).
4. **Admin Email Spoof (Unverified Email)**: Request with `email: "vedantatattvam@gmail.com"` and `email_verified: false` attempting admin approval -> `PERMISSION_DENIED` (`email_verified == true` fails).
5. **Identity Spoofing on Proofread Create**: User `alice` creating `/proofreadSubmissions/sub1` with `submitterUid: "bob"` -> `PERMISSION_DENIED` (`incoming().submitterUid == request.auth.uid` fails).
6. **PII Blanket Read Scrape**: Authenticated user `bob` calling `get` or `list` on `/users/alice` or `/proofreadSubmissions` without ownership filter -> `PERMISSION_DENIED`.
7. **Unverified User Bypass**: Authenticated user with `email_verified: false` creating `/proofreadSubmissions/sub1` -> `PERMISSION_DENIED`.
8. **Submitter Self-Approval / Status Bypass**: Submitter updating their own `pending` submission with `status: "approved"` -> `PERMISSION_DENIED` (`affectedKeys().hasOnly(['proposedText', 'reason', 'updatedAt'])` and `status == existing().status` fails).
9. **Terminal State Mutability Attack**: Submitter editing `proposedText` after status became `'rejected'` -> `PERMISSION_DENIED` (`existing().status == 'pending'` fails).
10. **Value Poisoning on Whitelisted Key**: Submitter updating `proposedText` to a 50,000-char string or boolean -> `PERMISSION_DENIED` (`isValidProofreadSubmission` enforces `is string` and `<= 12000`).
11. **Timestamp Forgery & Immutable Drift**: Updating a document with `updatedAt: <client timestamp>` or changing `createdAt` -> `PERMISSION_DENIED` (`updatedAt == request.time`, `createdAt == existing().createdAt`).
12. **Orphaned Subcollection / Non-Atomic Approval**: Creating `/users/ghost/history/h1` when `/users/ghost` does not exist, OR approving a submission without writing the linked `/approvedCorrections/{id}` doc in the same batch -> `PERMISSION_DENIED` (`exists` / `existsAfter` fails).
