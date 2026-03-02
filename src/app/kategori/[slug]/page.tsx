import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import CategoryProductsClient from '@/components/category/CategoryProductsClient';
import { fetchCategoryPage } from '@/sanity/data/categoryPage';
import { fetchProductsByCategorySlug } from '@/sanity/data/products';

import OrganizationHeroCarousel from '@/components/organization/OrganizationHeroCarousel';
import OrganizationTypeGrid from '@/components/organization/OrganizationTypeGrid';
import { fetchOrganizationHeroSlides, fetchOrganizationTypes } from '@/sanity/data/organization';

import ConsultingEntryCard from '@/components/consulting/ConsultingEntryCard';
import { fetchConsultingPage } from '@/sanity/data/consulting';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // özel sayfalara yönlendirme
  if (slug === 'pasta') redirect('/pasta');
  if (slug === 'hediye-paketleri') redirect('/hediye-paketleri');

  const isOrg = slug === 'organizasyon';
  const isConsulting = slug === 'danismanlik';

  // ✅ ORGANİZASYON
  if (isOrg) {
    const orgSlides = await fetchOrganizationHeroSlides();
    const orgTypes = await fetchOrganizationTypes();

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
            <li className="text-black/70">ORGANİZASYON</li>
          </ol>
        </nav>

        <section className="mt-6">
          <OrganizationHeroCarousel slides={orgSlides} />
        </section>

        <section className="mt-10">
          <h2 className="vakko-title text-2xl md:text-3xl">ORGANİZASYON ÇEŞİTLERİ</h2>
          <div className="mt-6">
            <OrganizationTypeGrid items={orgTypes} />
          </div>
        </section>
      </div>
    );
  }

  // ✅ DANIŞMANLIK (slider + 2 kart Sanity’den)
  if (isConsulting) {
    const { slides: consultingSlides, entryCards } = await fetchConsultingPage();

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
            <li className="text-black/70">DANIŞMANLIK</li>
          </ol>
        </nav>

        <section className="mt-6">
          <OrganizationHeroCarousel slides={consultingSlides} />
        </section>

        <section className="mt-10">
          <h2 className="vakko-title text-2xl md:text-3xl">DANIŞMANLIK</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {entryCards.map((c) => (
              <ConsultingEntryCard
                key={c.href}
                href={c.href}
                title={c.title}
                desc={c.desc}
                image={c.imageUrl ?? undefined}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ✅ NORMAL KATEGORİLER
  const category = await fetchCategoryPage(slug);
  if (!category) return notFound();

  const products = await fetchProductsByCategorySlug(slug);

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
          <li className="text-black/70">{category.label}</li>
        </ol>
      </nav>

      <section className="mt-6 grid gap-6 rounded-2xl border border-black/10 p-6 md:grid-cols-2 overflow-hidden">
        <div className="h-[260px] rounded-2xl bg-black/5 overflow-hidden">
          {category.heroImageUrl ? (
            <div className="relative h-full w-full">
              <Image
                src={category.heroImageUrl}
                alt={category.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
                priority
              />
            </div>
          ) : (
            <div className="h-full w-full grid place-items-center text-black/50">
              Kategori Görsel (placeholder)
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <h1 className="text-3xl font-semibold break-words">{category.label}</h1>
          <p className="mt-2 text-black/70 leading-relaxed break-words">
            {category.description ??
              'Kısa açıklama (placeholder). Sanity bağlayınca şef burayı panelden dolduracak.'}
          </p>
        </div>
      </section>

      <CategoryProductsClient
        products={products}
        categorySlug={slug}
        filterTags={category.filterTags ?? []}
      />
    </div>
  );
}
