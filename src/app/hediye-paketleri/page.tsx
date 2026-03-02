import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryProductsClient from '@/components/category/CategoryProductsClient';

import { fetchProductsByCategorySlug } from '@/sanity/data/products';
import { fetchCategoryFilterTags } from '@/sanity/data/categories';

export default async function GiftBoxesPage() {
  const [products, filterTags] = await Promise.all([
    fetchProductsByCategorySlug('hediye-paketleri'),
    fetchCategoryFilterTags('hediye-paketleri'),
  ]);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'BUONO', href: '/' }, { label: 'Hediye Paketleri' }]} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {products.length === 0 ? (
          <p className="text-black/60">Henüz ürün eklenmemiş.</p>
        ) : (
          <CategoryProductsClient
            products={products}
            categorySlug="hediye-paketleri"
            filterTags={filterTags}
          />
        )}
      </div>
    </div>
  );
}
