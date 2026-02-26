import Link from 'next/link';
import { getFeaturedProducts } from '@/content';
import CategoryBadgesSection from '@/components/home/CategoryBadgesSection';
import FeaturedProductsCarousel from '@/components/home/FeaturedProductsCarousel';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="h-[360px] w-full rounded-2xl border border-black/10 bg-black/5 grid place-items-center">
        <div className="text-center">
          <div className="text-sm uppercase tracking-[0.25em] text-black/60">BUONO</div>
          <h1 className="mt-2 text-3xl font-semibold">Hero Görsel (placeholder)</h1>
          <p className="mt-2 text-black/60">Sanity bağlayınca buraya gerçek görsel gelecek.</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mt-10">
        <h2 className="vakko-title text-3xl md:text-4xl">HAKKIMIZDA</h2>
        <p className="mt-4 vakko-body text-[15px] md:text-[17px]">
          Hakkımızda metni (placeholder). Sanity bağlayınca şef burayı panelden dolduracak.
        </p>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="vakko-title text-3xl md:text-4xl">ÖNE ÇIKANLAR</h2>
        </div>

        {/* ✅ 3’lü slider */}
        <FeaturedProductsCarousel products={featured} />
      </section>

      {/* ✅ Ürünlerin altına: Sipariş Hattı + Kategoriler (footer üstü) */}
    </div>
  );
}
