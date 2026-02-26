const addressText = 'Yenişehir, İnönü Cd. No:22, 12000 Bingöl';
const addressQuery = encodeURIComponent(addressText);

export const config = {
  theme: {
    gold: '#8A7B4A', // Vakko'ya yakın altın ton (istersen değiştiririz)
  },
  brandName: 'BUONO by Aslıhan Bakery',
  whatsappPhoneE164: '+905400353412',
  legal: {
    mersisNo: 'XXXXXXXXXXXXXXX', // şef verecek
    sicilNo: 'XXXXXXX', // şef verecek
  },

  // Sipariş hattı (istersen burada WhatsApp no ile aynı kalsın)
  orderLine: {
    phoneDisplay: '+90 540 035 34 12',
    hours: 'Haftanın her günü / 10:00 - 22:00',
  },

  contactEmail: '',

  // ✅ Yeni adres
  addressText,

  // ✅ Google Maps embed (API key gerektirmeden çoğu durumda çalışır)
  mapEmbedUrl: `https://www.google.com/maps?q=${addressQuery}&output=embed`,

  // Sosyal (şimdilik uygulamaya/ana sayfalara gitsin, sonra linkleri değiştirirsin)
  social: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
  },

  categories: [
    { label: 'Hediye Paketleri', slug: 'hediye-paketleri' },
    { label: 'Pasta', slug: 'pasta' },
    { label: 'Çikolata', slug: 'cikolata' },
    { label: 'Lokum', slug: 'lokum' },
    { label: 'Atıştırmalık', slug: 'atistirmalik' },
    { label: 'Organizasyon', slug: 'organizasyon' },
    { label: 'Danışmanlık', slug: 'danismanlik' },
  ],
};
