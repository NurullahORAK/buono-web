import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),

    // ✅ category reference
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
        },
      ],
      validation: (r) => r.min(1),
    }),

    defineField({
      name: 'short',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'details',
      title: 'Details (Accordion)',
      type: 'text',
      rows: 6,
      description: 'Ürün sayfasındaki accordion içeriği (şimdilik düz metin).',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
