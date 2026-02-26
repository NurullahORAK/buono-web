'use client';

import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import type { Product } from '@/content/types';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // ✅ gerçek döngü
    align: 'start',
    // ✅ her tıkta “görünen kadar” kayması için
    // (3 görünüyorsa 3, 2 görünüyorsa 2, mobilde 1)
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={scrollPrev}
          aria-label="Önceki"
          className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
        >
          ‹
        </button>
        <button
          onClick={scrollNext}
          aria-label="Sonraki"
          className="h-9 w-9 rounded-full hover:bg-black/5 transition grid place-items-center"
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
