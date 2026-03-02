// src/sanity/data/products.ts
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { Product } from '@/content/types';

export type ProductWithCategory = Product & { categoryLabel?: string };

type SanityProductRow = {
  _id: string;
  name: string;
  slug: string;
  short?: string;
  details?: string;
  tags?: string[];
  categorySlug: string;
  categoryLabel?: string;
  images?: (string | null)[];
};

const searchProductsQuery = groq`
*[_type=="product" && active==true]{
  _id, name, "slug": slug.current, short, details, tags,
  "image": image.asset->url,
  "images": images[].asset->url,
  "categorySlug": category->slug.current,
  "categoryLabel": category->label
}
`;

const productsByCategoryQuery = groq`
*[_type=="product" && active==true && category->slug.current==$slug]
| order(order asc, _createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  short,
  details,
  tags,
  "categorySlug": category->slug.current,
  "images": images[].asset->url
}
`;

const productBySlugQuery = groq`
*[_type=="product" && active==true && slug.current==$slug][0]{
  _id,
  name,
  "slug": slug.current,
  short,
  details,
  tags,
  "categorySlug": category->slug.current,
  "categoryLabel": category->label,
  "images": images[].asset->url
}
`;

function mapRowToProduct(row: SanityProductRow): Product {
  const imgs = (row.images ?? []).filter((x): x is string => Boolean(x));
  return {
    id: row._id,
    name: row.name,
    slug: row.slug,
    short: row.short ?? '',
    details: row.details ?? '',
    tags: row.tags ?? [],
    categorySlug: row.categorySlug,
    images: imgs,
    image: imgs[0],
  };
}

export async function fetchAllSearchProducts() {
  const rows = await client.fetch<any[]>(searchProductsQuery);
  return rows.map((p) => ({
    id: p._id,
    name: p.name,
    slug: p.slug,
    short: p.short ?? '',
    details: p.details ?? '',
    tags: p.tags ?? [],
    image: p.image ?? undefined,
    images: (p.images ?? []).filter(Boolean),
    categorySlug: p.categorySlug ?? '',
    categoryLabel: p.categoryLabel ?? undefined,
  }));
}

export async function fetchProductsByCategorySlug(slug: string): Promise<Product[]> {
  const rows = await client.fetch<SanityProductRow[]>(productsByCategoryQuery, { slug });
  return rows.map(mapRowToProduct);
}

export async function fetchProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const row = await client.fetch<SanityProductRow | null>(productBySlugQuery, { slug });
  if (!row) return null;
  return { ...mapRowToProduct(row), categoryLabel: row.categoryLabel };
}
