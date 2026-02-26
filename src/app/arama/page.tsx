import Breadcrumbs from '@/components/Breadcrumbs';
import { searchProducts } from '@/content';
import ProductGrid from '@/components/product/ProductGrid';

export default async function SearchPage({
  searchParams,
}: {
  // Next 16'da bazen Promise gibi davranabiliyor, bu yüzden güvenli yazıyoruz.
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const sp = await searchParams; // searchParams promise değilse bile await sorun çıkarmaz
  const query = (sp.q ?? '').toString();

  const results = query ? searchProducts(query) : [];

  return (
    <div>
      {' '}
      <Breadcrumbs items={[{ label: 'BUONO', href: '/' }, { label: 'Arama' }]} />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mt-6 text-3xl font-semibold">Arama</h1>
        <p className="mt-2 text-black/60">
          Aranan: <span className="font-medium text-black">{query || '-'}</span>
        </p>

        {!query ? (
          <p className="mt-6 text-black/60">Aramak için yukarıdaki arama kutusunu kullan.</p>
        ) : results.length === 0 ? (
          <p className="mt-6 text-black/60">Sonuç bulunamadı.</p>
        ) : (
          <ProductGrid products={results} className="mt-6" />
        )}
      </div>
    </div>
  );
}
