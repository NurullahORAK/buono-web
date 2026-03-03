import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'qualityPage',
  title: 'Kalite ve Gıda Güvenliği',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'string',
      initialValue: 'KALİTE VE GIDA GÜVENLİĞİ',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'policyTitle',
      title: 'Sol Başlık',
      type: 'string',
      initialValue: 'Gıda Güvenliği Politikamız',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'policyItems',
      title: 'Politika Maddeleri',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'slides',
      title: 'Sağ Slider',
      type: 'array',
      validation: (r) => r.min(1),
      of: [
        defineField({
          name: 'slide',
          type: 'object',
          fields: [
            defineField({
              name: 'kind',
              title: 'Tür',
              type: 'string',
              options: {
                list: [
                  { title: 'Sertifika', value: 'certificate' },
                  { title: 'Fotoğraf', value: 'photo' },
                ],
                layout: 'radio',
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Görsel',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
            }),
            defineField({
              name: 'title',
              title: 'Sertifika Başlığı (opsiyonel)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Sertifika Açıklaması (opsiyonel)',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
    }),
  ],
});
