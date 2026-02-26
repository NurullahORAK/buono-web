export type CMSImage = {
  src?: string;
  alt?: string;
};

export type CMSSection = {
  title: string;
  description: string;
  images: CMSImage[];
};

export type Category = {
  label: string;
  slug: string;
  heroImage?: string; // şimdilik boş/placeholder
  description?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  image?: string;
  images?: string[];
  short?: string;
  details?: string; // uzun ürün bilgisi (accordion’da gösterilecek metin)
  categorySlug: string;
  tags?: string[];
};

export type ProductionGalleryItem = {
  id: string;
  title: string;
  description: string;
  images: Array<{
    src?: string; // şimdilik boş kalabilir, CMS bağlanınca dolacak
    alt?: string;
  }>;
};

export type OrganizationType = {
  id: string;
  slug: string;
  title: string;
  short: string;
  body: string; // detay metni
  images: string[]; // şimdilik opsiyonel (sanity gelince url olacak)
};

export type HeroSlide = {
  id: string;
  title?: string;
  image?: string; // şimdilik opsiyonel
};

export type ConsultingService = {
  id: string;
  slug: string;
  title: string;
  short: string;
  body: string;
  images: string[];
};

export type ReferenceItem = {
  id: string;
  slug: string;
  title: string;
  body: string;
  images: string[];
};

export type CakeGroup = {
  id: string;
  slug: string;
  title: string;
  image?: string; // alt kategori kart görseli (opsiyonel)
  description?: string; // tıklayınca üstte gösterilecek metin
  products: Product[]; // bu alt kategoride gösterilecek ürünler
};
