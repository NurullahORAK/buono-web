// src/sanity/structure.ts
import type { StructureResolver } from 'sanity/structure';

const singletonTypes = new Set([
  'siteSettings',
  'organizationPage',
  'consultingPage',
  'homePage',
  'contactPage',
  'faqPage',
  'qualityPage',
  'productionCenterPage',
]);

// Auto list tekrar eklemesin
const pinnedTypes = new Set([
  'category',
  'product',
  'cakeGroup',
  'organizationType',
  'consultingService',
  'referenceItem',
  'contentPage', // contentPage'yi auto listten saklıyoruz (çünkü menüye özel item koyuyoruz)
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ---- Singletons
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Ana Sayfa')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('İletişim Sayfası')
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),

      S.listItem()
        .title('SSS Sayfası')
        .id('faqPage')
        .child(S.document().schemaType('faqPage').documentId('faqPage')),

      S.listItem()
        .title('Organizasyon Sayfası')
        .id('organizationPage')
        .child(S.document().schemaType('organizationPage').documentId('organizationPage')),

      S.listItem()
        .title('Danışmanlık Sayfası')
        .id('consultingPage')
        .child(S.document().schemaType('consultingPage').documentId('consultingPage')),

      S.listItem()
        .title('Kalite ve Gıda Güvenliği')
        .id('qualityPage')
        .child(S.document().schemaType('qualityPage').documentId('qualityPage')),

      S.listItem()
        .title('Üretim Merkezi')
        .id('productionCenterPage')
        .child(
          S.document().schemaType('productionCenterPage').documentId('productionCenterPage')
        ),

      // ✅ Kurumsal Sayfalar yerine tek sayfa:
      S.listItem()
        .title('Fikri Sınai Mülkiyet')
        .id('fikriSinaiMulkiyet')
        .child(S.document().schemaType('contentPage').documentId('fikriSinaiMulkiyet')),

      S.divider(),

      // ---- Collections
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('cakeGroup').title('Pasta Grupları'),
      S.documentTypeListItem('organizationType').title('Organizasyon Türleri'),
      S.documentTypeListItem('consultingService').title('Danışmanlık Hizmetleri'),
      S.documentTypeListItem('referenceItem').title('Referanslar'),

      S.divider(),

      // ---- Auto list (manuel eklenenleri tekrar ekleme)
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        if (!id) return true;
        if (singletonTypes.has(id)) return false;
        if (pinnedTypes.has(id)) return false;
        return true;
      }),
    ]);