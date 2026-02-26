'use client';

import { useState } from 'react';
import FilterButton from '@/components/common/FilterButton';
import CategoryFilterPanel, { DEFAULT_FILTERS, type CategoryFilters } from './CategoryFilterPanel';
import { categoryFilters } from '@/content/categoryFilters';

export default function CategoryFilterButton({
  categorySlug,
  onApplyFilters,
}: {
  categorySlug: string;
  onApplyFilters: (filters: CategoryFilters) => void;
}) {
  const [filters, setFilters] = useState<CategoryFilters>(DEFAULT_FILTERS);

  const availableTags = categoryFilters[categorySlug] ?? [];

  return (
    <FilterButton
      onReset={() => {
        setFilters(DEFAULT_FILTERS);
        onApplyFilters(DEFAULT_FILTERS);
      }}
      onApply={() => {
        onApplyFilters(filters);
      }}
    >
      <CategoryFilterPanel value={filters} onChange={setFilters} availableTags={availableTags} />
    </FilterButton>
  );
}
