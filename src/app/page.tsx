import Image from 'next/image';
import { fetchHomePage } from '@/sanity/data/homePage';
import FeaturedProductsCarousel from '@/components/home/FeaturedProductsCarousel';

export const revalidate = 60; // publish sonrası en geç 60 sn içinde güncellensin

export default async function HomePage() {
  const home = await fetchHomePage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO (tasarım aynı, sadece image basıyoruz) */}
      <section className="h-[360px] w-full rounded-2xl border border-black/10 bg-black/5 overflow-hidden relative">
        {home.heroImageUrl ? (
          <Image
            src={home.heroImageUrl}
            alt={home.heroAlt ?? 'Buono'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />
        ) : (
          <div className="h-full w-full grid place-items-center">
            <div className="text-center">
              <div className="text-sm uppercase tracking-[0.25em] text-black/60">BUONO</div>
              <h1 className="mt-2 text-3xl font-semibold">Hero Görsel (placeholder)</h1>
              <p className="mt-2 text-black/60">Sanity bağlayınca buraya gerçek görsel gelecek.</p>
            </div>
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="mt-10">
        <h2 className="vakko-title text-3xl md:text-4xl">HAKKIMIZDA</h2>
        <p className="mt-4 vakko-body text-[15px] md:text-[17px]">
          {home.aboutText ?? 'Hakkımızda metni (placeholder).'}
        </p>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="vakko-title text-3xl md:text-4xl">
            {home.featuredTitle?.trim() ? home.featuredTitle : 'ÖNE ÇIKANLAR'}
          </h2>
        </div>

        <FeaturedProductsCarousel products={home.featuredProducts ?? []} />
      </section>
    </div>
  );
}
