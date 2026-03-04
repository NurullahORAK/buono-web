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

type ConsultingServiceRow = {
  _id: string;
  title: string;
  slug: string;
  short?: string | null;
  body?: unknown;
  images?: Array<string | null>;
};

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

type ReferenceRow = {
  _id: string;
  title: string;
  slug: string;
  body?: unknown;
  images?: Array<string | null>;
};

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

function toTextBody(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function toImages(v: Array<string | null> | undefined): string[] {
  return (v ?? []).filter((x): x is string => Boolean(x));
}

export async function fetchConsultingHeroSlides(): Promise<HeroSlide[]> {
  const row = await client.fetch<ConsultingPageRow | null>(consultingPageQuery);
  const slides = row?.heroSlides ?? [];
  return slides
    .filter((s) => Boolean(s.imageUrl))
    .map((s, idx) => ({
      id: `c${idx}`,
      title: s.title ?? undefined,
      image: s.imageUrl ?? undefined,
    }));
}

export async function fetchConsultingServices(): Promise<ConsultingService[]> {
  const rows = await client.fetch<ConsultingServiceRow[]>(servicesQuery);
  return rows.map((r) => ({
    id: r._id,
    slug: r.slug,
    title: r.title,
    short: r.short ?? '',
    body: toTextBody(r.body),
    images: toImages(r.images),
  }));
}

export async function fetchConsultingServiceBySlug(
  slug: string
): Promise<ConsultingService | null> {
  const r = await client.fetch<ConsultingServiceRow | null>(serviceBySlugQuery, { slug });
  if (!r) return null;

  return {
    id: r._id,
    slug: r.slug,
    title: r.title,
    short: r.short ?? '',
    body: toTextBody(r.body),
    images: toImages(r.images),
  };
}

export async function fetchReferences(): Promise<ReferenceItem[]> {
  const rows = await client.fetch<ReferenceRow[]>(referencesQuery);
  return rows.map((r) => ({
    id: r._id,
    slug: r.slug,
    title: r.title,
    body: toTextBody(r.body),
    images: toImages(r.images),
  }));
}

export async function fetchReferenceBySlug(slug: string): Promise<ReferenceItem | null> {
  const r = await client.fetch<ReferenceRow | null>(referenceBySlugQuery, { slug });
  if (!r) return null;

  return {
    id: r._id,
    slug: r.slug,
    title: r.title,
    body: toTextBody(r.body),
    images: toImages(r.images),
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
  const row = await client.fetch<ConsultingPageRow | null>(consultingPageQuery);

  const slides: HeroSlide[] = (row?.heroSlides ?? [])
    .filter((s) => Boolean(s.imageUrl))
    .map((s, idx) => ({
      id: `c${idx}`,
      title: s.title ?? undefined,
      image: s.imageUrl ?? undefined,
    }));

  const entryCards: ConsultingEntryCardData[] = (row?.entryCards ?? []).map((c) => ({
    title: c.title,
    desc: c.desc,
    href: c.href,
    imageUrl: c.imageUrl ?? null,
  }));

  return { slides, entryCards };
}
