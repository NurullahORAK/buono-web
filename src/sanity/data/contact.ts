import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export type ContactPageData = {
  pageTitle: string;
  heading: string;
  mapEmbedUrl: string;

  businessName: string;
  whatsapp?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  mersisNo?: string | null;
  sicilNo?: string | null;

  infoBoxTitle?: string | null;
  infoLines?: Array<{ icon?: string | null; text: string }>;
};

const q = groq`
*[_type=="contactPage" && _id=="contactPage"][0]{
  pageTitle,
  heading,
  mapEmbedUrl,
  businessName,
  whatsapp,
  phone,
  email,
  address,
  mersisNo,
  sicilNo,
  infoBoxTitle,
  infoLines[]{ icon, text }
}
`;

export async function fetchContactPage(): Promise<ContactPageData | null> {
  const row = await client.fetch<ContactPageData | null>(q);
  return row ?? null;
}
