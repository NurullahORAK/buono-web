// src/content/providers/mockProvider.ts
import { config } from '@/lib/config';
import type { ContentProvider } from '../provider';
import type { Category, Product, ProductionGalleryItem } from '../types';
import { products } from '../mock/products';
import { productionCenterItems } from '../mock/productionCenter';
import { organizationHeroSlides, organizationTypes } from '../mock/organizations';
import { consultingHeroSlides } from '../mock/consulting';
import { consultingServices } from '../mock/consultingServices';
import { references } from '../mock/references';
import type { CakeGroup } from '../types';
import { cakeGroupMeta } from '../mock/cakeGroups';

export const mockProvider: ContentProvider = {
  getConsultingServices() {
    return consultingServices;
  },
  getConsultingServiceBySlug(slug: string) {
    return consultingServices.find((x) => x.slug === slug) ?? null;
  },
  getReferences() {
    return references;
  },
  getReferenceBySlug(slug: string) {
    return references.find((x) => x.slug === slug) ?? null;
  },
  getConsultingHeroSlides() {
    return consultingHeroSlides;
  },
  getOrganizationHeroSlides() {
    return organizationHeroSlides;
  },
  getOrganizationTypes() {
    return organizationTypes;
  },
  getOrganizationTypeBySlug(slug: string) {
    return organizationTypes.find((x) => x.slug === slug) ?? null;
  },
  getCategories(): Category[] {
    return config.categories.map((c) => ({
      label: c.label,
      slug: c.slug,
      description: `${c.label} için kısa açıklama (placeholder).`,
    }));
  },

  getProductionCenterItems(): ProductionGalleryItem[] {
    return productionCenterItems;
  },

  getFeaturedProducts(): Product[] {
    return products.slice(0, 6);
  },

  getProducts(): Product[] {
    return products;
  },

  getProductsByCategorySlug(slug: string): Product[] {
    return products.filter((p) => p.categorySlug === slug);
  },

  getProductBySlug(slug: string): Product | null {
    return products.find((p) => p.slug === slug) ?? null;
  },

  searchProducts(query: string) {
    const normalizeTR = (input: string) =>
      input
        .toLocaleLowerCase('tr-TR')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    const q = normalizeTR(query.trim());
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(Boolean);

    const scored = products.map((p) => {
      const categoryLabel =
        this.getCategories().find((c) => c.slug === p.categorySlug)?.label ?? '';

      const hay = normalizeTR(
        [
          p.name,
          p.short ?? '',
          p.details ?? '',
          ...(p.tags ?? []),
          categoryLabel, // isterse “pasta” yazınca da bulsun
        ].join(' ')
      );

      const allMatch = tokens.every((t) => hay.includes(t));
      const anyMatch = tokens.some((t) => hay.includes(t));

      const score = allMatch ? 2 : anyMatch ? 1 : 0;
      return { p, score };
    });

    return scored
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.p);
  },
  getCakeGroups(): CakeGroup[] {
    const pastaProducts = products.filter((p) => p.categorySlug === 'pasta');

    // kaç alt kategori varsa, ürünleri eşit böl
    const perGroup = Math.max(1, Math.ceil(pastaProducts.length / cakeGroupMeta.length));

    return cakeGroupMeta.map((meta, idx) => ({
      ...meta,
      products: pastaProducts.slice(idx * perGroup, (idx + 1) * perGroup),
    }));
  },

  getCakeGroupBySlug(slug: string): CakeGroup | null {
    return this.getCakeGroups().find((g) => g.slug === slug) ?? null;
  },
};
