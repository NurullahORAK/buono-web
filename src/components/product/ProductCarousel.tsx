'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import type { Product } from '@/content/types';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  // ✅ GARANTİ wrap: sona geldiyse başa sar, baştaysa sona sar
  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollPrev()) emblaApi.scrollPrev();
    else emblaApi.scrollTo(emblaApi.scrollSnapList().length - 1);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) emblaApi.scrollNext();
    else emblaApi.scrollTo(0);
  }, [emblaApi]);

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={scrollPrev}
          aria-label="Önceki"
          className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
          type="button"
        >
          ‹
        </button>
        <button
          onClick={scrollNext}
          aria-label="Sonraki"
          className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
          type="button"
        >
          ›
        </button>
      </div>

      <div ref={emblaRef} className="mt-3 overflow-hidden">
        <div className="flex">
          {products.map((p) => (
            <div
              key={p.id}
              className="px-2 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
            >
              <ProductCard product={p} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
