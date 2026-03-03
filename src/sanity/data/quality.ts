// src/sanity/data/quality.ts
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export type QualitySlide = {
  kind: 'certificate' | 'photo';
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  alt?: string | null;
};

export type QualityPageData = {
  title: string;
  policyTitle: string;
  policyItems: string[];
  slides: QualitySlide[];
};

const qualityPageQuery = groq`
*[_type=="qualityPage" && _id=="qualityPage"][0]{
  title,
  policyTitle,
  policyItems,
  "slides": slides[]{
    kind,
    title,
    description,
    "imageUrl": image.asset->url,
    "alt": image.alt
  }
}
`;

export async function fetchQualityPage(): Promise<QualityPageData | null> {
  const row = await client.fetch<QualityPageData | null>(qualityPageQuery);
  return row ?? null;
}
