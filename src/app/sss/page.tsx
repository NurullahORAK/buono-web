import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import FaqAccordion from '@/components/faq/FaqAccordion';
import Image from 'next/image';

export default function FAQPage() {
  const wa = buildWhatsAppUrl(config.whatsappPhoneE164, 'Merhaba, farklı bir konuda sorum var.');

  const items = [
    {
      q: 'Siparişi nasıl verebilirim?',
      a: 'Ürün sayfasındaki “WhatsApp’tan Sipariş / Bilgi Al” butonuna tıklayarak direkt yazabilirsiniz.',
    },
    {
      q: 'Ödeme alıyor musunuz?',
      a: 'V1 aşamasında online ödeme yok. Sipariş ve stok bilgisi WhatsApp üzerinden yürütülür.',
    },
    {
      q: 'Organizasyon / danışmanlık için nasıl iletişim kurabilirim?',
      a: 'Kategori sayfasındaki WhatsApp butonundan talebinizi iletebilirsiniz. Size en kısa sürede dönüş yapılır.',
    },
    {
      q: 'Farklı bir konuda sorum var',
      a: (
        <div className="space-y-4">
          <p>En hızlı dönüş için WhatsApp üzerinden yazabilirsiniz.</p>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
          >
            WhatsApp&apos;tan Yaz
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="vakko-title text-3xl md:text-4xl">Sık Sorulan Sorular</h1>

      <section className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Sol: Accordion (4 madde) */}
        <div>
          <FaqAccordion items={items} />
        </div>

        {/* Sağ: sadece görsel (Sanity) */}
        <div className="relative h-[340px] w-full overflow-hidden rounded-2xl bg-black/5">
          <Image
            src="/media/faq/faq-side.jpg"
            alt="SSS görseli"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>
    </div>
  );
}
