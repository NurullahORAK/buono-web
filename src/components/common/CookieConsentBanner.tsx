'use client';

import { useEffect, useState } from 'react';
import type { CookieConsentState } from '@/lib/cookieConsent';
import { DEFAULT_CONSENT, readConsent, writeConsent } from '@/lib/cookieConsent';

type ConsentChangedEvent = CustomEvent<CookieConsentState>;

type Draft = Pick<CookieConsentState, 'functional' | 'analytics' | 'marketing'>;

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-black/10 pt-4">
      <div className="min-w-0">
        <div className="text-sm font-medium text-[color:var(--ink)]">{label}</div>
        <div className="mt-1 text-xs text-black/60 leading-relaxed">{desc}</div>
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'shrink-0 h-7 w-12 rounded-full border transition relative',
          disabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90',
          checked ? 'bg-black border-black' : 'bg-transparent border-black/20',
        ].join(' ')}
        aria-pressed={checked}
      >
        <span
          className={[
            'absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-[color:var(--background)] shadow transition',
            checked ? 'right-1' : 'left-1',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsentState | null>(() => readConsent());
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(() => ({
    functional: consent?.functional ?? false,
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  }));

  // banner: consent yoksa ve modal açık değilse görünür
  const showBanner = consent === null && !open;

  useEffect(() => {
    const onChanged = (event: Event) => {
      const ce = event as ConsentChangedEvent;
      setConsent(ce.detail ?? null);
      setOpen(false);
    };

    const onOpenPrefs = () => {
      const current = readConsent() ?? DEFAULT_CONSENT;
      setDraft({
        functional: current.functional,
        analytics: current.analytics,
        marketing: current.marketing,
      });
      setOpen(true);
    };

    window.addEventListener('cookie-consent-changed', onChanged as EventListener);
    window.addEventListener('open-cookie-preferences', onOpenPrefs);

    return () => {
      window.removeEventListener('cookie-consent-changed', onChanged as EventListener);
      window.removeEventListener('open-cookie-preferences', onOpenPrefs);
    };
  }, []);

  const acceptAll = () => {
    writeConsent({ ...DEFAULT_CONSENT, functional: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    writeConsent({ ...DEFAULT_CONSENT, functional: false, analytics: false, marketing: false });
  };

  const savePrefs = () => {
    writeConsent({
      ...DEFAULT_CONSENT,
      functional: draft.functional,
      analytics: draft.analytics,
      marketing: draft.marketing,
    });
    setOpen(false);
  };

  const openPrefsFromBanner = () => {
    const current = readConsent() ?? DEFAULT_CONSENT;
    setDraft({
      functional: current.functional,
      analytics: current.analytics,
      marketing: current.marketing,
    });
    setOpen(true);
  };

  if (!showBanner && !open) return null;

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-[1000]">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <div className="rounded-2xl border border-black/15 bg-[color:var(--background)] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-5">
              <div className="text-[11px] uppercase tracking-[0.16em] text-black/50">
                Çerez Tercihleri
              </div>
              <div className="mt-2 text-sm text-black/70 leading-relaxed">
                Sitemiz temel işlevler için <b>zorunlu</b>, harita gibi özellikler için{' '}
                <b>işlevsel</b> çerezler kullanabilir. Analitik/pazarlama çerezleri tercihinizle
                etkinleşir. Detaylar:{' '}
                <a
                  href="/cerez-politikasi"
                  className="underline underline-offset-4 hover:opacity-80"
                >
                  Çerez Politikası
                </a>
                .
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={openPrefsFromBanner}
                  className="h-10 px-4 rounded-xl border border-black/15 text-xs uppercase tracking-[0.16em] hover:bg-black/[0.03] transition"
                >
                  Tercihler
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="h-10 px-4 rounded-xl border border-black/15 text-xs uppercase tracking-[0.16em] hover:bg-black/[0.03] transition"
                >
                  Reddet
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="h-10 px-4 rounded-xl bg-black text-[color:var(--background)] text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
                >
                  Kabul Et
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[1100]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-10 mx-auto max-w-2xl px-4">
            <div className="rounded-2xl border border-black/15 bg-[color:var(--background)] shadow-[0_16px_60px_rgba(0,0,0,0.18)] p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="vakko-title text-2xl md:text-3xl">ÇEREZ TERCİHLERİ</h2>
                  <p className="mt-2 text-sm text-black/70 leading-relaxed">
                    Zorunlu çerezler sitenin çalışması için gereklidir ve kapatılamaz. Diğer
                    kategorileri isteğe göre açıp kapatabilirsin.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 h-10 w-10 grid place-items-center rounded-xl border border-black/15 hover:bg-black/[0.03] transition"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6">
                <ToggleRow
                  label="Zorunlu Çerezler"
                  desc="Sitenin güvenli şekilde çalışması ve tercihlerin hatırlanması için gereklidir."
                  checked={true}
                  onChange={() => {}}
                  disabled
                />
                <ToggleRow
                  label="İşlevsel Çerezler"
                  desc="Harita gibi ek özellikleri çalıştırmak için kullanılabilir."
                  checked={draft.functional}
                  onChange={(v) => setDraft((d) => ({ ...d, functional: v }))}
                />
                <ToggleRow
                  label="Analitik Çerezler"
                  desc="Kullanımı ölçerek iyileştirme yapmaya yardımcı olur (tercihinle)."
                  checked={draft.analytics}
                  onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
                />
                <ToggleRow
                  label="Pazarlama Çerezleri"
                  desc="Reklam/yeniden pazarlama amaçlı kullanılabilir (tercihinle)."
                  checked={draft.marketing}
                  onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
                />
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="h-10 px-4 rounded-xl border border-black/15 text-xs uppercase tracking-[0.16em] hover:bg-black/[0.03] transition"
                >
                  Tümünü Reddet
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="h-10 px-4 rounded-xl border border-black/15 text-xs uppercase tracking-[0.16em] hover:bg-black/[0.03] transition"
                >
                  Tümünü Kabul Et
                </button>
                <button
                  type="button"
                  onClick={savePrefs}
                  className="h-10 px-4 rounded-xl bg-black text-[color:var(--background)] text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
                >
                  Kaydet
                </button>
              </div>

              <div className="mt-4 text-xs text-black/60 leading-relaxed">
                Tercihler tarayıcıda saklanır. Dilediğin zaman footer’daki “Çerez Tercihleri” ile
                güncelleyebilirsin.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
