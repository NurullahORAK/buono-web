import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'cakeGroup',
  title: 'Pasta Grubu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
      description: 'Pasta sayfasında kart görseli olarak kullanılır.',
    }),
    defineField({
      name: 'description',
      title: 'Açıklama (opsiyon)',
      type: 'text',
      rows: 3,
      description: 'Grup sayfasında üstte kısa metin olarak gösterilebilir.',
    }),
    defineField({
      name: 'products',
      title: 'Bu gruptaki ürünler',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (r) => r.min(1),
      description: 'Bu pasta grubunda listelenecek ürünleri seç.',
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
