'use client';

import Link from 'next/link';

export default function ConsultingEntryCard({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-black/10 p-4 hover:border-black/25 transition"
    >
      <div className="h-44 rounded-2xl bg-black/5 border border-black/10" />
      <div className="mt-4 font-medium">{title}</div>
      <div className="mt-1 text-sm text-black/60">{desc}</div>
    </Link>
  );
}
