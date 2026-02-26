import Link from 'next/link';
import type { CakeGroup } from '@/content/types';
import Image from 'next/image';

export default function CakeGroupNav({
  groups,
  activeSlug,
}: {
  groups: CakeGroup[];
  activeSlug?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {groups.map((g) => {
        const active = g.slug === activeSlug;
        return (
          <Link
            key={g.id}
            href={`/pasta/${g.slug}`}
            className={[
              'block text-left rounded-2xl border p-4 transition',
              active ? 'border-black/40' : 'border-black/10 hover:border-black/25',
            ].join(' ')}
          >
            <div className="relative w-full pb-[100%] rounded-xl overflow-hidden bg-black/5">
              {g.image ? (
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-black/40">
                  Görsel (placeholder)
                </div>
              )}
            </div>
            <div className="mt-3 font-medium">{g.title}</div>
          </Link>
        );
      })}
    </div>
  );
}
