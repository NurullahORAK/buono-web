import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchContactPage } from '@/sanity/data/contact';

export const revalidate = 60;

function dash(v?: string | null) {
  return v && v.trim().length > 0 ? v : '—';
}

export default async function KullanimKosullariPage() {
  const contact = await fetchContactPage();
  if (!contact) return notFound();

  const lastUpdate = '04.03.2026';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.16em] text-black/50"
      >
        <ol className="flex flex-wrap items-center gap-2 min-w-0">
          <li className="min-w-0">
            <Link href="/" className="hover:text-black/80 transition">
              BUONO
            </Link>
          </li>
          <li className="text-black/30">›</li>
          <li className="text-black/70 break-words [overflow-wrap:anywhere]">KULLANIM KOŞULLARI</li>
        </ol>
      </nav>

      <h1 className="mt-6 vakko-title text-3xl md:text-4xl">KULLANIM KOŞULLARI</h1>
      <p className="mt-2 text-sm text-black/60">Son güncelleme: {lastUpdate}</p>

      <section className="mt-6 rounded-2xl border border-black/10 p-6 space-y-6">
        <p className="text-black/70 leading-relaxed">
          İşbu Kullanım Koşulları; {dash(contact.businessName)} tarafından işletilen web sitesinin
          kullanımına ilişkin şartları düzenler. Siteyi kullanarak bu koşulları kabul etmiş
          sayılırsınız.
        </p>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">1) Hizmetin Kapsamı</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Bu web sitesi; ürünlerin sergilenmesi, marka/kurumsal içeriklerin paylaşılması ve
            kullanıcıların işletme ile iletişime geçebilmesi amacıyla hazırlanmıştır. Sitede{' '}
            <b>online ödeme</b> ve <b>e-ticaret sepeti</b> altyapısı bulunmamaktadır.
          </p>
          <p className="text-sm text-black/70 leading-relaxed">
            Sipariş, rezervasyon ve organizasyon talepleri; ağırlıklı olarak <b>WhatsApp</b>{' '}
            üzerinden alınır. Talep detayları, fiyat, teslim/servis koşulları ve uygunluk durumu
            WhatsApp görüşmesi sırasında netleştirilir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">2) Ürün Bilgileri ve Görseller</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 leading-relaxed space-y-1">
            <li>
              Ürün görselleri ve açıklamalar <b>tanıtım</b> amaçlıdır; dekor/renk gibi unsurlar
              küçük farklılıklar gösterebilir.
            </li>
            <li>Özel tasarım siparişlerde, final ürün; talep edilen konsepte göre değişebilir.</li>
            <li>
              İçerik/alerjen bilgileri bilgilendirme amaçlıdır; özel alerji/sağlık durumlarında
              mutlaka WhatsApp üzerinden teyit alınmalıdır.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">3) Sipariş / Rezervasyon / Organizasyon Süreci</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 leading-relaxed space-y-1">
            <li>
              Site üzerinden yapılan yönlendirmeler, <b>talep iletimi</b> niteliğindedir; otomatik
              sipariş oluşturmaz.
            </li>
            <li>Uygunluk (tarih/saat/kapasite) bilgisi WhatsApp üzerinden teyit edilir.</li>
            <li>
              Fiyatlar ve ürün bulunabilirliği dönemsel olarak değişebilir; bağlayıcı bilgi WhatsApp
              teyidi ile kesinleşir.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">
            4) Üçüncü Taraf Bağlantılar (WhatsApp / Harita)
          </h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Site; WhatsApp ve harita gibi üçüncü taraf servislerine bağlantı/yerleştirme içerebilir.
            Bu servislerin kullanımı, ilgili hizmet sağlayıcının kendi şart ve politikalarına
            tabidir. Bu servisler üzerinden yapılan işlemlerden doğabilecek durumlarda, ilgili
            hizmet sağlayıcının sorumluluğu ayrıca değerlendirilecektir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">5) Fikri Mülkiyet</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Site içeriği (metin, görsel, logo, tasarım, marka unsurları vb.){' '}
            {dash(contact.businessName)}’e aittir veya lisanslı olarak kullanılmaktadır. İzinsiz
            kopyalanamaz, çoğaltılamaz, dağıtılamaz. Detaylar için{' '}
            <Link
              href="/fikri-sinai-mulkiyet"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Fikri Sınai Mülkiyet
            </Link>{' '}
            sayfasını inceleyiniz.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">6) Sorumluluğun Sınırlandırılması</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 leading-relaxed space-y-1">
            <li>Site kesintisiz/hatasız çalışacağı garanti edilmeden “olduğu gibi” sunulur.</li>
            <li>
              Teknik arızalar, bakım çalışmaları veya üçüncü taraf servis kesintileri nedeniyle
              erişim sorunları yaşanabilir.
            </li>
            <li>
              Kullanıcıların kendi cihaz/bağlantı sorunlarından kaynaklanan durumlarda işletme
              sorumlu değildir.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">7) Uygulanacak Hukuk ve Yetki</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            İşbu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda, tüketici
            mevzuatının emredici hükümleri saklı kalmak kaydıyla yetkili merciiler Türk mahkemeleri
            ve ilgili icra daireleridir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">8) İletişim</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Koşullar hakkında sorularınız için <b>{dash(contact.email)}</b> üzerinden veya{' '}
            <Link href="/iletisim" className="underline underline-offset-4 hover:opacity-80">
              İletişim
            </Link>{' '}
            sayfasındaki kanallardan bize ulaşabilirsiniz.
          </p>
        </div>

        <div className="pt-2">
          <p className="text-xs text-black/60 leading-relaxed">
            Bu metin; hizmet/altyapı değişikliklerine göre güncellenebilir.
          </p>
        </div>
      </section>
    </div>
  );
}
