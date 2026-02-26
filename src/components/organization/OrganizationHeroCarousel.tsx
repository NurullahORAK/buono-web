'use client';

import { useMemo, useState } from 'react';
import type { HeroSlide } from '@/content/types';

export default function OrganizationHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const safeSlides = useMemo(
    () => (slides?.length ? slides : [{ id: 's0', title: 'Görsel' }]),
    [slides]
  );
  const [i, setI] = useState(0);

  const can = safeSlides.length > 1;
  const prev = () => can && setI((v) => (v - 1 + safeSlides.length) % safeSlides.length);
  const next = () => can && setI((v) => (v + 1) % safeSlides.length);

  return (
    <div className="relative h-[260px] md:h-[320px] rounded-2xl bg-black/5 overflow-hidden border border-black/10">
      {/* slide */}
      <div className="h-full w-full bg-black/5" />
      {/* arrows */}
      {can ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Önceki"
            className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center bg-transparent text-[color:var(--gold)] transition hover:opacity-70"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Sonraki"
            className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center bg-transparent text-[color:var(--gold)] transition hover:opacity-70"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : null}
    </div>
  );
}
