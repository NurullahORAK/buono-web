import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { fetchCakeGroupBySlug } from '@/sanity/data/cakeGroups';

import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default async function PastaGroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const group = await fetchCakeGroupBySlug(slug);
  if (!group) return notFound();

  const siteUrl = 'http://localhost:3000';

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'BUONO', href: '/' },
          { label: 'Pasta', href: '/pasta' },
          { label: group.title },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* ÜSTTE AÇIKLAMA */}
        {group.description ? (
          <p className="max-w-3xl text-[15px] leading-relaxed text-black/60">{group.description}</p>
        ) : null}

        <div className="mt-10 flex items-center justify-between border-b border-black/15 pb-3">
          <h2 className="text-xl font-semibold">Ürünler</h2>
        </div>

        {group.products.length === 0 ? (
          <p className="mt-6 text-black/60">Bu grupta ürün yok.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.products.map((p) => {
              const cover = p.images?.[0] || p.image || null;

              const message = `Merhaba, ${p.name} pastası için sipariş vermek istiyorum. Grup: ${group.title}. Link: ${siteUrl}/pasta/${group.slug}`;
              const wa = buildWhatsAppUrl(config.whatsappPhoneE164, message);

              return (
                <div key={p.id} className="rounded-2xl border border-black/10 p-4 block">
                  {/* KARE GÖRSEL */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={p.name}
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
                    <div className="font-medium break-words">{p.name}</div>

                    {p.short ? (
                      <div className="mt-1 text-sm text-black/60 line-clamp-2">{p.short}</div>
                    ) : null}

                    {/* ✅ SİPARİŞ VER (WhatsApp) */}
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center w-full bg-black text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] hover:opacity-90 transition"
                    >
                      SİPARİŞ VER
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
