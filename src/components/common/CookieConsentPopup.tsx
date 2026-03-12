'use client';

import { useEffect, useState } from 'react';
import type { CookieConsentState } from '@/lib/cookieConsent';
import { DEFAULT_CONSENT, readConsent, writeConsent } from '@/lib/cookieConsent';

type ToggleKey = 'functional' | 'analytics' | 'marketing';

function getDetailFromEvent<T>(e: Event): T | null {
  const ce = e as CustomEvent<T>;
  return ce?.detail ?? null;
}

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
        <div className="text-sm font-semibold text-[color:var(--ink)]">{label}</div>
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
        aria-label={label}
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

export default function CookieConsentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [openManage, setOpenManage] = useState(false);

  const [draft, setDraft] = useState<Pick<CookieConsentState, ToggleKey>>({
    functional: false,
    analytics: false,
    marketing: false,
  });

  const syncDraftFromConsent = (c: CookieConsentState | null) => {
    const normalized = c ?? DEFAULT_CONSENT;
    setDraft({
      functional: normalized.functional,
      analytics: normalized.analytics,
      marketing: normalized.marketing,
    });
  };

  const acceptAll = () => {
    // UI anında değişsin
    setDraft({ functional: true, analytics: true, marketing: true });
    // kayıt
    writeConsent({ ...DEFAULT_CONSENT, functional: true, analytics: true, marketing: true });
    // popup kapansın
    setShowPopup(false);
  };

  const rejectAll = () => {
    setDraft({ functional: false, analytics: false, marketing: false });
    writeConsent({ ...DEFAULT_CONSENT, functional: false, analytics: false, marketing: false });
    setShowPopup(false);
  };

  const openManageModal = () => {
    syncDraftFromConsent(readConsent());
    setOpenManage(true);
    setShowPopup(false);
  };

  const saveManage = () => {
    writeConsent({
      ...DEFAULT_CONSENT,
      functional: draft.functional,
      analytics: draft.analytics,
      marketing: draft.marketing,
    });
    setOpenManage(false);
  };

  useEffect(() => {
    const existing = readConsent();

    setShowPopup(!existing);

    // ✅ consent değişince popup kapanır + draft senkronlanır
    const onChanged = (e: Event) => {
      const next = getDetailFromEvent<CookieConsentState | null>(e);
      setShowPopup(false);
      syncDraftFromConsent(next);
    };

    // ✅ Footer’daki “Çerez Tercihleri” bunu dispatch ediyor → yönetim modalını aç
    const onOpenPrefs = () => {
      openManageModal();
    };

    window.addEventListener('cookie-consent-changed', onChanged);
    window.addEventListener('open-cookie-preferences', onOpenPrefs);

    return () => {
      window.removeEventListener('cookie-consent-changed', onChanged);
      window.removeEventListener('open-cookie-preferences', onOpenPrefs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* DIVAN STYLE POPUP */}
      {showPopup ? (
        <div
          className="
            fixed z-[1000]
            inset-x-0 bottom-0
            sm:left-4 sm:bottom-4 sm:inset-x-auto
            w-full sm:w-[min(620px,calc(100vw-2rem))]
          "
        >
          <div className="rounded-none sm:rounded-2xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
            <div className="p-5 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr] sm:gap-6">
                {/* SOL METİN */}
                <div className="text-sm text-black/70 leading-relaxed">
                  Sitemizde, içeriğin tarafınıza sağlanması, Site’nin performansının optimize
                  edilmesi ve ziyaretçi profilinin anlaşılması için gerekli olan çerezler
                  kullanılmaktadır. Site üzerinde kullanılan çerezler hakkında detaylı bilgi almak
                  için{' '}
                  <a
                    href="/cerez-politikasi"
                    className="font-semibold underline underline-offset-4 hover:opacity-80"
                    style={{ color: 'var(--brand)' }}
                  >
                    Çerez Aydınlatma Metni
                  </a>
                  ’ni incelemenizi rica ederiz.
                </div>

                {/* SAĞ BUTONLAR */}
                <div className="flex flex-col items-stretch gap-3">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="h-11 rounded-full text-white text-sm font-semibold transition hover:opacity-95"
                    style={{ backgroundColor: 'var(--brand)' }}
                  >
                    Tüm Çerezlere İzin Ver
                  </button>

                  <button
                    type="button"
                    onClick={rejectAll}
                    className="h-11 rounded-full border-2 text-sm font-semibold transition"
                    style={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    Tüm Çerezleri Reddet
                  </button>

                  <button
                    type="button"
                    onClick={openManageModal}
                    className="mt-1 text-sm font-semibold hover:underline underline-offset-4"
                    style={{ color: 'var(--brand)' }}
                  >
                    Çerezleri Yönet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* YÖNETİM MODALI */}
      {openManage ? (
        <div className="fixed inset-0 z-[1100]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenManage(false)}
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 top-10 mx-auto max-w-2xl px-4">
            <div className="rounded-2xl border border-black/15 bg-[color:var(--background)] shadow-[0_16px_60px_rgba(0,0,0,0.18)] p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="vakko-title text-2xl md:text-3xl">ÇEREZ TERCİHLERİ</h2>
                  <p className="mt-2 text-sm text-black/70 leading-relaxed">
                    Zorunlu çerezler sitenin çalışması için gereklidir ve kapatılamaz. Diğer
                    kategorileri isteğinize göre açıp kapatabilirsiniz.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenManage(false)}
                  className="shrink-0 h-10 w-10 grid place-items-center rounded-xl border border-black/15 hover:bg-black/[0.03] transition"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6">
                <ToggleRow
                  label="Zorunlu Çerezler"
                  desc="Sitenin güvenli şekilde çalışması ve temel fonksiyonlar için gereklidir."
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
                  desc="Ziyaretçi sayısı ve sayfa performansını ölçerek iyileştirme yapmamıza yardımcı olur (tercihinizle etkinleşir)."
                  checked={draft.analytics}
                  onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
                />
                <ToggleRow
                  label="Pazarlama Çerezleri"
                  desc="Reklam/yeniden pazarlama gibi amaçlarla kullanılabilir (tercihinizle etkinleşir)."
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
                  onClick={saveManage}
                  className="h-10 px-4 rounded-xl bg-black text-[color:var(--background)] text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
                >
                  Kaydet
                </button>
              </div>

              <div className="mt-4 text-xs text-black/60 leading-relaxed">
                Detaylı bilgi:{' '}
                <a
                  href="/cerez-politikasi"
                  className="underline underline-offset-4 hover:opacity-80"
                >
                  Çerez Politikası
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
