'use client';

import CategoryFilterDrawer from '@/components/category/CategoryFilterDrawer';
import { useDrawer } from '@/hooks/useDrawer';

export default function FilterButton({
  label = 'Filtrele',
  className,
  children,
  onApply,
  onReset,
}: {
  label?: string;
  className?: string;
  children?: React.ReactNode;
  onApply?: () => void;
  onReset?: () => void;
}) {
  const drawer = useDrawer(false);

  return (
    <>
      <button
        type="button"
        onClick={drawer.openDrawer}
        className={
          className ??
          'inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] hover:opacity-70 transition'
        }
      >
        <FilterIcon /> {label}
      </button>

      <CategoryFilterDrawer
        open={drawer.open}
        onClose={drawer.closeDrawer}
        onApply={() => {
          onApply?.();
          drawer.closeDrawer();
        }}
        onReset={onReset}
      >
        {children}
      </CategoryFilterDrawer>
    </>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
