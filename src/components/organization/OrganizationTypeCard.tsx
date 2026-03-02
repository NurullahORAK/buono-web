'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { OrganizationType } from '@/content/types';

export default function OrganizationTypeCard({ item }: { item: OrganizationType }) {
  const cover = item.images?.[0];

  return (
    <Link
      href={`/organizasyon/${item.slug}`}
      className="block rounded-2xl border border-black/10 p-4 hover:border-black/25 transition"
    >
      <div className="relative h-36 rounded-xl bg-black/5 overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 320px"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-[11px] text-black/40">
            Görsel
          </div>
        )}
      </div>

      <div className="mt-3 font-medium">{item.title}</div>
      <div className="mt-1 text-sm text-black/60">{item.short}</div>
    </Link>
  );
}
