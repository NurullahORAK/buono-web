import Link from 'next/link';
import Image from 'next/image';

export default function ConsultingEntryCard({
  href,
  title,
  desc,
  image,
}: {
  href: string;
  title: string;
  desc: string;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-black/10 overflow-hidden hover:border-black/25 transition"
    >
      <div className="h-[220px] bg-black/5 relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 520px"
          />
        ) : null}
      </div>

      <div className="p-5">
        <div className="font-medium">{title}</div>
        <div className="mt-1 text-sm text-black/60">{desc}</div>
      </div>
    </Link>
  );
}
