export type CookieConsentCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export type CookieConsentState = {
  version: 1;
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string; // ISO
};

const STORAGE_KEY = 'buono_cookie_consent_v1';
const COOKIE_KEY = 'buono_cookie_consent_v1';

export const DEFAULT_CONSENT: CookieConsentState = {
  version: 1,
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString(),
};

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const parts = document.cookie.split(';').map((p) => p.trim());
  const found = parts.find((p) => p.startsWith(name + '='));
  if (!found) return null;
  return decodeURIComponent(found.substring(name.length + 1));
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === 'undefined') return;
  // SameSite=Lax ile temel güvenlik; HTTPS’te Secure de eklenebilir.
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

export function readConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null;

  // 1) localStorage
  const fromLs = safeJsonParse<CookieConsentState>(localStorage.getItem(STORAGE_KEY));
  if (fromLs?.version === 1) return { ...DEFAULT_CONSENT, ...fromLs, necessary: true };

  // 2) cookie fallback
  const fromCookie = safeJsonParse<CookieConsentState>(readCookie(COOKIE_KEY));
  if (fromCookie?.version === 1) return { ...DEFAULT_CONSENT, ...fromCookie, necessary: true };

  return null;
}

export function hasConsent(): boolean {
  return readConsent() !== null;
}

export function writeConsent(next: CookieConsentState) {
  if (typeof window === 'undefined') return;

  const normalized: CookieConsentState = {
    ...DEFAULT_CONSENT,
    ...next,
    version: 1,
    necessary: true,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  // 1 yıl
  writeCookie(COOKIE_KEY, JSON.stringify(normalized), 60 * 60 * 24 * 365);

  window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: normalized }));
}

export function clearConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  writeCookie(COOKIE_KEY, '', 0);
  window.dispatchEvent(new Event('cookie-consent-cleared'));
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('open-cookie-preferences'));
}

export function isAllowed(
  consent: CookieConsentState | null,
  category: CookieConsentCategory
): boolean {
  if (category === 'necessary') return true;
  if (!consent) return false;
  return Boolean(consent[category]);
}
