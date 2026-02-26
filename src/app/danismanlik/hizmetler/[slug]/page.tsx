import Link from 'next/link';
import { notFound } from 'next/navigation';
import { config } from '@/lib/config';
import { getConsultingServiceBySlug } from '@/content';
import OrganizationImageCarousel from '@/components/organization/OrganizationImageCarousel';

export default async function ConsultingServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = getConsultingServiceBySlug(slug);
  if (!item) return notFound();

  const msg = `Merhaba, ${config.brandName} için "${item.title}" hizmeti hakkında bilgi almak istiyorum.`;
  const wa = `https://wa.me/${config.whatsappPhoneE164.replace('+', '')}?text=${encodeURIComponent(msg)}`;

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
            <Link href="/kategori/danismanlik" className="hover:text-black/80 transition">
              DANIŞMANLIK
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li>
            <Link href="/danismanlik/hizmetler" className="hover:text-black/80 transition">
              HİZMETLER
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li className="text-black/70">{item.title.toUpperCase()}</li>
        </ol>
      </nav>

      {/* Tek kolon: referans sayfası gibi */}
      <section className="mt-6 rounded-2xl border border-black/10 p-6">
        {/* TAM GENİŞ SLIDER */}
        <div className="rounded-2xl overflow-hidden bg-black/5">
          <OrganizationImageCarousel images={item.images} />
        </div>

        {/* ALTTA YAZILAR */}
        <div className="mt-10 max-w-3xl">
          <h1 className="vakko-title text-3xl md:text-4xl">{item.title}</h1>
          <p className="mt-4 text-black/70 leading-relaxed">{item.short}</p>

          <div className="mt-10 border-t border-black/10 pt-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-black/50">
              HİZMET DETAYI
            </div>
            <p className="mt-3 text-black/70 leading-relaxed">
              {item.body ?? 'Detay metni (placeholder). Sanity bağlanınca şef dolduracak.'}
            </p>

            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center bg-black text-white px-6 py-3 text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
            >
              Bilgi Al
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
