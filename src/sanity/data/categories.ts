import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export async function fetchCategoryFilterTags(slug: string): Promise<string[]> {
  const row = await client.fetch<{ filterTags?: string[] } | null>(
    groq`*[_type=="category" && slug.current==$slug][0]{ filterTags }`,
    { slug }
  );
  return row?.filterTags ?? [];
}
