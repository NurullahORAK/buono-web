import ProductionGallery from '@/components/production/ProductionGallery';
import { getProductionCenterItems } from '@/content';
import ChefCarousel, { ChefItem } from '@/components/production/ChefCarousel';

export default function ProductionCenterPage() {
  const items = getProductionCenterItems();

  const chefs: ChefItem[] = [
    {
      id: 'c1',
      title: 'Chef A (placeholder)',
      description: 'Açıklama (placeholder). Sanity bağlanınca şef dolduracak.',
      images: [{ src: '/placeholders/chef1.jpg', alt: 'Chef A' }],
    },
    {
      id: 'c2',
      title: 'Chef B (placeholder)',
      description: 'Açıklama (placeholder). Sanity bağlanınca şef dolduracak.',
      images: [{ src: '/placeholders/chef2.jpg', alt: 'Chef B' }],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="vakko-title text-3xl md:text-4xl">Buono Üretim Merkezi</h1>

      <p className="mx-auto mt-4 max-w-3xl text-center text-black/60 leading-relaxed">
        Üretim süreçlerimiz ve kalite yaklaşımımız. (placeholder)
      </p>

      {/* ✅ Şefler: Slider component */}
      <section className="mt-12">
        <div className="mt-6">
          <ChefCarousel items={chefs} title="Şefler" />
        </div>
      </section>

      {/* Üretim Galerisi */}
      <section className="mt-12">
        <ProductionGallery items={items} />
      </section>
    </div>
  );
}
