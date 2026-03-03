import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export type FaqItem = {
  question: string;
  answer: string;
  isWhatsappCta?: boolean | null;
};

export type FaqPageData = {
  title: string;
  sideImageUrl?: string | null;
  sideImageAlt?: string | null;
  items: FaqItem[];
};

const faqQuery = groq`
*[_type=="faqPage" && _id=="faqPage"][0]{
  title,
  "sideImageUrl": sideImage.asset->url,
  "sideImageAlt": sideImage.alt,
  items[]{
    question,
    answer,
    isWhatsappCta
  }
}
`;

export async function fetchFaqPage(): Promise<FaqPageData | null> {
  const row = await client.fetch<FaqPageData | null>(faqQuery);
  return row ?? null;
}
