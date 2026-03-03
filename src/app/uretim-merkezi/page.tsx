import { notFound } from 'next/navigation';
import { fetchProductionCenterPage } from '@/sanity/data/productionCenter';
import ChefCarousel, { type ChefItem } from '@/components/production/ChefCarousel';
import ProductionGallery from '@/components/production/ProductionGallery';

export const revalidate = 60;

export default async function ProductionCenterPage() {
  const data = await fetchProductionCenterPage();
  if (!data) return notFound();

  const chefs: ChefItem[] = data.chefs.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description ?? '',
    images: (c.images ?? []).map((img) => ({ src: img.src, alt: img.alt ?? undefined })),
  }));

  const items = data.gallerySections.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description ?? '',
    images: (s.images ?? []).map((img) => ({ src: img.src, alt: img.alt ?? undefined })),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="vakko-title text-3xl md:text-4xl">{data.title}</h1>

      {data.intro ? (
        <p className="mx-auto mt-4 max-w-3xl text-center text-black/60 leading-relaxed">
          {data.intro}
        </p>
      ) : null}

      <section className="mt-12">
        <div className="mt-6">
          <ChefCarousel items={chefs} title="Şefler" />
        </div>
      </section>

      <section className="mt-12">
        <ProductionGallery items={items} />
      </section>
    </div>
  );
}
