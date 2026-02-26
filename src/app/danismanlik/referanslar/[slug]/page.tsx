import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReferenceBySlug } from '@/content';
import OrganizationImageCarousel from '@/components/organization/OrganizationImageCarousel';

export default async function ReferenceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const item = getReferenceBySlug(slug);
  if (!item) return notFound();

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
            <Link href="/danismanlik/referanslar" className="hover:text-black/80 transition">
              REFERANSLAR
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li className="text-black/70">{item.title.toUpperCase()}</li>
        </ol>
      </nav>

      <h1 className="mt-6 vakko-title text-3xl md:text-4xl">{item.title.toUpperCase()}</h1>

      <div className="mt-6">
        <OrganizationImageCarousel images={item.images} />
      </div>

      <div className="mt-8">
        <p>{item.body}</p>
      </div>
    </div>
  );
}
