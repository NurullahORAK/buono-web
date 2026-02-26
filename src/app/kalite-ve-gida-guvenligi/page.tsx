'use client';

import { useMemo, useState } from 'react';
import ImageLightbox from '@/components/common/ImageLightbox';

type Slide = {
  kind: 'certificate' | 'photo';
  title?: string;
  description?: string;
  src?: string; // Sanity gelince URL
  alt?: string;
};

export default function Page() {
  const policyItems = [
    'Çikolata, çikolatalı ürünler, pasta ürünleri, unlu mamuller ve çeşitli üretimlerimizde yüksek kaliteyi sürdürmek.',
    'Çalışanlarımızın kalite ve gıda güvenliğine yönelik bilinç seviyelerini artırmak.',
    'Üretim koşullarımızın ve ürünlerimizin standartlara uygunluğunu sağlamak.',
    'Hammadde temininde gıda güvenliği standartlarına uygun tedarikçilerle çalışmak.',
    'Tüm süreçlerde kaynakları planlı ve etkin kullanarak sonuç odaklı olmak.',
    'Sürekli iyileştirme yaklaşımıyla sistemin etkinliğini izlemek ve geliştirmek.',
  ];

  // Sağ taraftaki medya: 2 görsel (slider)
  // Sanity bağlanınca: title/description/image url buradan gelecek
  const slides: Slide[] = useMemo(
    () => [
      {
        kind: 'certificate',
        title: 'Sertifikamız',
        description: 'Buraya sertifika açıklaması gelecek. (Şef panelden düzenleyebilecek.)',
        src: '', // placeholder
        alt: 'Sertifika',
      },
      {
        kind: 'photo',
        src: '', // placeholder (şef ekleyecek)
        alt: 'Kalite fotoğrafı',
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const current = slides[idx];
  const isCert = current.kind === 'certificate';

  const next = () => setIdx((v) => (v + 1) % slides.length);
  const prev = () => setIdx((v) => (v - 1 + slides.length) % slides.length);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="vakko-title text-3xl md:text-4xl">Kalite ve Gıda Güvenliği</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* SOL: Gıda Güvenliği Politikamız (geri geldi ✅) */}
        <section className="lg:col-span-7">
          <div className="text-sm font-medium text-black/70">Gıda Güvenliği Politikamız</div>

          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-black/70">
            {policyItems.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-black/60" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SAĞ: 2 görsel slider + certificate metni sadece certificate slide'ında */}
        <aside className="lg:col-span-5">
          <div className="rounded-2xl border border-black/10 p-5">
            {/* Görsel alanı (büyütüldü) */}
            <div className="relative rounded-2xl overflow-hidden bg-black/5">
              <div className="h-[320px] md:h-[360px] grid place-items-center text-sm text-black/50">
                {isCert ? 'Sertifika Görseli (placeholder)' : 'İkinci Görsel (placeholder)'}
                <div className="mt-2 text-xs text-black/40">
                  (Görselleri sonra CMS’den bağlayacağız)
                </div>
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

              {/* sayaç */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.18em] uppercase bg-white/80 px-3 py-1 rounded-full">
                {idx + 1}/{slides.length}
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

            {/* Sertifika metni sadece sertifika görselindeyken */}
            {isCert ? (
              <div className="mt-5">
                <div className="text-[12px] uppercase tracking-[0.18em] text-black/60">
                  {current.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{current.description}</p>
              </div>
            ) : null}
          </div>

          {/* Lightbox sadece photo için */}
          <ImageLightbox
            open={open}
            src={current.src || '/placeholders/quality-photo.jpg'}
            alt={current.alt}
            onClose={() => setOpen(false)}
          />
        </aside>
      </div>
    </div>
  );
}
