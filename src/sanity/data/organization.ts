import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { HeroSlide, OrganizationType } from '@/content/types';

type OrgPageRow = {
  heroSlides?: Array<{ title?: string; imageUrl?: string | null }>;
};

const orgPageQuery = groq`
*[_type=="organizationPage" && _id=="organizationPage"][0]{
  "heroSlides": heroSlides[]{
    title,
    "imageUrl": image.asset->url
  }
}
`;

const orgTypesQuery = groq`
*[_type=="organizationType" && active==true]
| order(order asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  short,
  body,
  "images": images[].asset->url
}
`;

const orgTypeBySlugQuery = groq`
*[_type=="organizationType" && active==true && slug.current==$slug][0]{
  _id,
  title,
  "slug": slug.current,
  short,
  body,
  "images": images[].asset->url
}
`;

export async function fetchOrganizationTypeBySlug(slug: string): Promise<OrganizationType | null> {
  const row = await client.fetch<any | null>(orgTypeBySlugQuery, { slug });
  if (!row) return null;

  return {
    id: row._id,
    slug: row.slug,
    title: row.title,
    short: row.short ?? '',
    body: row.body ?? '',
    images: (row.images ?? []).filter(Boolean),
  };
}

export async function fetchOrganizationHeroSlides(): Promise<HeroSlide[]> {
  const row = await client.fetch<OrgPageRow | null>(orgPageQuery);
  const slides = row?.heroSlides ?? [];

  return slides
    .filter((s) => !!s.imageUrl)
    .map((s, idx) => ({
      id: String(idx),
      title: s.title ?? undefined,
      image: s.imageUrl ?? undefined,
    }));
}

export async function fetchOrganizationTypes(): Promise<OrganizationType[]> {
  const rows = await client.fetch<any[]>(orgTypesQuery);

  return rows.map((r) => ({
    id: r._id,
    slug: r.slug,
    title: r.title,
    short: r.short ?? '',
    body: r.body ?? '',
    images: (r.images ?? []).filter(Boolean),
  }));
}
