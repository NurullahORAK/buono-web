'use client';

import { useState } from 'react';
import FilterButton from '@/components/common/FilterButton';
import CategoryFilterPanel, { DEFAULT_FILTERS, type CategoryFilters } from './CategoryFilterPanel';

export default function CategoryFilterButton() {
  const [filters, setFilters] = useState<CategoryFilters>(DEFAULT_FILTERS);

  return (
    <FilterButton
      onReset={() => setFilters(DEFAULT_FILTERS)}
      onApply={() => {
        // Sprint 1: şimdilik sadece state hazır.
        // Sprint 2: burada URL searchParams ile listeyi gerçekten filtreleyeceğiz.
        console.log('Apply filters:', filters);
      }}
    >
      <CategoryFilterPanel value={filters} onChange={setFilters} />
    </FilterButton>
  );
}
