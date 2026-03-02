import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'consultingService',
  title: 'Danışmanlık Hizmeti',
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
    defineField({ name: 'short', title: 'Kısa Açıklama', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Detay Metni', type: 'text', rows: 8 }),
    defineField({
      name: 'images',
      title: 'Görseller',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
        },
      ],
    }),
    defineField({ name: 'order', title: 'Sıra', type: 'number', initialValue: 0 }),
    defineField({ name: 'active', title: 'Aktif', type: 'boolean', initialValue: true }),
  ],
});
