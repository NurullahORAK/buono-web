import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

type Img = { src: string; alt?: string | null };

export type ProductionCenterData = {
  title: string;
  intro?: string | null;
  chefs: Array<{ id: string; title: string; description?: string | null; images: Img[] }>;
  gallerySections: Array<{ id: string; title: string; description?: string | null; images: Img[] }>;
};

const query = groq`
*[_type=="productionCenterPage" && _id=="productionCenterPage"][0]{
  title,
  intro,

  "chefs": chefs[]{
    "_id": _key,
    title,
    description,
    "images": images[]{
      "src": asset->url,
      "alt": alt
    }
  },

  "gallerySections": gallerySections[]{
    "_id": _key,
    title,
    description,
    "images": images[]{
      "src": asset->url,
      "alt": alt
    }
  }
}
`;

export async function fetchProductionCenterPage(): Promise<ProductionCenterData | null> {
  const row = await client.fetch<any | null>(query);
  if (!row) return null;

  return {
    title: row.title,
    intro: row.intro ?? null,
    chefs: (row.chefs ?? []).map((c: any) => ({
      id: c._id,
      title: c.title,
      description: c.description ?? null,
      images: (c.images ?? []).filter(Boolean),
    })),
    gallerySections: (row.gallerySections ?? []).map((s: any) => ({
      id: s._id,
      title: s.title,
      description: s.description ?? null,
      images: (s.images ?? []).filter(Boolean),
    })),
  };
}
