import { notFound } from 'next/navigation';
import Image from 'next/image';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import FaqAccordion from '@/components/faq/FaqAccordion';
import { fetchFaqPage } from '@/sanity/data/faq';

export const revalidate = 60;

export default async function FAQPage() {
  const data = await fetchFaqPage();
  if (!data) return notFound();

  const wa = buildWhatsAppUrl(config.whatsappPhoneE164, 'Merhaba, farklı bir konuda sorum var.');

  const items = (data.items ?? []).map((x) => {
    const isCta =
      x.isWhatsappCta === true || x.question.trim().toLowerCase() === 'farklı bir konuda sorum var';

    return {
      q: x.question,
      a: isCta ? (
        <div className="space-y-4">
          <p className="whitespace-pre-line">{x.answer}</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-xs uppercase tracking-[0.16em] hover:opacity-90 transition"
          >
            WhatsApp&apos;tan Yaz
          </a>
        </div>
      ) : (
        <div className="whitespace-pre-line">{x.answer}</div>
      ),
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="vakko-title text-3xl md:text-4xl">{data.title}</h1>

      <section className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Sol: Accordion */}
        <div>
          <FaqAccordion items={items} />
        </div>

        {/* Sağ: Görsel (Sanity) */}
        <div className="relative h-[340px] w-full overflow-hidden rounded-2xl bg-black/5">
          {data.sideImageUrl ? (
            <Image
              src={data.sideImageUrl}
              alt={data.sideImageAlt ?? 'SSS görseli'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-black/40">
              Görsel (placeholder)
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
