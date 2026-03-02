import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'label', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'showInNav',
      title: 'Show in Navbar',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'filterTags',
      title: 'Filter Tags (Bu kategori filtreleri)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description:
        'Bu kategori sayfasında görünecek filtre seçenekleri. Boş bırakırsan ürünlerden otomatik çıkarılır.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Kategori görseli)',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description (Kategori açıklaması)',
      type: 'text',
      rows: 3,
    }),
  ],
});
