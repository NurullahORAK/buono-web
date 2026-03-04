'use client';

import type { Product } from '@/content/types';
import ProductCarousel from '../product/ProductCarousel';

export default function FeaturedProductsCarousel({ products }: { products: Product[] }) {
  return <ProductCarousel products={products} />;
}
