import Breadcrumbs from '@/components/Breadcrumbs';

export default function FikriSinaiMulkiyetPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'BUONO', href: '/' }, { label: 'Fikri Sınai Mülkiyet' }]} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Başlık componentin üstünde */}
        <h1 className="vakko-title text-3xl md:text-4xl">FİKRİ SINAİ MÜLKİYET</h1>

        <section className="mt-8 grid gap-8 rounded-2xl border border-black/10 p-6 md:grid-cols-2">
          <div className="h-[360px] rounded-2xl bg-black/5 grid place-items-center text-black/40">
            Büyük Görsel (Sanity)
          </div>

          <div>
            <p className="text-black/70 leading-relaxed">
              Açıklama (placeholder). Sanity bağlanınca şef dolduracak.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
