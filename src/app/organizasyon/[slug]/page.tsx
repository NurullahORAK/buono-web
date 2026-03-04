import Link from 'next/link';
import { notFound } from 'next/navigation';
import { config } from '@/lib/config';
import OrganizationImageCarousel from '@/components/organization/OrganizationImageCarousel';
import { fetchOrganizationTypeBySlug } from '@/sanity/data/organization';

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = await fetchOrganizationTypeBySlug(slug);
  if (!item) return notFound();

  const msg = `Merhaba, ${config.brandName} için "${item.title}" organizasyonu hakkında bilgi almak istiyorum.`;
  const wa = `https://wa.me/${config.whatsappPhoneE164.replace('+', '')}?text=${encodeURIComponent(
    msg
  )}`;

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
          <li>
            <Link href="/kategori/organizasyon" className="hover:text-black/80 transition">
              ORGANİZASYON
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li className="text-black/70">{item.title.toUpperCase()}</li>
        </ol>
      </nav>

      <section className="mt-6 grid gap-6 rounded-2xl border border-black/10 p-6 lg:grid-cols-2">
        <OrganizationImageCarousel images={item.images} />

        <div className="flex flex-col justify-center">
          <h1 className="vakko-title text-3xl md:text-4xl">{item.title.toUpperCase()}</h1>

          <p className="mt-4">{item.short}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Bilgi Al
            </a>
            <span className="text-xs text-black/50">Yanıt WhatsApp üzerinden.</span>
          </div>

          <div className="mt-8 h-px w-full bg-black/10" />

          <div className="mt-6">
            <div className="text-[11px] uppercase tracking-[0.16em] text-black/50">
              Organizasyon Bilgisi
            </div>
            <p className="mt-3">{item.body}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
