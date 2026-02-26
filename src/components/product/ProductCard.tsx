'use client';

import Link from 'next/link';
import type { Product } from '@/content/types';

type Props = {
  product: Product;
  href?: string;
  showShort?: boolean;
  className?: string;
};

export default function ProductCard({ product, href, showShort = true, className }: Props) {
  const url = href ?? `/urun/${product.slug}`;

  return (
    <Link
      href={url}
      className={[
        'rounded-2xl border border-black/10 p-4 hover:border-black/25 transition block',
        className ?? '',
      ].join(' ')}
    >
      <div className="h-40 rounded-xl bg-black/5" />

      <div className="mt-3 min-w-0">
        <div className="font-medium break-words">{product.name}</div>

        {showShort && product.short ? (
          <div
            className={[
              'mt-1 text-sm text-black/60 break-words overflow-hidden',
              '[display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]',
            ].join(' ')}
          >
            {product.short}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
