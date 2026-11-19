/* Shared, framework-free validators used by the complaint, enquiry, community
   and authentication forms. Each returns an error message key or null. */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MOBILE_PATTERN = /^[6-9]\d{9}$/;

export function isRequired(value) {
  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
}

export function minLength(value, length) {
  return typeof value === 'string' && value.trim().length >= length;
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value).trim());
}

export function isValidMobile(value) {
  return MOBILE_PATTERN.test(String(value).replace(/\s+/g, ''));
}

export function normaliseMobile(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 10);
}

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export function validateImageFile(file, messages) {
  if (!file) return null;
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return messages.imageType;
  if (file.size > MAX_IMAGE_BYTES) return messages.imageSize;
  return null;
}

/* Read a File into a base64 data URL for localStorage-friendly previews. */
export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export function formatDate(value, language = 'en') {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(value, language = 'en') {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString(language === 'ta' ? 'ta-IN' : 'en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
