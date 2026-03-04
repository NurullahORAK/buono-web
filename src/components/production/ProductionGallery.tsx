'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { ProductionGalleryItem } from '@/content/types';

export default function ProductionGallery({ items }: { items: ProductionGalleryItem[] }) {
  return (
    <div className="mt-10 space-y-10">
      {items.map((item) => (
        <ProductionCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function ProductionCard({ item }: { item: ProductionGalleryItem }) {
  const images = useMemo(() => item.images ?? [], [item.images]);
  const [index, setIndex] = useState(0);

  const total = images.length || 1;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const current = images[index];

  return (
    <section className="rounded-2xl border border-black/10 p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Sol: Görsel alanı */}
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/5 grid place-items-center text-black/50">
            {current?.src ? (
              <Image
                src={current.src}
                alt={current.alt || item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                // Sanity/uzak görsellerde bazen ilk render'da sorun yaşarsan aç:
                // unoptimized
              />
            ) : (
              <div className="text-center">
                <div className="text-sm uppercase tracking-[0.18em] text-black/50">
                  Görsel (placeholder)
                </div>
                <div className="mt-2 text-xs text-black/40">
                  {index + 1} / {total}
                </div>
              </div>
            )}
          </div>

          {/* Oklar: çoklu görsel varsa */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-black/15 bg-white/90 backdrop-blur hover:border-black/30 transition grid place-items-center"
                aria-label="Önceki görsel"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-black/15 bg-white/90 backdrop-blur hover:border-black/30 transition grid place-items-center"
                aria-label="Sonraki görsel"
              >
                ›
              </button>

              <div className="mt-3 flex items-center justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={[
                      'h-1.5 w-1.5 rounded-full transition',
                      i === index ? 'bg-black/60' : 'bg-black/20 hover:bg-black/35',
                    ].join(' ')}
                    aria-label={`Görsel ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sağ: Title + Description */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          <p className="mt-3 text-black/70 leading-relaxed">{item.description}</p>

          <div className="mt-6 text-xs text-black/45">
            (Bu alanlar CMS’den doldurulacak: title / description / images[])
          </div>
        </div>
      </div>
    </section>
  );
}
