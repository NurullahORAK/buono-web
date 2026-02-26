import Link from 'next/link';

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-5">
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.18em] text-black/55"
      >
        <ol className="flex flex-wrap items-center gap-2 min-w-0">
          {items.map((c, idx) => (
            <li key={`${c.label}-${idx}`} className="flex items-center min-w-0">
              {idx > 0 ? <span className="mx-2 text-black/35">›</span> : null}

              {c.href ? (
                <Link
                  href={c.href}
                  className="hover:text-black transition break-words [overflow-wrap:anywhere]"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-black/70 break-words [overflow-wrap:anywhere]">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
