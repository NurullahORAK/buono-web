import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fetchCakeGroups } from '@/sanity/data/cakeGroups';

export default async function PastaPage() {
  const groups = await fetchCakeGroups();

  return (
    <div>
      <Breadcrumbs items={[{ label: 'BUONO', href: '/' }, { label: 'Pasta' }]} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* ✅ ÜST AÇIKLAMA (senin dediğin gibi) */}
        <div className="max-w-3xl">
          <p className="text-[15px] leading-relaxed text-black/60">
            Pastalarımız kişiye özel hazırlanır. Tema, renk, yazı ve içerik seçenekleri için
            WhatsApp üzerinden iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between border-b border-black/15 pb-3">
          <h1 className="text-xl font-semibold">Pasta Grupları</h1>
        </div>

        {groups.length === 0 ? (
          <p className="mt-6 text-black/60">Henüz pasta grubu eklenmemiş.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <Link
                key={g.id}
                href={`/pasta/${g.slug}`}
                className="rounded-2xl border border-black/10 p-4 hover:border-black/25 transition block"
              >
                {/* ✅ KARE GÖRSEL */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
                  {g.image ? (
                    <Image
                      src={g.image}
                      alt={g.title}
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

                <div className="mt-3">
                  <div className="font-medium">{g.title}</div>
                  {g.description ? (
                    <div className="mt-1 text-sm text-black/60 line-clamp-2">{g.description}</div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
