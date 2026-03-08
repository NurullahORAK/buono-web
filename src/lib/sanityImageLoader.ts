import type { ImageLoader } from 'next/image';

export const sanityImageLoader: ImageLoader = ({ src, width, quality }) => {
  // src zaten Sanity CDN url: https://cdn.sanity.io/images/...
  // Sanity Image API query param'ları:
  // w = width, q = quality, auto=format => webp/avif gibi uygun formata çevirir
  const url = new URL(src);
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'max');
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  return url.toString();
};
