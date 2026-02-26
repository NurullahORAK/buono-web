import { config } from '@/lib/config';

export default function OrderLineBar() {
  return (
    <section className="mt-16 bg-[color:var(--background)]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px w-full bg-black/10" />

        <div className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-black/15 text-[color:var(--ink)]">
              ☎
            </div>

            <div className="mt-4 text-[15px] uppercase tracking-[0.18em] text-[color:var(--ink)]/85">
              SİPARİŞ HATTI
            </div>

            <div className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--ink)]">
              {config.orderLine?.phoneDisplay ?? config.whatsappPhoneE164}
            </div>

            <div className="mt-2 text-sm text-[color:var(--ink-soft)]">
              {config.orderLine?.hours ?? 'Haftanın her günü / 10:00 – 22:00'}
            </div>

            <div className="mt-4 text-xs text-[color:var(--ink-soft)]">
              Ödeme yok: sipariş ve stok soruları WhatsApp/telefon üzerinden.
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />
      </div>
    </section>
  );
}
