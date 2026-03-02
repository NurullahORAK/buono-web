'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useMemo, useState, useEffect } from 'react';
import type { CMSSection, CMSImage } from '@/content/types';

export default function InfoCarouselSection({
  kicker,
  section,
}: {
  kicker?: string;
  section: CMSSection;
}) {
  const slides = useMemo<CMSImage[]>(() => section.images ?? [], [section.images]);
  const total = slides.length;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
  });

  const [index, setIndex] = useState(0);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

  const renderSlides = total > 0 ? slides : [{ src: '', alt: '' }];

  return (
    <section className="rounded-2xl border border-black/10 bg-[color:var(--background)] p-6 md:p-10">
      {kicker ? (
        <div className="vakko-nav text-center text-[13px] tracking-[0.18em] mb-6">{kicker}</div>
      ) : null}

      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden rounded-2xl bg-black/5">
            <div className="flex">
              {renderSlides.map((img: CMSImage, i: number) => (
                <div key={i} className="flex-[0_0_100%]">
                  <div className="relative aspect-[4/3] w-full">
                    {img.src ? (
                      <Image
                        src={img.src}
                        alt={img.alt ?? ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={i === 0}
                      />
                    ) : (
                      <div className="h-full grid place-items-center text-black/40">
                        Görsel (placeholder)
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
            </>
          ) : null}
        </div>

        <div className="min-w-0">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{section.title}</h3>
          <p className="mt-4 text-black/70 leading-relaxed">{section.description}</p>
        </div>
      </div>
    </section>
  );
}
