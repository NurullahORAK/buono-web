'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/content/types';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilterButton from '@/components/category/CategoryFilterButton';
import { DEFAULT_FILTERS, type CategoryFilters } from '@/components/category/CategoryFilterPanel';

export default function CategoryProductsClient({
  products,
  categorySlug,
  filterTags = [],
}: {
  products: Product[];
  categorySlug: string;
  filterTags?: string[];
}) {
  const [applied, setApplied] = useState<CategoryFilters>(DEFAULT_FILTERS);

  const derivedTags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => (p.tags ?? []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'tr'));
  }, [products]);

  // ✅ Önce kategoriye tanımlı filtreler; yoksa ürünlerden türet
  const availableTags = filterTags.length > 0 ? filterTags : derivedTags;

  const filteredAndSorted = useMemo(() => {
    let list = products;

    // Filter (tags)
    if (applied.tags.length > 0) {
      list = list.filter((p) => (p.tags ?? []).some((t) => applied.tags.includes(t)));
    }

    // Sort
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
          <CategoryFilterButton
            categorySlug={categorySlug}
            availableTags={availableTags}
            onApplyFilters={setApplied}
          />
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
