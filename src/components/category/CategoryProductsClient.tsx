'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/content/types';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilterButton from '@/components/category/CategoryFilterButton';
import { DEFAULT_FILTERS, type CategoryFilters } from '@/components/category/CategoryFilterPanel';

export default function CategoryProductsClient({
  products,
  categorySlug,
}: {
  products: Product[];
  categorySlug: string;
}) {
  const [applied, setApplied] = useState<CategoryFilters>(DEFAULT_FILTERS);

  const filteredAndSorted = useMemo(() => {
    // 1) Filter (tags)
    let list = products;

    if (applied.tags.length > 0) {
      list = list.filter((p) => (p.tags ?? []).some((t) => applied.tags.includes(t)));
    }

    // 2) Sort
    if (applied.sort === 'az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    } else if (applied.sort === 'za') {
      list = [...list].sort((a, b) => b.name.localeCompare(a.name, 'tr'));
    }

    return list;
  }, [products, applied]);

  return (
    <>
      <div className="mt-10 flex items-center justify-between border-b border-black/15 pb-3">
        <h2 className="text-xl font-semibold">Ürünler</h2>

        <div className="flex items-center gap-3">
          <CategoryFilterButton categorySlug={categorySlug} onApplyFilters={setApplied} />
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className="mt-4 text-black/60">Bu filtreye ait ürün bulunamadı.</p>
      ) : (
        <ProductGrid products={filteredAndSorted} className="mt-6" />
      )}
    </>
  );
}
