import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { Product } from '@/content/types';

export type HomePageData = {
  heroImageUrl?: string | null;
  heroAlt?: string | null;
  aboutText?: string | null;
  featuredTitle?: string | null;
  featuredProducts: Product[];
};

const homePageQuery = groq`
*[_type=="homePage" && _id=="homePage"][0]{
  "heroImageUrl": heroImage.asset->url,
  "heroAlt": heroImage.alt,
  aboutText,
  featuredTitle,
  "featuredProducts": featuredProducts[]->{
    _id,
    name,
    "slug": slug.current,
    short,
    details,
    "image": image.asset->url,
    "images": images[].asset->url,
    "categorySlug": category->slug.current,
    "tags": tags
  }
}
`;

export async function fetchHomePage(): Promise<HomePageData> {
  const row = await client.fetch<any | null>(homePageQuery);

  return {
    heroImageUrl: row?.heroImageUrl ?? null,
    heroAlt: row?.heroAlt ?? null,
    aboutText: row?.aboutText ?? null,
    featuredTitle: row?.featuredTitle ?? null,
    featuredProducts: (row?.featuredProducts ?? []).map((p: any) => ({
      id: p._id,
      name: p.name,
      slug: p.slug,
      short: p.short ?? '',
      details: p.details ?? '',
      image: p.image ?? undefined,
      images: (p.images ?? []).filter(Boolean),
      categorySlug: p.categorySlug ?? '',
      tags: p.tags ?? [],
    })),
  };
}
