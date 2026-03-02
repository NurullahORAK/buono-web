import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'consultingPage',
  title: 'Danışmanlık Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        defineField({
          name: 'slide',
          title: 'Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
              validation: (r) => r.required(),
            }),
            defineField({ name: 'title', title: 'Title (opsiyonel)', type: 'string' }),
          ],
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'entryCards',
      title: 'Giriş Kartları (Hizmetler / Referanslar)',
      type: 'array',
      validation: (r) => r.min(2).max(2),
      of: [
        defineField({
          name: 'entryCard',
          title: 'Kart',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Başlık',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'desc',
              title: 'Açıklama',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Örn: /danismanlik/hizmetler veya /danismanlik/referanslar',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Kart Görseli',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
