import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export type CategoryPageData = {
  label: string;
  slug: string;
  description?: string;
  heroImageUrl?: string | null;
  filterTags?: string[];
};

const categoryPageQuery = groq`
*[_type=="category" && slug.current==$slug][0]{
  label,
  "slug": slug.current,
  description,
  filterTags,
  "heroImageUrl": heroImage.asset->url
}
`;

export async function fetchCategoryPage(slug: string): Promise<CategoryPageData | null> {
  const row = await client.fetch<CategoryPageData | null>(categoryPageQuery, { slug });
  return row ?? null;
}
