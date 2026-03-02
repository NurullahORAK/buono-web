import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Ana Sayfa',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Görsel',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
      description: 'Ana sayfadaki en üst banner görseli.',
    }),

    defineField({
      name: 'aboutText',
      title: 'Hakkımızda Metni',
      type: 'text',
      rows: 6,
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'featuredTitle',
      title: 'Öne Çıkanlar Başlığı (opsiyonel)',
      type: 'string',
      description: 'Örn: “BU HAFTANIN BESTSELLERLARI”',
    }),

    defineField({
      name: 'featuredProducts',
      title: 'Öne Çıkan Ürünler',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (r) => r.min(1).max(12),
      description: 'Bu hafta öne çıkarılacak ürünleri seç. Sıralamayı sürükle-bırak ile ayarla.',
    }),
  ],
});
