import Link from 'next/link';
import { getReferences } from '@/content';

export default function ReferencesPage() {
  const items = getReferences();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.16em] text-black/50"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-black/80 transition">
              BUONO
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li>
            <Link href="/kategori/danismanlik" className="hover:text-black/80 transition">
              DANIŞMANLIK
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li className="text-black/70">REFERANSLAR</li>
        </ol>
      </nav>

      <h1 className="mt-6 vakko-title text-3xl md:text-4xl">REFERANSLAR</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((x) => (
          <Link
            key={x.id}
            href={`/danismanlik/referanslar/${x.slug}`}
            className="block rounded-2xl border border-black/10 overflow-hidden hover:border-black/25 transition"
          >
            <div className="h-44 bg-black/5 relative">
              <div className="absolute bottom-3 left-3 text-sm font-medium bg-white/80 px-3 py-2 rounded-xl">
                {x.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
