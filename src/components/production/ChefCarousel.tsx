'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

export type ChefItem = {
  id: string;
  title: string;
  description: string;
  images?: Array<{ src?: string; alt?: string }>; // Sanity uyumlu
};

function safeImg(src?: string) {
  if (!src) return null;
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return null;
}

export default function ChefCarousel({ items, title }: { items: ChefItem[]; title?: string }) {
  const [index, setIndex] = useState(0);

  const total = items.length || 1;
  const current = items[index];

  const prev = () => {
    if (items.length <= 1) return;
    setIndex((i) => (i - 1 + total) % total);
  };

  const next = () => {
    if (items.length <= 1) return;
    setIndex((i) => (i + 1) % total);
  };

  const imgSrc = useMemo(() => {
    const first = current?.images?.[0]?.src;
    return safeImg(first);
  }, [current]);

  if (!current) return null;

  return (
    <section className="rounded-2xl border border-black/10 p-6">
      {/* ŞEFLER başlığı: Üretim Alanı gibi (serif kırmızı değil, clean bold) */}
      {title ? <h2 className="text-2xl font-semibold mb-6">{title}</h2> : null}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Sol: Görsel (oklar görselin üstünde, Production gibi) */}
        <div className="relative">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/5 grid place-items-center text-black/50">
            {imgSrc ? (
              <Image src={imgSrc} alt={current.title} fill className="object-cover" />
            ) : (
              <div className="text-center">
                <div className="text-sm uppercase tracking-[0.18em] text-black/50">
                  Görsel (placeholder)
                </div>
              </div>
            )}
          </div>

          {items.length > 1 ? (
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

              <div className="mt-3 text-center vakko-body text-[12px] tracking-[0.18em] text-black/50">
                {index + 1}/{total}
              </div>
            </>
          ) : null}
        </div>

        {/* Sağ: Title + Description */}
        <div className="flex flex-col justify-center min-w-0">
          <h3 className="text-2xl font-semibold">{current.title}</h3>
          <p className="mt-3 text-black/70 leading-relaxed">{current.description}</p>

          <div className="mt-6 text-xs text-black/45">
            (CMS’den doldurulacak: title / description / images[])
          </div>
        </div>
      </div>
    </section>
  );
}
