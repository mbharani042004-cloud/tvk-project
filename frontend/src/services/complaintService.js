/* Complaint records: creation, lookup, tracking verification and statistics.
   All data is persisted in localStorage for this frontend demonstration. */

import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  buildReference,
  sortByNewest,
} from './storageService';
import { MOCK_COMPLAINTS } from '../data/mockComplaints';
import { normaliseMobile, isValidMobile } from './validationService';

const ID_PREFIX = 'TVK';

function ensureComplaints() {
  const existing = readStore(STORAGE_KEYS.complaints, null);
  if (Array.isArray(existing)) return existing;
  writeStore(STORAGE_KEYS.complaints, MOCK_COMPLAINTS);
  return MOCK_COMPLAINTS;
}

export function getComplaints() {
  return sortByNewest(ensureComplaints());
}

export function getComplaintById(id) {
  const target = String(id || '').trim().toUpperCase();
  return ensureComplaints().find((item) => item.id.toUpperCase() === target) || null;
}

export function addComplaint(payload) {
  const complaints = ensureComplaints();
  const now = new Date().toISOString();

  const record = {
    id: buildReference(ID_PREFIX, complaints),
    residentName: String(payload.residentName).trim(),
    mobile: normaliseMobile(payload.mobile),
    email: payload.email ? String(payload.email).trim().toLowerCase() : '',
    ownerEmail: payload.email ? String(payload.email).trim().toLowerCase() : '',
    category: payload.category,
    street: String(payload.street).trim(),
    landmark: String(payload.landmark || '').trim(),
    priority: payload.priority,
    description: String(payload.description).trim(),
    image: payload.image || null,
    status: 'submitted',
    createdAt: now,
    updatedAt: now,
    statusHistory: [
      {
        status: 'submitted',
        at: now,
        note: { en: 'Complaint received.', ta: 'புகார் பெறப்பட்டது.' },
      },
    ],
  };

  writeStore(STORAGE_KEYS.complaints, [...complaints, record]);
  return record;
}

/* Complaints belonging to a signed-in resident, matched by email or mobile. */
export function getComplaintsForUser(user) {
  if (!user) return [];
  const email = String(user.email || '').toLowerCase();
  const mobile = normaliseMobile(user.mobile);

  return getComplaints().filter(
    (item) =>
      (email && String(item.ownerEmail || item.email || '').toLowerCase() === email) ||
      (mobile && normaliseMobile(item.mobile) === mobile)
  );
}

/* Tracking requires both the complaint id and the mobile used at submission,
   so a known id alone cannot expose someone else's details. */
export function findComplaintForTracking(id, mobile) {
  const record = getComplaintById(id);
  if (!record) return { ok: false, reason: 'notFound' };

  if (!isValidMobile(mobile) || normaliseMobile(record.mobile) !== normaliseMobile(mobile)) {
    return { ok: false, reason: 'mismatch' };
  }

  return { ok: true, complaint: record };
}

export function updateComplaintStatus(id, status, note = null) {
  const complaints = ensureComplaints();
  const now = new Date().toISOString();
  let updated = null;

  const next = complaints.map((item) => {
    if (item.id !== id) return item;
    updated = {
      ...item,
      status,
      updatedAt: now,
      statusHistory: [...(item.statusHistory || []), { status, at: now, note }],
    };
    return updated;
  });

  if (updated) writeStore(STORAGE_KEYS.complaints, next);
  return updated;
}

export function getComplaintStats(complaints) {
  const list = complaints || [];
  return {
    total: list.length,
    pending: list.filter((item) => ['submitted', 'underReview', 'inProgress', 'moreInfo'].includes(item.status)).length,
    resolved: list.filter((item) => item.status === 'resolved').length,
  };
}
