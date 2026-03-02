import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { HeroSlide, ConsultingService, ReferenceItem } from '@/content/types';

type ConsultingPageRow = {
  heroSlides?: Array<{ title?: string; imageUrl?: string | null }>;
  entryCards?: Array<{ title: string; desc: string; href: string; imageUrl?: string | null }>;
};

const consultingPageQuery = groq`
*[_type=="consultingPage" && _id=="consultingPage"][0]{
  "heroSlides": heroSlides[]{
    title,
    "imageUrl": image.asset->url
  },
  "entryCards": entryCards[]{
    title,
    desc,
    href,
    "imageUrl": image.asset->url
  }
}
`;

export async function fetchConsultingHeroSlides(): Promise<HeroSlide[]> {
  const row = await client.fetch<ConsultingPageRow | null>(consultingPageQuery);
  const slides = row?.heroSlides ?? [];
  return slides
    .filter((s) => !!s.imageUrl)
    .map((s, idx) => ({
      id: `c${idx}`,
      title: s.title ?? undefined,
      image: s.imageUrl ?? undefined,
    }));
}

const servicesQuery = groq`
*[_type=="consultingService" && active==true]
| order(order asc, _createdAt desc) {
  _id, title, "slug": slug.current, short, body,
  "images": images[].asset->url
}
`;

const serviceBySlugQuery = groq`
*[_type=="consultingService" && active==true && slug.current==$slug][0]{
  _id, title, "slug": slug.current, short, body,
  "images": images[].asset->url
}
`;

export async function fetchConsultingServices(): Promise<ConsultingService[]> {
  const rows = await client.fetch<any[]>(servicesQuery);
  return rows.map((r) => ({
    id: r._id,
    slug: r.slug,
    title: r.title,
    short: r.short ?? '',
    body: r.body ?? '',
    images: (r.images ?? []).filter(Boolean),
  }));
}

export async function fetchConsultingServiceBySlug(
  slug: string
): Promise<ConsultingService | null> {
  const r = await client.fetch<any | null>(serviceBySlugQuery, { slug });
  if (!r) return null;
  return {
    id: r._id,
    slug: r.slug,
    title: r.title,
    short: r.short ?? '',
    body: r.body ?? '',
    images: (r.images ?? []).filter(Boolean),
  };
}

const referencesQuery = groq`
*[_type=="referenceItem" && active==true]
| order(order asc, _createdAt desc) {
  _id, title, "slug": slug.current, body,
  "images": images[].asset->url
}
`;

const referenceBySlugQuery = groq`
*[_type=="referenceItem" && active==true && slug.current==$slug][0]{
  _id, title, "slug": slug.current, body,
  "images": images[].asset->url
}
`;

export async function fetchReferences(): Promise<ReferenceItem[]> {
  const rows = await client.fetch<any[]>(referencesQuery);
  return rows.map((r) => ({
    id: r._id,
    slug: r.slug,
    title: r.title,
    body: r.body ?? '',
    images: (r.images ?? []).filter(Boolean),
  }));
}

export async function fetchReferenceBySlug(slug: string): Promise<ReferenceItem | null> {
  const r = await client.fetch<any | null>(referenceBySlugQuery, { slug });
  if (!r) return null;
  return {
    id: r._id,
    slug: r.slug,
    title: r.title,
    body: r.body ?? '',
    images: (r.images ?? []).filter(Boolean),
  };
}

export type ConsultingEntryCardData = {
  title: string;
  desc: string;
  href: string;
  imageUrl?: string | null;
};

export async function fetchConsultingPage(): Promise<{
  slides: HeroSlide[];
  entryCards: ConsultingEntryCardData[];
}> {
  const row = await client.fetch<any | null>(consultingPageQuery);

  const slides: HeroSlide[] = (row?.heroSlides ?? [])
    .filter((s: any) => !!s.imageUrl)
    .map((s: any, idx: number) => ({
      id: `c${idx}`,
      title: s.title ?? undefined,
      image: s.imageUrl ?? undefined,
    }));

  const entryCards: ConsultingEntryCardData[] = (row?.entryCards ?? []).map((c: any) => ({
    title: c.title,
    desc: c.desc,
    href: c.href,
    imageUrl: c.imageUrl ?? null,
  }));

  return { slides, entryCards };
}
