import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'organizationPage',
  title: 'Organizasyon Sayfası',
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
            defineField({
              name: 'title',
              title: 'Title (opsiyonel)',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (r) => r.min(1),
    }),
  ],
});
