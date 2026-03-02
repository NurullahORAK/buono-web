'use client';

import { useState } from 'react';
import FilterButton from '@/components/common/FilterButton';
import CategoryFilterPanel, { DEFAULT_FILTERS, type CategoryFilters } from './CategoryFilterPanel';

export default function CategoryFilterButton({
  categorySlug,
  availableTags = [],
  onApplyFilters,
}: {
  categorySlug?: string; // şimdilik opsiyonel kalsın (ileride analytics vs. için kullanabilirsin)
  availableTags?: string[];
  onApplyFilters?: (filters: CategoryFilters) => void;
}) {
  // Eğer yanlışlıkla props verilmeden kullanılırsa (ProductActions gibi), UI hiç çıkmasın:
  if (!onApplyFilters) return null;

  const [filters, setFilters] = useState<CategoryFilters>(DEFAULT_FILTERS);

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
