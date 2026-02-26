'use client';

import Image from 'next/image';
import type { Product } from '@/content/types';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

function resolveImg(product: Product): string | null {
  const src = product.image ?? product.images?.[0];
  if (!src) return null;
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return null;
}

export default function CakeProductCard({ product }: { product: Product }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const message = `Merhaba, ${product.name} için sipariş vermek istiyorum. (Pasta)`;
  const wa = buildWhatsAppUrl(config.whatsappPhoneE164, message);

  const img = resolveImg(product);

  return (
    <div className="rounded-2xl border border-black/10 p-4 hover:border-black/25 transition">
      {/* Tıklanabilir değil */}
      <div className="block">
        {/* Kare görsel */}
        <div className="relative w-full pb-[100%] rounded-xl overflow-hidden bg-black/5">
          {img ? (
            <Image
              src={img}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-black/40">
              Görsel (placeholder)
            </div>
          )}
        </div>

        <div className="mt-3 font-medium">{product.name}</div>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center bg-black text-white px-5 py-3 text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
      >
        SİPARİŞ VER
      </a>
    </div>
  );
}
