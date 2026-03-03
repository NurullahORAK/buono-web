// src/app/fikri-sinai-mulkiyet/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchContentPageBySlug } from '@/sanity/data/contentPage';

export const revalidate = 60;

export default async function FikriSinaiMulkiyetPage() {
  const data = await fetchContentPageBySlug('fikri-sinai-mulkiyet');
  if (!data) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb (mevcut stilinle aynı) */}
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.16em] text-black/50"
      >
        <ol className="flex flex-wrap items-center gap-2 min-w-0">
          <li className="min-w-0">
            <Link href="/" className="hover:text-black/80 transition">
              BUONO
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li className="text-black/70 break-words [overflow-wrap:anywhere]">
            {data.title.toUpperCase()}
          </li>
        </ol>
      </nav>

      {/* Sayfa başlığı (tasarım aynı) */}
      <h1 className="mt-6 vakko-title text-3xl md:text-4xl">
        {data.title.toUpperCase()}
      </h1>

      {/* Ana blok: SOL görsel / SAĞ açıklama (tasarım aynı) */}
      <section className="mt-6 grid gap-6 rounded-2xl border border-black/10 p-6 md:grid-cols-2 overflow-hidden">
        {/* SOL: Büyük görsel */}
        <div className="h-[320px] rounded-2xl bg-black/5 overflow-hidden">
          {data.heroImageUrl ? (
            <div className="relative h-full w-full">
              <Image
                src={data.heroImageUrl}
                alt={data.heroAlt ?? data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
                priority
              />
            </div>
          ) : (
            <div className="h-full w-full grid place-items-center text-black/50">
              Büyük Görsel (Sanity)
            </div>
          )}
        </div>

        {/* SAĞ: Açıklama */}
        <div className="min-w-0">
          <p className="text-black/70 leading-relaxed whitespace-pre-line break-words [overflow-wrap:anywhere]">
            {data.body}
          </p>
        </div>
      </section>
    </div>
  );
}
