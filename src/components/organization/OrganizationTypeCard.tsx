'use client';

import Link from 'next/link';
import type { OrganizationType } from '@/content/types';

export default function OrganizationTypeCard({ item }: { item: OrganizationType }) {
  return (
    <Link
      href={`/organizasyon/${item.slug}`}
      className="block rounded-2xl border border-black/10 p-4 hover:border-black/25 transition"
    >
      <div className="h-36 rounded-xl bg-black/5 grid place-items-center text-[11px] text-black/40">
        Görsel
      </div>

      <div className="mt-3 font-medium">{item.title}</div>
      <div className="mt-1 text-sm text-black/60">{item.short}</div>
    </Link>
  );
}
