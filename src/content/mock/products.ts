import type { Product } from '../types';

const TAGS: Record<string, string[]> = {
  'hediye-paketleri': ['Hediye', 'Kişiye Özel', 'Yeni'],
  pasta: ['Vegan', 'Glutensiz', '8-10 Kişilik', 'Yeni'],
  cikolata: ['Bitter', 'Sütlü', 'Hediye', 'Yeni'],
  lokum: ['Antep', 'Gül', 'Hediye', 'Yeni'],
  atistirmalik: ['Kahve Yanı', 'Tuzlu', 'Tatlı', 'Yeni'],
};

const giftProducts: Product[] = [
  {
    id: '',
    name: '',
    slug: '',
    categorySlug: 'cikolata',
    tags: ['Nişan söz', 'Bonbon'], // ✅ burası
  },
  {
    id: 'g1',
    name: 'Hediye Kutusu 1',
    slug: 'hediye-kutusu-1',
    short: 'Kişiye özel içerik (placeholder).',
    details: 'Pembe kutu seçeneği vardır. İçerik kişiselleştirilebilir. Not eklenebilir.',
    categorySlug: 'hediye-paketleri',
    images: ['1', '2', '3'],
    tags: ['Hediye', 'Kişiye Özel'],
  },
  {
    id: 'g2',
    name: 'Hediye Kutusu 2',
    slug: 'hediye-kutusu-2',
    short: 'Özel not eklenebilir (placeholder).',
    details: 'Pembe kutu seçeneği vardır. Kişiye özel not eklenebilir.',
    categorySlug: 'hediye-paketleri',
    images: ['1', '2', '3'], // 3 slide
    tags: ['Hediye', 'Yeni'],
  },
  {
    id: 'g3',
    name: 'Hediye Kutusu 3',
    slug: 'hediye-kutusu-3',
    short: 'Kurumsal hediye için uygundur (placeholder).',
    details: 'Pembe kutu seçeneği vardır. Kişiye özel not eklenebilir.',
    categorySlug: 'hediye-paketleri',
    images: ['1', '2', '3', '4', '5'], // 5 slide
    tags: ['Hediye'],
  },
  {
    id: 'g4',
    name: 'Hediye Kutusu 4',
    slug: 'hediye-kutusu-4',
    short: 'Seçilen ürünlerle hazırlanır (placeholder).',
    details: 'Pembe kutu seçeneği vardır. Kişiye özel not eklenebilir.',
    categorySlug: 'hediye-paketleri',
    images: ['1', '2'], // 2 slide
    tags: ['Kişiye Özel'],
  },
  {
    id: 'g5',
    name: 'Hediye Kutusu 5',
    slug: 'hediye-kutusu-5',
    short: 'Premium sunum (placeholder).',
    details: 'Pembe kutu seçeneği vardır. Kişiye özel not eklenebilir.',
    categorySlug: 'hediye-paketleri',
    images: ['1', '2', '3', '4'], // 4 slide
    tags: ['Hediye', 'Yeni'],
  },
];

const normalProducts: Product[] = Array.from({ length: 18 }).map((_, i) => {
  const cats = ['pasta', 'cikolata', 'lokum', 'atistirmalik'] as const;
  const cat = cats[i % cats.length];

  return {
    id: `p${i + 1}`,
    name: `Ürün ${i + 1}`,
    slug: `urun-${i + 1}`,
    short: 'Kısa ürün açıklaması (placeholder).',
    details: i % 5 === 0 ? 'Renk: pembe. 6-8 kişilik. Tema: prenses.' : undefined,
    categorySlug: cat,
    images: Array.from({ length: (i % 4) + 2 }).map((_, k) => String(k + 1)), // 2-5 slide
    tags: TAGS[cat]?.slice(0, (i % 3) + 1) ?? [],
  };
});

export const products: Product[] = [...giftProducts, ...normalProducts];
