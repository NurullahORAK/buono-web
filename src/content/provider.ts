// src/content/provider.ts
import type { Category, Product, ProductionGalleryItem, CakeGroup } from './types';
import type { HeroSlide, OrganizationType } from './types';
import type { ConsultingService, ReferenceItem } from './types';

export interface ContentProvider {
  getCategories(): Category[];
  getProductionCenterItems(): ProductionGalleryItem[];
  getFeaturedProducts(): Product[];
  getProductsByCategorySlug(slug: string): Product[];
  getProductBySlug(slug: string): Product | null;
  getProducts(): Product[];
  searchProducts(query: string): Product[];
  getOrganizationHeroSlides(): HeroSlide[];
  getOrganizationTypes(): OrganizationType[];
  getOrganizationTypeBySlug(slug: string): OrganizationType | null;
  getConsultingHeroSlides(): HeroSlide[];
  getConsultingServices(): ConsultingService[];
  getConsultingServiceBySlug(slug: string): ConsultingService | null;
  getReferences(): ReferenceItem[];
  getReferenceBySlug(slug: string): ReferenceItem | null;
  getCakeGroups(): CakeGroup[];
  getCakeGroupBySlug(slug: string): CakeGroup | null;
}
