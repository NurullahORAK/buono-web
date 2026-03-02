import Link from 'next/link';
import Image from 'next/image';
import { fetchConsultingServices } from '@/sanity/data/consulting';

export default async function ConsultingServicesPage() {
  const items = await fetchConsultingServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb */}
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
          <li className="text-black/70">HİZMETLER</li>
        </ol>
      </nav>

      <h1 className="mt-6 vakko-title text-3xl md:text-4xl">HİZMETLER</h1>

      {items.length === 0 ? (
        <p className="mt-6 text-black/60">Henüz hizmet eklenmemiş.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => {
            const cover = x.images?.[0];
            return (
              <Link
                key={x.id}
                href={`/danismanlik/hizmetler/${x.slug}`}
                className="block rounded-2xl border border-black/10 p-4 hover:border-black/25 transition"
              >
                <div className="h-36 rounded-xl bg-black/5 overflow-hidden relative">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={x.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 50vw, 320px"
                    />
                  ) : null}
                </div>

                <div className="mt-3 font-medium">{x.title}</div>
                <div className="mt-1 text-sm text-black/60">{x.short}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
