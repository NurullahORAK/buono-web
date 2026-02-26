'use client';

import { useState } from 'react';

export type FaqItem = {
  q: string;
  a: React.ReactNode;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-black/10 overflow-hidden bg-transparent">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className="border-b border-black/10 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left"
            >
              <span className="font-medium text-black/90">{it.q}</span>
              <span className="text-black/60">{isOpen ? '−' : '+'}</span>
            </button>

            {isOpen ? (
              <div className="px-5 pb-6 text-sm text-black/70 leading-relaxed">{it.a}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
