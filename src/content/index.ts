// src/content/index.ts
import type { ContentProvider } from './provider';
import { mockProvider } from './providers/mockProvider';

// İleride burayı SanityProvider ile değiştireceğiz
const provider: ContentProvider = mockProvider;

export const getCategories = () => provider.getCategories();
export const getProductionCenterItems = () => provider.getProductionCenterItems();
export const getFeaturedProducts = () => provider.getFeaturedProducts();
export const getProductsByCategorySlug = (slug: string) => provider.getProductsByCategorySlug(slug);
export const getProductBySlug = (slug: string) => provider.getProductBySlug(slug);
export const searchProducts = (query: string) => provider.searchProducts(query);
export const getOrganizationHeroSlides = () => provider.getOrganizationHeroSlides();
export const getOrganizationTypes = () => provider.getOrganizationTypes();
export const getOrganizationTypeBySlug = (slug: string) => provider.getOrganizationTypeBySlug(slug);
export const getConsultingHeroSlides = () => provider.getConsultingHeroSlides();
export const getConsultingServices = () => provider.getConsultingServices();
export const getConsultingServiceBySlug = (slug: string) =>
  provider.getConsultingServiceBySlug(slug);
export const getReferences = () => provider.getReferences();
export const getReferenceBySlug = (slug: string) => provider.getReferenceBySlug(slug);
export const getCakeGroups = () => provider.getCakeGroups();
export const getCakeGroupBySlug = (slug: string) => provider.getCakeGroupBySlug(slug);
export const getAllProducts = () => provider.getProducts();
