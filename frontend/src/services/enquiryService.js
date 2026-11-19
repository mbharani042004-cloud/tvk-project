/* Enquiry records: submission, listing and per-resident lookup.
   Enquiries are private submissions and are never shown on public pages. */

import { STORAGE_KEYS, readStore, writeStore, buildReference, sortByNewest } from './storageService';
import { MOCK_ENQUIRIES } from '../data/mockComplaints';
import { normaliseMobile } from './validationService';

const ID_PREFIX = 'ENQ';

function ensureEnquiries() {
  const existing = readStore(STORAGE_KEYS.enquiries, null);
  if (Array.isArray(existing)) return existing;
  writeStore(STORAGE_KEYS.enquiries, MOCK_ENQUIRIES);
  return MOCK_ENQUIRIES;
}

export function getEnquiries() {
  return sortByNewest(ensureEnquiries());
}

export function addEnquiry(payload) {
  const enquiries = ensureEnquiries();

  const record = {
    id: buildReference(ID_PREFIX, enquiries),
    name: String(payload.name).trim(),
    mobile: normaliseMobile(payload.mobile),
    email: payload.email ? String(payload.email).trim().toLowerCase() : '',
    ownerEmail: payload.email ? String(payload.email).trim().toLowerCase() : '',
    category: payload.category,
    subject: String(payload.subject).trim(),
    message: String(payload.message).trim(),
    createdAt: new Date().toISOString(),
  };

  writeStore(STORAGE_KEYS.enquiries, [...enquiries, record]);
  return record;
}

export function getEnquiriesForUser(user) {
  if (!user) return [];
  const email = String(user.email || '').toLowerCase();
  const mobile = normaliseMobile(user.mobile);

  return getEnquiries().filter(
    (item) =>
      (email && String(item.ownerEmail || item.email || '').toLowerCase() === email) ||
      (mobile && normaliseMobile(item.mobile) === mobile)
  );
}
