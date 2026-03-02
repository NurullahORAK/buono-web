import { fetchAllSearchProducts } from '@/sanity/data/products';
import ProductGrid from '@/components/product/ProductGrid';

function norm(s: string) {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Türkçe aksan sadeleştirme
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').trim();
  const nq = norm(query);

  const all = await fetchAllSearchProducts();

  const results =
    nq.length < 2
      ? []
      : all.filter((p) => {
          const hay = norm([p.name, p.short, p.details, ...(p.tags ?? [])].join(' '));
          return hay.includes(nq);
        });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="vakko-title text-3xl md:text-4xl">ARAMA</h1>

      <p className="mt-2 text-black/60">
        {query ? `"${query}" için sonuçlar: ${results.length}` : 'Bir şey ara.'}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 text-black/60">
          {nq.length < 2 ? 'En az 2 karakter yaz.' : 'Sonuç bulunamadı.'}
        </p>
      ) : (
        <ProductGrid products={results} className="mt-6" />
      )}
    </div>
  );
}
