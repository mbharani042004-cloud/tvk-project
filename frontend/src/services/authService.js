/* Demonstration authentication backed by localStorage.

   IMPORTANT: this is frontend-only demo auth. Passwords are only lightly
   obfuscated, not securely hashed, and everything lives in the browser. It must
   never be described as (or relied upon as) real account security. */

import { readStore, writeStore, removeStore, STORAGE_KEYS } from './storageService';
import { DEMO_RESIDENT } from '../data/mockComplaints';
import { isValidEmail, isValidMobile, normaliseMobile } from './validationService';

const SESSION_KEY = 'tvk_session';

/* Readability-only obfuscation. NOT a security measure. */
function obfuscate(value) {
  try {
    return window.btoa(encodeURIComponent(String(value)));
  } catch (error) {
    return String(value);
  }
}

function ensureUsers() {
  const existing = readStore(STORAGE_KEYS.users, null);
  if (Array.isArray(existing) && existing.length > 0) return existing;

  const seeded = [
    {
      id: 'USR-DEMO-0001',
      name: DEMO_RESIDENT.name,
      mobile: DEMO_RESIDENT.mobile,
      email: DEMO_RESIDENT.email,
      street: DEMO_RESIDENT.street,
      password: obfuscate(DEMO_RESIDENT.password),
      createdAt: '2026-10-01T09:00:00.000Z',
    },
  ];
  writeStore(STORAGE_KEYS.users, seeded);
  return seeded;
}

export function toPublicUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

export function getUsers() {
  return ensureUsers();
}

function findByIdentifier(users, identifier) {
  const value = String(identifier || '').trim().toLowerCase();
  const digits = normaliseMobile(identifier);
  return users.find(
    (user) =>
      String(user.email).toLowerCase() === value ||
      (digits.length === 10 && normaliseMobile(user.mobile) === digits)
  );
}

export function register({ name, mobile, email, street, password }) {
  const users = ensureUsers();
  const normalisedEmail = String(email || '').trim().toLowerCase();
  const normalisedMobile = normaliseMobile(mobile);

  if (!isValidEmail(normalisedEmail)) {
    return { ok: false, messageKey: 'auth.register.validation.email' };
  }
  if (!isValidMobile(normalisedMobile)) {
    return { ok: false, messageKey: 'auth.register.validation.mobile' };
  }
  if (users.some((user) => String(user.email).toLowerCase() === normalisedEmail)) {
    return { ok: false, messageKey: 'auth.register.validation.duplicateEmail' };
  }
  if (users.some((user) => normaliseMobile(user.mobile) === normalisedMobile)) {
    return { ok: false, messageKey: 'auth.register.validation.duplicateMobile' };
  }

  const newUser = {
    id: `USR-${Date.now()}`,
    name: String(name).trim(),
    mobile: normalisedMobile,
    email: normalisedEmail,
    street: String(street).trim(),
    password: obfuscate(password),
    createdAt: new Date().toISOString(),
  };

  writeStore(STORAGE_KEYS.users, [...users, newUser]);
  return { ok: true, user: toPublicUser(newUser) };
}

export function login({ identifier, password }) {
  const users = ensureUsers();
  const user = findByIdentifier(users, identifier);

  if (!user || user.password !== obfuscate(password)) {
    return { ok: false, messageKey: 'auth.loginValidation.invalid' };
  }

  return { ok: true, user: toPublicUser(user) };
}

export function getCurrentUser() {
  const persistent = readStore(STORAGE_KEYS.session, null);
  if (persistent) return persistent;

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

export function setSession(user, remember = false) {
  const safeUser = toPublicUser(user);
  if (remember) {
    writeStore(STORAGE_KEYS.session, safeUser);
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch (error) {
      /* ignore */
    }
  } else {
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    } catch (error) {
      /* ignore */
    }
    removeStore(STORAGE_KEYS.session);
  }
  return safeUser;
}

export function logout() {
  removeStore(STORAGE_KEYS.session);
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    /* ignore */
  }
}
