import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getCategories, getProductsByCategorySlug } from '@/content';
import CategoryProductsClient from '@/components/category/CategoryProductsClient';

import { getOrganizationHeroSlides, getOrganizationTypes } from '@/content';
import OrganizationHeroCarousel from '@/components/organization/OrganizationHeroCarousel';
import OrganizationTypeGrid from '@/components/organization/OrganizationTypeGrid';

import { getConsultingHeroSlides } from '@/content';
import ConsultingEntryCard from '@/components/consulting/ConsultingEntryCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // özel sayfalara yönlendirme
  if (slug === 'pasta') redirect('/pasta');
  if (slug === 'hediye-paketleri') redirect('/hediye-paketleri');

  const category = getCategories().find((c) => c.slug === slug);
  if (!category) return notFound();

  const products = getProductsByCategorySlug(slug);

  const isOrg = slug === 'organizasyon';
  const isConsulting = slug === 'danismanlik';

  const orgSlides = isOrg ? getOrganizationHeroSlides() : [];
  const orgTypes = isOrg ? getOrganizationTypes() : [];

  const consultingSlides = isConsulting ? getConsultingHeroSlides() : [];

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
          <li className="text-black/70">{category.label}</li>
        </ol>
      </nav>

      {/* Kategori üst tanıtım */}
      {isOrg ? (
        <section className="mt-6">
          <OrganizationHeroCarousel slides={orgSlides} />
        </section>
      ) : isConsulting ? (
        <section className="mt-6">
          <OrganizationHeroCarousel slides={consultingSlides} />
        </section>
      ) : (
        <section className="mt-6 grid gap-6 rounded-2xl border border-black/10 p-6 md:grid-cols-2 overflow-hidden">
          <div className="h-[260px] rounded-2xl bg-black/5 grid place-items-center text-black/50">
            Kategori Görsel (placeholder)
          </div>

          <div className="flex flex-col justify-center min-w-0">
            <h1 className="text-3xl font-semibold break-words">{category.label}</h1>

            <p className="mt-2 text-black/70 leading-relaxed break-words">
              {category.description ??
                'Kısa açıklama (placeholder). Sanity bağlayınca şef burayı panelden dolduracak.'}
            </p>
          </div>
        </section>
      )}

      {/* İçerik alanı */}
      {isOrg ? (
        <section className="mt-10">
          <h2 className="vakko-title text-2xl md:text-3xl">ORGANİZASYON ÇEŞİTLERİ</h2>
          <div className="mt-6">
            <OrganizationTypeGrid items={orgTypes} />
          </div>
        </section>
      ) : isConsulting ? (
        <section className="mt-10">
          <h2 className="vakko-title text-2xl md:text-3xl">DANIŞMANLIK</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ConsultingEntryCard
              href="/danismanlik/hizmetler"
              title="Hizmet Detayı"
              desc="Danışmanlık hizmetlerini incele."
            />
            <ConsultingEntryCard
              href="/danismanlik/referanslar"
              title="Referanslar"
              desc="Çalışmalar ve iş ortakları."
            />
          </div>
        </section>
      ) : (
        <CategoryProductsClient products={products} categorySlug={slug} />
      )}
    </div>
  );
}
