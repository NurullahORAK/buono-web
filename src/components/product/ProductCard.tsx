'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/content/types';
import { sanityImageLoader } from '@/lib/sanityImageLoader';

type Props = {
  product: Product;
  href?: string;
  showShort?: boolean;
  className?: string;
};

function safeImageSrc(src?: string | null): string | null {
  if (!src) return null;
  // Mock'taki "1", "2" gibi değerler image olmasın; sadece gerçek url/path olsun
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return null;
}

export default function ProductCard({ product, href, showShort = true, className }: Props) {
  const url = href ?? `/urun/${product.slug}`;

  // Önce product.image, yoksa images[0]
  const cover = safeImageSrc(product.image) ?? safeImageSrc(product.images?.[0]) ?? null;

  return (
    <Link
      href={url}
      className={[
        'rounded-2xl border border-black/10 p-4 hover:border-black/25 transition block',
        className ?? '',
      ].join(' ')}
    >
      {/* Görsel alanı */}
      <div className="relative h-40 rounded-xl overflow-hidden bg-black/5">
        {cover ? (
          <Image
            loader={sanityImageLoader}
            src={cover}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-black/35 text-xs">
            Görsel yok
          </div>
        )}
      </div>

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
