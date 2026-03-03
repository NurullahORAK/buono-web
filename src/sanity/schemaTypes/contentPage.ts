import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contentPage',
  title: 'Kurumsal Sayfa',
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
      name: 'heroImage',
      title: 'Hero Görsel (opsiyonel)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    }),
    defineField({
      name: 'summary',
      title: 'Kısa Açıklama (opsiyonel)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'text',
      rows: 14,
      validation: (r) => r.required(),
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
