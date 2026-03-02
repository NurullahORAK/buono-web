'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { HeroSlide } from '@/content/types';

export default function OrganizationHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const items = useMemo(() => (slides ?? []).filter((s) => !!s.image), [slides]);
  const total = items.length;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true, // ✅ döngü
  });

  const [index, setIndex] = useState(0);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  if (total === 0) {
    return (
      <div className="h-[280px] md:h-[360px] rounded-2xl bg-black/5 border border-black/10 grid place-items-center text-black/50">
        Hero slider (placeholder)
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-2xl bg-black/5 border border-black/10">
        <div className="flex">
          {items.map((s, i) => (
            <div key={s.id ?? i} className="flex-[0_0_100%]">
              <div className="relative h-[280px] md:h-[360px]">
                <Image
                  src={s.image as string}
                  alt={s.title ?? 'Organizasyon'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 960px"
                  priority={i === 0}
                />
                {/* title varsa overlay */}
                {s.title ? (
                  <div className="absolute left-4 bottom-4 bg-white/80 backdrop-blur px-4 py-3 rounded-xl">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                      Organizasyon
                    </div>
                    <div className="mt-1 font-semibold">{s.title}</div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* oklar */}
      {total > 1 ? (
        <>
          <button
            onClick={prev}
            aria-label="Önceki"
            className="vakko-circle-arrow left-3"
            type="button"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Sonraki"
            className="vakko-circle-arrow right-3"
            type="button"
          >
            ›
          </button>

          {/* dot */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={[
                  'h-2 w-2 rounded-full transition',
                  i === index ? 'bg-[color:var(--gold)]' : 'bg-black/20 hover:bg-black/35',
                ].join(' ')}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
