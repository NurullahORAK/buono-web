import Link from 'next/link';
import { config } from '@/lib/config';

const categoryHref = (slug: string) => {
  if (slug === 'hediye-paketleri') return '/hediye-paketleri';
  if (slug === 'pasta') return '/pasta';
  return `/kategori/${slug}`;
};

export default function CategoryBadgesSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {config.categories.map((c) => (
              <Link
                key={c.slug}
                href={categoryHref(c.slug)}
                className="group"
                aria-label={`${c.label} kategorisine git`}
              >
                <div className="relative rounded-[26px] border border-black/25 px-10 py-6 text-center">
                  {/* İç çerçeve (premium hissi) */}
                  <div className="pointer-events-none absolute inset-[6px] rounded-[20px] border border-black/15" />

                  <div className="relative">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-black/60">
                      BUONO
                    </div>
                    <div className="mt-2 text-[18px] font-semibold tracking-wide">{c.label}</div>
                    <div className="mt-2 text-[12px] uppercase tracking-[0.18em] text-black/50">
                      Keşfet
                    </div>
                  </div>
                </div>

                <div className="mt-2 h-[1px] w-full origin-left scale-x-0 bg-[color:var(--gold)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
