import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'productionCenterPage',
  title: 'Üretim Merkezi Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'string',
      initialValue: 'Buono Üretim Merkezi',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Üst Açıklama',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'chefs',
      title: 'Şefler',
      type: 'array',
      of: [
        defineField({
          name: 'chef',
          title: 'Şef',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Başlık', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Açıklama', type: 'text', rows: 3 }),
            defineField({
              name: 'images',
              title: 'Görseller',
              type: 'array',
              of: [
                defineField({
                  name: 'img',
                  title: 'Görsel',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
                }),
              ],
              validation: (r) => r.min(1),
            }),
          ],
        }),
      ],
      validation: (r) => r.min(1),
    }),

    defineField({
      name: 'gallerySections',
      title: 'Üretim Galerisi Bölümleri',
      type: 'array',
      of: [
        defineField({
          name: 'section',
          title: 'Bölüm',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Başlık', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Açıklama', type: 'text', rows: 3 }),
            defineField({
              name: 'images',
              title: 'Görseller',
              type: 'array',
              of: [
                defineField({
                  name: 'img',
                  title: 'Görsel',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
                }),
              ],
              validation: (r) => r.min(1),
            }),
          ],
        }),
      ],
      validation: (r) => r.min(1),
    }),
  ],
});
