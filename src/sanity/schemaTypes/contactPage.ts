import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'İletişim Sayfası',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Sayfa Başlığı (üstte küçük başlık)',
      type: 'string',
      initialValue: 'İLETİŞİM',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'heading',
      title: 'Ana Başlık (sağda büyük başlık)',
      type: 'string',
      initialValue: 'BİZİMLE İLETİŞİME GEÇİN',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'mapEmbedUrl',
      title: 'Harita Embed URL (Google Maps iframe src)',
      type: 'url',
      description:
        'Google Maps > Paylaş > Harita yerleştir > iframe src içindeki URL’yi buraya yapıştır.',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'businessName',
      title: 'İşletme Adı',
      type: 'string',
      validation: (r) => r.required(),
    }),

    defineField({ name: 'whatsapp', title: 'WhatsApp', type: 'string' }),
    defineField({ name: 'email', title: 'E-posta', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'mersisNo', title: 'Mersis No', type: 'string' }),
    defineField({ name: 'sicilNo', title: 'Sicil No', type: 'string' }),

    defineField({
      name: 'infoBoxTitle',
      title: 'Alt Kutu Başlığı',
      type: 'string',
      initialValue: 'İLETİŞİM BİLGİLERİ',
    }),
    defineField({
      name: 'infoLines',
      title: 'Alt Kutu Satırları',
      type: 'array',
      of: [
        defineField({
          name: 'line',
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon (emoji/karakter)', type: 'string' }),
            defineField({
              name: 'text',
              title: 'Metin',
              type: 'string',
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
      validation: (r) => r.min(1),
      initialValue: [
        { icon: '💬', text: '+90 5xx xxx xx xx' },
        { icon: '🕒', text: 'Haftanın her günü / 10:00 - 22:00' },
        { icon: 'ℹ️', text: 'Ödeme yok: sipariş ve bilgi WhatsApp üzerinden.' },
      ],
    }),
  ],
});
