'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useMemo } from 'react';

type Slide = { src?: string; alt?: string };

export default function ProductImageCarousel({
  images,
  fallbackCount = 3,
}: {
  images?: Slide[];
  fallbackCount?: number;
}) {
  const slides = useMemo(() => {
    return images && images.length > 0
      ? images
      : Array.from({ length: fallbackCount }).map(() => ({}) as Slide);
  }, [images, fallbackCount]);

  const totalReal = images?.length ?? 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
  });

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-2xl bg-black/5">
        <div className="flex">
          {slides.map((img, idx) => (
            <div key={idx} className="flex-[0_0_100%]">
              <div className="relative h-[420px]">
                {img.src ? (
                  <Image
                    src={img.src}
                    alt={img.alt ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                ) : (
                  <div className="h-full grid place-items-center text-black/40">
                    Görsel {idx + 1} (placeholder)
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalReal > 1 ? (
        <>
          <button
            onClick={prev}
            aria-label="Önceki görsel"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white transition grid place-items-center z-10"
            type="button"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Sonraki görsel"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white transition grid place-items-center z-10"
            type="button"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
