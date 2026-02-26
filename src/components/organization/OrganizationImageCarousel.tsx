'use client';

import { useMemo, useState } from 'react';

export default function OrganizationImageCarousel({ images }: { images: string[] }) {
  const imgs = useMemo(() => (images?.length ? images : ['1']), [images]);
  const [i, setI] = useState(0);

  const can = imgs.length > 1;
  const prev = () => can && setI((v) => (v - 1 + imgs.length) % imgs.length);
  const next = () => can && setI((v) => (v + 1) % imgs.length);

  return (
    <div className="relative h-[340px] md:h-[420px] rounded-2xl bg-black/5 overflow-hidden border border-black/10">
      {/* placeholder görsel */}
      <div className="absolute inset-0 bg-black/5" />

      {can ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Önceki"
            className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center bg-white/70 backdrop-blur rounded-full text-[color:var(--gold)] transition hover:opacity-80"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center bg-white/70 backdrop-blur rounded-full text-[color:var(--gold)] transition hover:opacity-80"
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
