'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/content/types';
import ProductCard from '@/components/product/ProductCard';
import ProductCarousel from '../product/ProductCarousel';

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function FeaturedProductsCarousel({ products }: { products: Product[] }) {
  return <ProductCarousel products={products} />;
}
