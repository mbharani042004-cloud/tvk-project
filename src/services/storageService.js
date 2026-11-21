/* Low-level browser storage helpers. Every other service goes through this
   module so localStorage access and JSON handling live in exactly one place. */

const PREFIX = 'tvk_';

export const STORAGE_KEYS = {
  users: 'users',
  session: 'session',
  complaints: 'complaints',
  enquiries: 'enquiries',
  posts: 'posts',
  language: 'language',
  seededAt: 'seeded_at',
};

function withPrefix(key) {
  return `${PREFIX}${key}`;
}

export function readStore(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(withPrefix(key));
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storageService] Could not read "${key}"`, error);
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(withPrefix(key), JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[storageService] Could not write "${key}"`, error);
    return false;
  }
}

export function removeStore(key) {
  try {
    window.localStorage.removeItem(withPrefix(key));
    return true;
  } catch (error) {
    console.warn(`[storageService] Could not remove "${key}"`, error);
    return false;
  }
}

/* Generate the next reference id such as TVK-2026-0001 from existing records. */
export function buildReference(prefix, records) {
  const year = new Date().getFullYear();
  const highest = records.reduce((max, record) => {
    const parts = String(record.id || '').split('-');
    const value = Number(parts[parts.length - 1]);
    return Number.isFinite(value) && value > max ? value : max;
  }, 0);
  return `${prefix}-${year}-${String(highest + 1).padStart(4, '0')}`;
}

/* Newest first. Dates may be "YYYY-MM-DD" or full ISO strings. */
export function sortByNewest(records, field = 'createdAt') {
  return [...records].sort((a, b) => {
    const left = new Date(a[field] ?? 0).getTime();
    const right = new Date(b[field] ?? 0).getTime();
    return right - left;
  });
}

export function todayIsoDate() {
  return new Date().toISOString();
}
