'use client';

import Drawer from '@/components/common/Drawer';

export default function CategoryFilterDrawer({
  open,
  onClose,
  onApply,
  onReset,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onApply?: () => void;
  onReset?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Filtrele"
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onReset?.()}
            className="flex-1 rounded-xl border border-black/15 px-4 py-3 text-sm font-medium hover:border-black/30 transition"
          >
            Sıfırla
          </button>

          <button
            type="button"
            onClick={() => {
              onApply?.();
              onClose();
            }}
            className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90 transition"
          >
            Uygula
          </button>
        </div>
      }
    >
      {children ?? (
        <div className="rounded-xl border border-black/10 p-4 text-black/60">
          Filtreler (placeholder). Şimdilik UI hazır, filtre mantığı Sprint 2.
        </div>
      )}
    </Drawer>
  );
}
