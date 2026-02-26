'use client';

import { useState } from 'react';

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-black/10 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-[12px] uppercase tracking-[0.16em] text-black/80">{title}</span>
        <span className="text-xl leading-none">{open ? '−' : '+'}</span>
      </button>

      {open && <div className="mt-3 text-sm text-black/70 leading-relaxed">{children}</div>}
    </div>
  );
}
