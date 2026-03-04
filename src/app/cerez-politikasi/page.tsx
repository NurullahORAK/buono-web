import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchContactPage } from '@/sanity/data/contact';

export const revalidate = 60;

function dash(v?: string | null) {
  return v && v.trim().length > 0 ? v : '—';
}

export default async function CerezPolitikasiPage() {
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
          <li className="text-black/70 break-words [overflow-wrap:anywhere]">ÇEREZ POLİTİKASI</li>
        </ol>
      </nav>

      <h1 className="mt-6 vakko-title text-3xl md:text-4xl">ÇEREZ POLİTİKASI</h1>
      <p className="mt-2 text-sm text-black/60">Son güncelleme: {lastUpdate}</p>

      <section className="mt-6 rounded-2xl border border-black/10 p-6 space-y-6">
        <p className="text-black/70 leading-relaxed">
          İşbu Çerez Politikası; {dash(contact.businessName)} tarafından işletilen web sitesinde
          kullanılan çerezler ve benzeri teknolojiler hakkında bilgi vermek amacıyla hazırlanmıştır.
        </p>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">1) Çerez Nedir?</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Çerezler; ziyaret ettiğiniz web sitesi tarafından tarayıcınızda veya cihazınızda
            saklanan küçük metin dosyalarıdır. Bazı çerezler sitenin düzgün çalışması için
            zorunludur, bazıları ise tercih/performans gibi ek amaçlarla kullanılabilir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">2) Hangi Tür Çerezleri Kullanabiliriz?</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 leading-relaxed space-y-1">
            <li>
              <b>Zorunlu Çerezler:</b> Sitenin güvenli şekilde çalışması ve temel fonksiyonlar için
              gereklidir (kapatılamaz).
            </li>
            <li>
              <b>İşlevsel Çerezler:</b> Harita gibi ek özelliklerin çalışması ve kullanıcı
              tercihlerini hatırlamak için kullanılabilir.
            </li>
            <li>
              <b>Analitik Çerezler:</b> Ziyaretçi trafiği ve kullanım istatistikleri ile performans
              iyileştirmesi için kullanılabilir (yalnızca tercihinizle).
            </li>
            <li>
              <b>Pazarlama Çerezleri:</b> Reklam/yeniden pazarlama amaçları için kullanılabilir
              (yalnızca tercihinizle).
            </li>
          </ul>

          <p className="text-xs text-black/60 leading-relaxed">
            Şu an online ödeme altyapısı yoktur. Çerezler ödeme işlemi amacıyla kullanılmaz.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">3) Üçüncü Taraf Hizmetler</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Site üzerinde; harita (ör. Google Haritalar) veya benzeri üçüncü taraf içerikler yer
            alabilir. Bu içeriklerin çalışması,
            <b> işlevsel çerez</b> tercihinize bağlı olabilir. Üçüncü taraf hizmetler kendi
            çerez/politikalarına tabi olabilir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">4) Çerez Tercihlerini Nasıl Yönetebilirim?</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Sitemizde açılışta görüntülenen çerez panelinden tercihlerinizi belirleyebilirsiniz.
            Ayrıca footer bölümündeki
            <b> “Çerez Tercihleri”</b> üzerinden dilediğiniz zaman değişiklik yapabilirsiniz.
          </p>
          <p className="text-sm text-black/70 leading-relaxed">
            Tarayıcı ayarlarınızdan da çerezleri silebilir veya engelleyebilirsiniz. Çerezlerin
            engellenmesi durumunda sitenin bazı bölümleri (ör. harita) düzgün çalışmayabilir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">5) Tercih Kaydı</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Çerez tercihlerinizi hatırlamak için “tercih kaydı” tarayıcınızda saklanır
            (localStorage/çerez). Bu kayıt; kimliğinizi doğrudan belirlemek için değil, sadece
            seçimlerinizi hatırlamak için kullanılır.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">6) İletişim</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Çerez Politikası hakkında sorularınız için <b>{dash(contact.email)}</b> üzerinden bize
            ulaşabilirsiniz. KVKK kapsamındaki detaylar için{' '}
            <Link
              className="underline underline-offset-4 hover:opacity-80"
              href="/kvkk-aydinlatma-metni"
            >
              KVKK Aydınlatma Metni
            </Link>
            ’ni inceleyebilirsiniz.
          </p>
        </div>
      </section>
    </div>
  );
}
