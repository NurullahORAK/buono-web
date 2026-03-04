'use client';

import { useState } from 'react';
import FilterButton from '@/components/common/FilterButton';
import CategoryFilterPanel, { DEFAULT_FILTERS, type CategoryFilters } from './CategoryFilterPanel';

export default function CategoryFilterButton({
  categorySlug: _categorySlug,
  availableTags = [],
  onApplyFilters,
}: {
  categorySlug?: string; // şimdilik opsiyonel kalsın
  availableTags?: string[];
  onApplyFilters?: (filters: CategoryFilters) => void;
}) {
  void _categorySlug;
  // Hook her durumda çalışmalı
  const [filters, setFilters] = useState<CategoryFilters>(DEFAULT_FILTERS);

  // Eğer props verilmeden kullanılırsa UI hiç çıkmasın
  if (!onApplyFilters) return null;

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
