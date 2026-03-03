import { notFound } from 'next/navigation';
import { fetchContactPage } from '@/sanity/data/contact';

export const revalidate = 60;

export default async function IletisimPage() {
  const data = await fetchContactPage();
  if (!data) return notFound();

  const waHref = data.whatsapp ? toWaHref(data.whatsapp) : null;
  const mailHref = data.email ? `mailto:${data.email}` : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="vakko-nav text-[13px] tracking-[0.18em]">{data.pageTitle}</div>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl overflow-hidden border border-black/10 bg-black/5">
          <iframe
            src={data.mapEmbedUrl}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          />
        </div>

        <div className="min-w-0">
          <h1 className="vakko-title text-3xl md:text-4xl">{data.heading}</h1>

          <div className="mt-6 border-t border-black/10">
            <Row label="İşletme Adı" value={data.businessName} />
            <Row label="WhatsApp" value={data.whatsapp ?? '—'} href={waHref} />
            <Row label="E-posta" value={data.email ?? '—'} href={mailHref} />
            <Row label="Adres" value={data.address ?? '—'} />
            <Row label="Mersis No" value={data.mersisNo ?? '—'} />
            <Row label="Sicil No" value={data.sicilNo ?? '—'} />
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 p-6">
            <div className="text-[11px] uppercase tracking-[0.16em] text-black/50">
              {data.infoBoxTitle ?? 'İLETİŞİM BİLGİLERİ'}
            </div>

            <div className="mt-4 space-y-2 text-black/70">
              {(data.infoLines ?? []).map((x, i) => (
                <div key={i} className="flex gap-3">
                  <span className="opacity-70">{x.icon ?? '•'}</span>
                  {isPhoneLike(x.text) && waHref ? (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      {x.text}
                    </a>
                  ) : (
                    <span>{x.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string | null }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-6 border-b border-black/10 py-4">
      <div className="text-black/50 text-sm">{label}</div>
      <div className="text-black/80 text-sm whitespace-pre-line break-words">
        {href ? (
          <a
            href={href}
            className="hover:underline underline-offset-4"
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function normalizeDigits(s: string) {
  return s.replace(/[^\d+]/g, '');
}
function toWaHref(phone: string) {
  const p = normalizeDigits(phone).replace('+', '');
  return `https://wa.me/${p}`;
}
function isPhoneLike(text: string) {
  return /(\+?\d[\d\s()-]{8,})/.test(text);
}
