'use client';

import { useMemo, useState } from 'react';
import ImageLightbox from '@/components/common/ImageLightbox';
import Image from 'next/image';
import type { QualityPageData, QualitySlide } from '@/sanity/data/quality';

type Props = { data: QualityPageData };

export default function QualityClient({ data }: Props) {
  const policyItems = data.policyItems ?? [];

  // ✅ crash fix: boş gelirse fallback (tasarım bozulmasın)
  const slides: QualitySlide[] = useMemo(() => {
    const s = (data.slides ?? []).filter(Boolean);
    if (s.length > 0) return s;

    return [
      {
        kind: 'certificate',
        title: 'Sertifikamız',
        description: 'Buraya sertifika açıklaması gelecek. (Şef panelden düzenleyebilecek.)',
        imageUrl: null,
        alt: 'Sertifika',
      },
      { kind: 'photo', imageUrl: null, alt: 'Kalite fotoğrafı' },
    ];
  }, [data.slides]);

  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const safeLen = slides.length || 1;
  const current = slides[idx] ?? slides[0];
  const isCert = current.kind === 'certificate';

  const next = () => setIdx((v) => (v + 1) % safeLen);
  const prev = () => setIdx((v) => (v - 1 + safeLen) % safeLen);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="vakko-title text-3xl md:text-4xl">{data.title}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* SOL */}
        <section className="lg:col-span-7">
          <div className="text-sm font-medium text-black/70">{data.policyTitle}</div>

          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-black/70">
            {policyItems.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-black/60" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SAĞ */}
        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-black/10 p-5">
            <div className="relative rounded-2xl overflow-hidden bg-black/5">
              <div className="relative h-[320px] md:h-[360px] w-full">
                {current.imageUrl ? (
                  <Image
                    src={current.imageUrl}
                    alt={current.alt ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 520px"
                    priority={idx === 0}
                  />
                ) : (
                  <div className="h-full grid place-items-center text-sm text-black/50">
                    {isCert ? 'Sertifika Görseli (placeholder)' : 'İkinci Görsel (placeholder)'}
                    <div className="mt-2 text-xs text-black/40">
                      (Görselleri sonra CMS’den bağlayacağız)
                    </div>
                  </div>
                )}
              </div>

              {/* oklar */}
              <button
                type="button"
                onClick={prev}
                aria-label="Önceki"
                className="vakko-circle-arrow left-3"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Sonraki"
                className="vakko-circle-arrow right-3"
              >
                ›
              </button>

              {/* sayaç (tasarım aynı kalsın diye bıraktım) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.18em] uppercase bg-white/80 px-3 py-1 rounded-full">
                {Math.min(idx + 1, safeLen)}/{safeLen}
              </div>

              {/* sadece photo iken büyüt */}
              {!isCert ? (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="absolute bottom-3 right-3 text-[11px] tracking-[0.18em] uppercase bg-white/85 px-4 py-2 rounded-full hover:bg-white transition"
                >
                  Büyüt
                </button>
              ) : null}
            </div>

            {/* Sertifika metni sadece certificate slide */}
            {isCert ? (
              <div className="mt-5">
                <div className="text-[12px] uppercase tracking-[0.18em] text-black/60">
                  {current.title ?? 'Sertifika'}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  {current.description ?? ''}
                </p>
              </div>
            ) : null}
          </div>

          {/* Lightbox sadece photo için */}
          <ImageLightbox
            open={open}
            src={current.imageUrl || '/placeholders/quality-photo.jpg'}
            alt={current.alt ?? undefined}
            onClose={() => setOpen(false)}
          />
        </aside>
      </div>
    </div>
  );
}
