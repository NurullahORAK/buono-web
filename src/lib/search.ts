import type { Product } from '@/content/types';

function normalizeTR(input: string) {
  return input
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function searchProducts(products: Product[], query: string) {
  const q = normalizeTR(query.trim());
  if (!q) return products;

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = products.map((p) => {
    const hay = normalizeTR([p.name, p.short ?? '', p.details ?? '', ...(p.tags ?? [])].join(' '));

    // “tüm tokenlar geçsin” mantığı
    const allMatch = tokens.every((t) => hay.includes(t));
    const anyMatch = tokens.some((t) => hay.includes(t));

    // skor: allMatch > anyMatch
    const score = allMatch ? 2 : anyMatch ? 1 : 0;

    return { p, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}
