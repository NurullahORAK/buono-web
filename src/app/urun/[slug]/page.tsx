import { notFound } from 'next/navigation';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductImageCarousel from '@/components/product/ProductImageCarousel';
import Accordion from '@/components/Accordion';
import { categoryHref } from '@/lib/routes';

import { fetchProductBySlug } from '@/sanity/data/products';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await fetchProductBySlug(slug);
  if (!product) return notFound();

  const isGiftBox = product.categorySlug === 'hediye-paketleri';

  // ✅ Breadcrumb için (category reference Sanity'den geliyor)
  const catHref = categoryHref(product.categorySlug);
  const categoryLabel = product.categoryLabel ?? product.categorySlug;

  const siteUrl = 'http://localhost:3000';

  const message = isGiftBox
    ? `Merhaba, ${product.name} hediye paketini kişiselleştirmek istiyorum. İçerik/renk/not detaylarını paylaşabilir misiniz? Link: ${siteUrl}/urun/${product.slug}`
    : `Merhaba, ${product.name} için stok/fiyat bilgisi rica ediyorum. Link: ${siteUrl}/urun/${product.slug}`;

  const wa = buildWhatsAppUrl(config.whatsappPhoneE164, message);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'BUONO', href: '/' },
          { label: categoryLabel, href: catHref },
          { label: product.name },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 pb-24">
        <div className="mt-6 grid gap-10 md:grid-cols-2 min-w-0">
          <ProductImageCarousel
            images={(product.images ?? []).map((src, idx) => ({
              src: src?.startsWith('http') || src?.startsWith('/') ? src : undefined,
              alt: `${product.name} - ${idx + 1}`,
            }))}
            fallbackCount={product.images?.length ?? 3}
          />

          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight break-words [overflow-wrap:anywhere]">
              {product.name}
            </h1>

            <p className="mt-4 text-black/70 leading-relaxed break-words [overflow-wrap:anywhere]">
              {product.short}
            </p>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center w-[220px] bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.16em] hover:opacity-90 transition"
            >
              {isGiftBox ? 'KİŞİSELLEŞTİR' : 'SİPARİŞ VER'}
            </a>

            <div className="mt-8">
              <Accordion title="Ürün Bilgileri" defaultOpen>
                {product.details || 'Ürün bilgisi yakında eklenecek.'}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
