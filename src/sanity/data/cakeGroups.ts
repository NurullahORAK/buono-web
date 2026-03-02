import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { CakeGroup, Product } from '@/content/types';

type SanityCakeGroupRow = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string | null;
  products?: Array<{
    _id: string;
    name: string;
    slug: string;
    short?: string;
    details?: string;
    tags?: string[];
    categorySlug?: string;
    images?: (string | null)[];
  }>;
};

const cakeGroupsQuery = groq`
*[_type=="cakeGroup" && active==true]
| order(order asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "imageUrl": image.asset->url
}
`;

const cakeGroupBySlugQuery = groq`
*[_type=="cakeGroup" && active==true && slug.current==$slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  "imageUrl": image.asset->url,
  "products": products[]->{
    _id,
    name,
    "slug": slug.current,
    short,
    details,
    tags,
    "categorySlug": category->slug.current,
    "images": images[].asset->url
  }
}
`;

function mapProduct(p: NonNullable<SanityCakeGroupRow['products']>[number]): Product {
  const imgs = (p.images ?? []).filter((x): x is string => Boolean(x));
  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    short: p.short ?? '',
    details: p.details ?? '',
    tags: p.tags ?? [],
    categorySlug: p.categorySlug ?? 'pasta',
    images: imgs,
    image: imgs[0],
  };
}

function mapCakeGroup(row: SanityCakeGroupRow): CakeGroup {
  return {
    id: row._id,
    slug: row.slug,
    title: row.title,
    image: row.imageUrl ?? undefined,
    description: row.description ?? '',
    products: (row.products ?? []).map(mapProduct),
  };
}

export async function fetchCakeGroups(): Promise<
  Array<Pick<CakeGroup, 'id' | 'slug' | 'title' | 'image' | 'description'>>
> {
  const rows = await client.fetch<SanityCakeGroupRow[]>(cakeGroupsQuery);
  return rows.map((r) => ({
    id: r._id,
    slug: r.slug,
    title: r.title,
    image: r.imageUrl ?? undefined,
    description: r.description ?? '',
  }));
}

export async function fetchCakeGroupBySlug(slug: string): Promise<CakeGroup | null> {
  const row = await client.fetch<SanityCakeGroupRow | null>(cakeGroupBySlugQuery, { slug });
  if (!row) return null;
  return mapCakeGroup(row);
}
