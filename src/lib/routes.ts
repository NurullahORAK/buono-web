// src/lib/routes.ts
export const categoryHref = (slug: string) => {
  if (slug === 'hediye-paketleri') return '/hediye-paketleri';
  if (slug === 'pasta') return '/pasta'; // özel route (sendeki gibi)
  return `/kategori/${slug}`;
};
