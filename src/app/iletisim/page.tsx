import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function ContactPage() {
  const wa = buildWhatsAppUrl(config.whatsappPhoneE164, 'Merhaba, iletişim için yazıyorum.');

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-[14px] font-semibold uppercase tracking-[0.20em] text-black/80">
        İletişim
      </h1>
      <div className="mt-4 h-px w-full bg-black/10" />

      <section className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Sol: Harita */}
        <div className="rounded-2xl border border-black/10 overflow-hidden bg-white">
          <div className="aspect-[16/10] w-full bg-black/5">
            {config.mapEmbedUrl ? (
              <iframe
                title="Harita"
                src={config.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-black/50 text-sm">
                Harita bağlantısı (placeholder) — sonra eklenecek
              </div>
            )}
          </div>
        </div>

        {/* Sağ: Bilgiler */}
        <div>
          <h2 className="vakko-title text-3xl md:text-4xl">Bizimle İletişime Geçin</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 text-sm">
            <Row label="İşletme Adı" value={config.brandName} />

            {/* WhatsApp satırı: numaraya tıkla -> WhatsApp */}
            <Row
              label="WhatsApp"
              value={
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-black hover:underline"
                >
                  {config.orderLine.phoneDisplay}
                </a>
              }
            />

            <Row label="E-posta" value={config.contactEmail || '—'} />
            <Row label="Adres" value={config.addressText || '—'} />
            <Row label="Mersis No" value={config.legal.mersisNo} />
            <Row label="Sicil No" value={config.legal.sicilNo} />
          </div>

          {/* Alt kart */}
          <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
            <div className="text-[12px] uppercase tracking-[0.16em] text-black/70">
              İletişim Bilgileri
            </div>

            <div className="mt-4 space-y-3 text-sm text-black/70">
              <div className="flex items-start gap-2">
                <span className="mt-[2px]">💬</span>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline font-medium text-black"
                >
                  {config.orderLine.phoneDisplay}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-[2px]">🕒</span>
                <span>{config.orderLine.hours}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-[2px]">ℹ️</span>
                <span>Ödeme yok: sipariş ve bilgi WhatsApp üzerinden.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-6 border-b border-black/5 pb-3">
      <div className="text-black/60">{label}</div>
      <div className="text-black">{value}</div>
    </div>
  );
}
