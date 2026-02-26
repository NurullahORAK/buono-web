'use client';

import { useMemo, useRef, useState } from 'react';
import type { CakeGroup } from '@/content/types';
import CakeProductGrid from '@/components/cake/CakeProductGrid';

export default function CakeCategoryExplorerClient({ groups }: { groups: CakeGroup[] }) {
  const [selectedSlug, setSelectedSlug] = useState(groups[0]?.slug ?? '');
  const infoRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(
    () => groups.find((g) => g.slug === selectedSlug) ?? groups[0],
    [groups, selectedSlug]
  );

  if (!selected) {
    return <p className="text-black/60">Henüz pasta alt kategorisi yok.</p>;
  }

  const onSelect = (slug: string) => {
    setSelectedSlug(slug);
    setTimeout(() => infoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div>
      {/* Alt kategori kartları */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {groups.map((g) => {
          const active = g.slug === selectedSlug;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelect(g.slug)}
              className={[
                'text-left rounded-2xl border p-4 transition',
                active ? 'border-black/40' : 'border-black/10 hover:border-black/25',
              ].join(' ')}
            >
              <div className="h-28 rounded-xl bg-black/5 grid place-items-center text-black/40">
                Görsel (placeholder)
              </div>
              <div className="mt-3 font-medium">{g.title}</div>
            </button>
          );
        })}
      </div>

      {/* Açıklama + ürünler */}
      <div ref={infoRef} className="mt-10 rounded-2xl border border-black/10 p-6">
        <h2 className="vakko-title text-2xl md:text-3xl">{selected.title}</h2>
        <p className="mt-3 text-black/70 leading-relaxed">
          {selected.description ??
            'Açıklama (placeholder). Sanity bağlayınca şef burayı dolduracak.'}
        </p>
      </div>

      <div className="mt-8">
        <CakeProductGrid products={selected.products} />
      </div>
    </div>
  );
}
