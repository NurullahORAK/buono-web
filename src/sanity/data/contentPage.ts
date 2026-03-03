// src/sanity/data/contentPage.ts
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export type ContentPageData = {
  title: string;
  slug: string;
  summary?: string | null;
  body: string;
  heroImageUrl?: string | null;
  heroAlt?: string | null;
};

const contentPageBySlugQuery = groq`
*[_type=="contentPage" && active==true && slug.current==$slug][0]{
  title,
  "slug": slug.current,
  summary,
  body,
  "heroImageUrl": heroImage.asset->url,
  "heroAlt": heroImage.alt
}
`;

export async function fetchContentPageBySlug(slug: string): Promise<ContentPageData | null> {
  const row = await client.fetch<ContentPageData | null>(contentPageBySlugQuery, { slug });
  return row ?? null;
}
