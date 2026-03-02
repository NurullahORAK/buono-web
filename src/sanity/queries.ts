import { groq } from 'next-sanity';

export const giftBoxesPageQuery = groq`
*[_type=="giftBoxesPage" && _id=="giftBoxesPage"][0]{
  title,
  intro,
  heroImage{
    ...,
    alt
  }
}
`;
