'use client';

import type { Product } from '@/content/types';
import ProductGrid from '@/components/product/ProductGrid';
import CategoryFilterButton from '@/components/category/CategoryFilterButton';

export default function CategoryProductsClient({ products }: { products: Product[] }) {
  return (
    <>
      {/* Ürünler başlığı + sağda filtre */}
      <div className="mt-10 flex items-center justify-between border-b border-black/15 pb-3">
        <h2 className="text-xl font-semibold">Ürünler</h2>

        <div className="flex items-center gap-3">
          <CategoryFilterButton />
        </div>
      </div>

      {/* Grid: ProductCard kullanır (break-words + clamp fix burada devreye girer) */}
      {products.length === 0 ? (
        <p className="mt-4 text-black/60">Bu kategoriye henüz ürün eklenmedi (placeholder).</p>
      ) : (
        <ProductGrid products={products} className="mt-6" />
      )}
    </>
  );
}
