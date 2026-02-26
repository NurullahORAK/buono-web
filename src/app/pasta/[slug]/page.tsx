import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCakeGroupBySlug } from '@/content';
import CakeProductGrid from '@/components/cake/CakeProductGrid';

export default async function PastaGroupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const group = getCakeGroupBySlug(slug);
  if (!group) return notFound();

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
        {/* açıklama kutusu */}
        <div className="rounded-2xl border border-black/10 p-6">
          <h1 className="vakko-title text-2xl md:text-3xl">{group.title}</h1>
          <p className="mt-3 text-black/70 leading-relaxed">
            {group.description ?? 'Açıklama (placeholder).'}
          </p>
        </div>

        {/* ürünler */}
        <div className="mt-8">
          <CakeProductGrid products={group.products} />
        </div>
      </div>
    </div>
  );
}
