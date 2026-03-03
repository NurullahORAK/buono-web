import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faqPage',
  title: 'SSS Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'string',
      initialValue: 'SIK SORULAN SORULAR',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sideImage',
      title: 'Sağ Görsel',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    }),
    defineField({
      name: 'items',
      title: 'Soru-Cevap Listesi',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Soru',
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Soru',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Cevap',
              type: 'text',
              rows: 4,
              validation: (r) => r.required(),
            }),
            // opsiyonel: butonlu maddeyi kesin işaretlemek istersen
            defineField({
              name: 'isWhatsappCta',
              title: 'Bu maddede WhatsApp butonu göster',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
      validation: (r) => r.min(1),
    }),
  ],
});
