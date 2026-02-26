'use client';

import CategoryFilterButton from '@/components/category/CategoryFilterButton';

export default function ProductActions() {
  // Eğer ürün detayında filtre istemiyorsan bu component’i hiç kullanma.
  return <CategoryFilterButton />;
}
