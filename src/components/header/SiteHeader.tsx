'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { config } from '@/lib/config';
import { features } from '@/lib/features';
import { useStickyState } from '@/hooks/useStickyState';
import dynamic from 'next/dynamic';
import { categoryHref } from '@/lib/routes';

const MobileMenuDrawer = dynamic(() => import('./MobileMenuDrawer'), { ssr: false });

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { sentinelRef, stuck } = useStickyState();
  const pinned = stuck || searchOpen;

  const GOLD = config.theme?.gold ?? '#8A7B4A';

  // navbar yüksekliğini ölç (arama panelini navbarın ALTINDAN açacağız)
  const navRef = useRef<HTMLDivElement | null>(null);
  const [navH, setNavH] = useState(0);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const update = () => setNavH(el.getBoundingClientRect().height);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // arama açıkken scroll kilitle
  useEffect(() => {
    if (!searchOpen) return;

    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [searchOpen]);

  const closeSearch = () => setSearchOpen(false);

  return (
    <>
      {/* Logo alanı (sticky değil) */}
      <div className="w-full bg-[color:var(--background)]">
        <div className="mx-auto max-w-6xl px-4 py-6 flex justify-center">
          <Link href="/" className="inline-flex items-center" aria-label="BUONO Ana Sayfa">
            <Image
              src="/bonooo.png"
              alt="Buono by Aslıhan Bakery"
              width={520}
              height={180}
              priority
              className="h-14 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      {/* pinned ise spacer (layout zıplamasın) */}
      {pinned ? <div aria-hidden="true" style={{ height: navH }} /> : null}

      {/* Navbar: pinned olunca fixed */}
      <header
        className={[
          pinned ? 'fixed top-0 left-0 right-0 z-[1000]' : 'relative',
          'w-full bg-[color:var(--background)]',
        ].join(' ')}
      >
        {/* Bu wrapper yükseklik ölçümü için */}
        <div ref={navRef} className="relative mx-auto max-w-6xl px-4 pb-3">
          {/* çizgili bar */}
          <div
            className={[
              'w-full bg-[color:var(--background)] relative transition-shadow duration-300 border-none',
              !stuck ? 'vakko-double-line-strong' : '',
            ].join(' ')}
            style={{ ['--line' as any]: GOLD }}
          >
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex items-center gap-3 py-3">
                {/* Kategoriler */}
                <nav className="hidden md:flex flex-1 items-center justify-center gap-10 text-[14px] lg:text-[15px] vakko-nav leading-none">
                  {config.categories.map((c) => {
                    const href = categoryHref(c.slug);
                    const active = pathname.startsWith(href);

                    return (
                      <Link
                        key={c.slug}
                        href={href}
                        className={[
                          'relative inline-block px-1 py-1 transition',
                          'text-[color:var(--ink)]',
                          c.slug === 'hediye-paketleri' ? 'text-center min-w-[110px]' : '',
                          'after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-full',
                          'after:bg-[color:var(--gold)] after:origin-left after:scale-x-0 after:transition-transform after:duration-300',
                          'hover:after:scale-x-100',
                          active ? 'after:scale-x-100' : '',
                        ].join(' ')}
                      >
                        {c.slug === 'hediye-paketleri' ? (
                          <span className="block text-center leading-[1.1]">
                            <span className="block">Hediye</span>
                            <span className="block">Paketleri</span>
                          </span>
                        ) : (
                          c.label
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Sağ ikonlar */}
                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden h-9 w-9 rounded-full transition grid place-items-center hover:bg-black/5"
                    aria-label="Menüyü aç"
                    style={{ color: GOLD }}
                  >
                    ☰
                  </button>

                  {features.search ? (
                    <button
                      type="button"
                      onClick={() => setSearchOpen((v) => !v)}
                      className="h-9 w-9 rounded-full transition grid place-items-center hover:bg-black/5"
                      aria-label={searchOpen ? 'Aramayı kapat' : 'Ara'}
                      style={{ color: GOLD }}
                    >
                      {searchOpen ? <CloseIcon /> : <SearchIcon />}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} gold={GOLD} />
        </div>
      </header>

      {/* ===== SEARCH MODAL (navbarın ALTINDAN açılır) ===== */}
      {features.search && searchOpen ? (
        <>
          {/* Navbarın altından başlayan overlay: sayfa hafif görünür kalsın */}
          <div
            className="fixed left-0 right-0 bottom-0 z-[900] bg-white/70 backdrop-blur-sm"
            style={{ top: navH }}
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />

          {/* Panel: navbarın altına sabit */}
          <div className="fixed left-0 right-0 z-[950]" style={{ top: navH }}>
            <SearchPanel
              onClose={closeSearch}
              gold={GOLD}
              onSubmit={(q) => {
                closeSearch();
                router.push(`/arama?q=${encodeURIComponent(q)}`);
              }}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

function SearchPanel({
  onClose,
  onSubmit,
  gold,
}: {
  onClose: () => void;
  onSubmit: (q: string) => void;
  gold: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="bg-[color:var(--background)] border-b border-black/10 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <form
          className="mx-auto max-w-3xl"
          onSubmit={(e) => {
            e.preventDefault();
            const q = value.trim();
            if (!q) return;
            setValue('');
            onSubmit(q);
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-black/40 text-xs tracking-[0.22em] uppercase select-none">
              Ara
            </span>

            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ürün, kategori…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="w-full bg-transparent text-[15px] md:text-[16px] tracking-[0.12em]
                       text-black/80 placeholder:text-black/35
                       outline-none border-b pb-3"
              style={{ borderColor: gold }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 21l-4.2-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
