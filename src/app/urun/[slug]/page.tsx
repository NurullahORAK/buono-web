import { notFound } from 'next/navigation';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { getProductBySlug, getCategories } from '@/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductImageCarousel from '@/components/product/ProductImageCarousel';
import Accordion from '@/components/Accordion';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const category = getCategories().find((c) => c.slug === product.categorySlug);

  const isGiftBox = product.categorySlug === 'hediye-paketleri';

  const siteUrl = 'http://localhost:3000';

  const message = isGiftBox
    ? `Merhaba, ${product.name} hediye paketini kişiselleştirmek istiyorum. İçerik/renk/not detaylarını paylaşabilir misiniz? Link: ${siteUrl}/urun/${product.slug}`
    : `Merhaba, ${product.name} için stok/fiyat bilgisi rica ediyorum. Link: ${siteUrl}/urun/${product.slug}`;

  const wa = buildWhatsAppUrl(config.whatsappPhoneE164, message);
  const categoryHref = category
    ? category.slug === 'hediye-paketleri'
      ? '/hediye-paketleri'
      : `/kategori/${category.slug}`
    : null;
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'BUONO', href: '/' },
          ...(category ? [{ label: category.label, href: categoryHref! }] : []),
          { label: product.name },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 pb-24">
        <div className="mt-6 grid gap-10 md:grid-cols-2 min-w-0">
          {/* ✅ Çoklu görsel carousel */}
          <ProductImageCarousel
            images={(product.images ?? []).map((src, idx) => ({
              src: src.startsWith('http') || src.startsWith('/') ? src : undefined,
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
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center w-[220px] bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.16em] hover:opacity-90 transition"
            >
              {isGiftBox ? 'KİŞİSELLEŞTİR' : 'SİPARİŞ VER'}
            </a>

            <div className="mt-8">
              <div className="mt-8">
                <Accordion title="Ürün Bilgileri" defaultOpen>
                  Ürün bilgisi metni (placeholder). Sanity bağlayınca şef buraya tek parça halinde
                  yazacak.
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
