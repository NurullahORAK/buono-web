import { getProductsByCategorySlug } from '@/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryProductsClient from '@/components/category/CategoryProductsClient';

export default function GiftBoxesPage() {
  const products = getProductsByCategorySlug('hediye-paketleri');

  return (
    <div>
      <Breadcrumbs items={[{ label: 'BUONO', href: '/' }, { label: 'Hediye Paketleri' }]} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {products.length === 0 ? (
          <p className="text-black/60">
            Henüz ürün eklenmemiş. (Sanity bağlanınca burada görünecek.)
          </p>
        ) : (
          <CategoryProductsClient products={products} categorySlug="hediye-paketleri" />
        )}
      </div>
    </div>
  );
}
