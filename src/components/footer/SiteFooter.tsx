import Link from 'next/link';
import { config } from '@/lib/config';
import CookiePreferencesLink from '@/components/common/CookiePreferencesLink';

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full border border-black/10 hover:border-black/20 hover:bg-black/[0.03] transition text-[color:var(--ink)]"
    >
      {children}
    </a>
  );
}

export default function SiteFooter() {
  const instagram = config.social.instagram || 'https://www.instagram.com/';
  const tiktok = config.social.tiktok || 'https://www.tiktok.com/';
  const youtube = config.social.youtube || 'https://www.youtube.com/';

  return (
    <footer className="mt-16 bg-[color:var(--background)]">
      {/* ÜST FOOTER (max width içerik) */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-14 grid gap-10 md:grid-cols-12">
          {/* Sol: marka kısa yazı */}
          <div className="md:col-span-4">
            <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
              {config.brandName}
            </div>
            <p className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">
              Sipariş ve organizasyon talepleri WhatsApp üzerinden alınır.
            </p>
          </div>

          {/* Orta: link kolonları */}
          <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
                Müşteri İlişkileri
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[color:var(--ink-soft)]">
                <li>
                  <Link
                    href="/iletisim"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sss"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    Sık Sorulan Sorular
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
                Kurumsal
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[color:var(--ink-soft)]">
                <li>
                  <Link
                    href="/kalite-ve-gida-guvenligi"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    Kalite ve Gıda Güvenliği
                  </Link>
                </li>
                <li>
                  <Link
                    href="/uretim-merkezi"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    Buono Üretim Merkezi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fikri-sinai-mulkiyet"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    Fikri Sınai Mülkiyet
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
                Yasal
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[color:var(--ink-soft)]">
                <li>
                  <Link
                    href="/kvkk-aydinlatma-metni"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    KVKK Aydınlatma Metni
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cerez-politikasi"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    Çerez Politikası
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kullanim-kosullari"
                    className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition"
                  >
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <CookiePreferencesLink className="text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:underline transition">
                    Çerez Tercihleri
                  </CookiePreferencesLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Sağ: sosyal ikonlar */}
          <div className="md:col-span-2 md:justify-self-end">
            <div className="flex items-center gap-3">
              <SocialLink href={instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={tiktok} label="TikTok">
                <TikTokIcon />
              </SocialLink>
              <SocialLink href={youtube} label="YouTube">
                <YouTubeIcon />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>

      {/* ALT BAR (FULL WIDTH) */}
      <div className="bg-[color:var(--footer)]">
        <div
          className="
      mx-auto max-w-6xl px-4
      py-3 md:py-4
      min-h-[44px]
      flex flex-wrap items-center justify-between gap-3
      text-xs text-[color:var(--footer-ink)]/85
      leading-5
    "
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          {/* sol taraf */}
          <div>© {new Date().getFullYear()} BUONO by Aslıhan Bakery</div>
          {/* sağ taraf (senin kırmızı şeritteki linklerin buraya) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href="/fikri-sinai-mulkiyet" className="hover:opacity-70 transition">
              TÜM HAKLARI SAKLIDIR.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4c.7 2.6 2.7 4.5 5 4.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 9.5 15.5 12 10 14.5V9.5Z" fill="currentColor" />
      <path
        d="M21 12c0 3.5-.3 5.7-1 6.2-1.2.8-5.1.8-8 .8s-6.8 0-8-.8C3.3 17.7 3 15.5 3 12s.3-5.7 1-6.2C5.2 5 9.1 5 12 5s6.8 0 8 .8c.7.5 1 2.7 1 6.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
