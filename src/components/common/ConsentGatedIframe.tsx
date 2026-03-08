'use client';

import { useEffect, useState } from 'react';
import type { CookieConsentCategory, CookieConsentState } from '@/lib/cookieConsent';
import { isAllowed, openCookiePreferences, readConsent } from '@/lib/cookieConsent';

function getDetailFromEvent<T>(e: Event): T | null {
  const ce = e as CustomEvent<T>;
  return ce?.detail ?? null;
}

export default function ConsentGatedIframe({
  src,
  title,
  height = 420,
  requiredCategory = 'functional',
}: {
  src: string;
  title: string;
  height?: number;
  requiredCategory?: CookieConsentCategory;
}) {
  // ✅ SSR/ilk render sabit: her zaman null başla
  const [consent, setConsent] = useState<CookieConsentState | null>(null);

  useEffect(() => {
    // ❗ mounted state kullanmıyoruz.
    // İlk client render placeholder olur, effect sonrası consent okunur → iframe açılır.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());

    const onChanged = (e: Event) => {
      const detail = getDetailFromEvent<CookieConsentState>(e);
      setConsent(detail);
    };

    const onCleared = () => setConsent(null);

    window.addEventListener('cookie-consent-changed', onChanged);
    window.addEventListener('cookie-consent-cleared', onCleared);

    return () => {
      window.removeEventListener('cookie-consent-changed', onChanged);
      window.removeEventListener('cookie-consent-cleared', onCleared);
    };
  }, []);

  const allowed = isAllowed(consent, requiredCategory);

  if (!allowed) {
    return (
      <div className="grid place-items-center bg-black/5 text-center px-6" style={{ height }}>
        <div className="max-w-md">
          <div className="text-[11px] uppercase tracking-[0.16em] text-black/50">
            İçerik Gizlendi
          </div>
          <div className="mt-2 text-sm text-black/70 leading-relaxed">
            Bu içerik (örn. Google Haritalar) <b>işlevsel çerezler</b> olmadan görüntülenemez.
            Dilerseniz çerez tercihlerinizi güncelleyebilirsiniz.
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => openCookiePreferences()}
              className="h-10 px-4 rounded-xl bg-black text-[color:var(--background)] text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
            >
              Tercihleri Aç
            </button>

            <a
              href="/cerez-politikasi"
              className="h-10 px-4 rounded-xl border border-black/15 text-xs uppercase tracking-[0.16em] grid place-items-center hover:bg-black/[0.03] transition"
            >
              Politika
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full w-full"
    />
  );
}
