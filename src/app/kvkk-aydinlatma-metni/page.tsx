import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchContactPage } from '@/sanity/data/contact';

export const revalidate = 60;

function dash(v?: string | null) {
  return v && v.trim().length > 0 ? v : '—';
}

export default async function KvkkAydinlatmaMetniPage() {
  const contact = await fetchContactPage();
  if (!contact) return notFound();

  const businessName = contact.businessName;
  const address = contact.address;
  const email = contact.email;
  const whatsapp = contact.whatsapp;
  const mersisNo = contact.mersisNo;
  const sicilNo = contact.sicilNo;

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
          <li className="text-black/70 break-words [overflow-wrap:anywhere]">
            KVKK AYDINLATMA METNİ
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 vakko-title text-3xl md:text-4xl">KVKK AYDINLATMA METNİ</h1>
      <p className="mt-2 text-sm text-black/60">Son güncelleme: {lastUpdate}</p>

      <section className="mt-6 rounded-2xl border border-black/10 p-6 space-y-6">
        <p className="text-black/70 leading-relaxed">
          İşbu Aydınlatma Metni; {businessName} (“İşletme” / “Veri Sorumlusu”) tarafından işletilen
          web sitesini ziyaret edenler ile WhatsApp üzerinden sipariş/rezervasyon/organizasyon
          talebi ileten ilgili kişilerin kişisel verilerinin; 6698 sayılı Kişisel Verilerin
          Korunması Kanunu (“KVKK”) kapsamında işlenmesine ilişkin olarak bilgilendirme amacıyla
          hazırlanmıştır.
        </p>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">1) Veri Sorumlusu</h2>
          <div className="text-sm text-black/70 leading-relaxed">
            <div>
              <b>Unvan:</b> {dash(businessName)}
            </div>
            <div>
              <b>Adres:</b> {dash(address)}
            </div>
            <div>
              <b>E-posta:</b> {dash(email)}
            </div>
            <div>
              <b>WhatsApp:</b> {dash(whatsapp)}
            </div>
            <div>
              <b>MERSİS No:</b> {dash(mersisNo)}
            </div>
            <div>
              <b>Sicil No:</b> {dash(sicilNo)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">2) İşlenen Kişisel Veri Kategorileri</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 leading-relaxed space-y-1">
            <li>
              <b>Kimlik/İletişim:</b> Ad-soyad (iletilirse), telefon numarası, e-posta adresi.
            </li>
            <li>
              <b>Talep Bilgileri:</b> Sipariş/rezervasyon/organizasyon talebinizin içeriği,
              tarih-saat, kişi sayısı, konsept vb.
            </li>
            <li>
              <b>İşlem Güvenliği:</b> Site güvenliği için zorunlu teknik kayıtlar (ör. hata
              kayıtları), çerez tercih kaydı.
            </li>
            <li>
              <b>Görsel/İçerik:</b> Özel sipariş için paylaşılan görseller (iletilirse).
            </li>
          </ul>
          <p className="text-xs text-black/60 leading-relaxed">
            Web sitesi üzerinden <b>online ödeme</b> alınmadığından kart/banka bilgisi istenmez ve
            işlenmez.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">3) Kişisel Verilerin İşlenme Amaçları</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 leading-relaxed space-y-1">
            <li>
              Sipariş/rezervasyon/organizasyon taleplerinin alınması, değerlendirilmesi ve
              yanıtlanması.
            </li>
            <li>
              Ürün ve hizmetler hakkında bilgi verilmesi, teklif oluşturulması ve iletişim
              sağlanması.
            </li>
            <li>Müşteri memnuniyeti süreçlerinin yürütülmesi (talep/şikâyet yönetimi).</li>
            <li>İş süreçlerinin planlanması ve operasyonel faaliyetlerin yürütülmesi.</li>
            <li>Bilgi güvenliği ve web sitesi teknik altyapısının işletilmesi.</li>
            <li>
              Hukuki yükümlülüklerin yerine getirilmesi ve olası uyuşmazlıklarda hakların korunması.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">4) Hukuki Sebepler</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Kişisel verileriniz; KVKK m.5 kapsamında, talebinizin niteliğine göre özellikle:
            <b> sözleşmenin kurulması/ifası</b>, <b>veri sorumlusunun hukuki yükümlülüğü</b> ve{' '}
            <b>meşru menfaat</b>
            hukuki sebeplerine dayanılarak işlenebilir. Bazı durumlarda (ör. pazarlama amaçlı ileti)
            ayrıca <b>açık rıza</b> aranabilir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">5) Kişisel Verilerin Aktarımı (Alıcı Grupları)</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Kişisel verileriniz; amaçlarla sınırlı olmak üzere aşağıdaki alıcı gruplarına
            aktarılabilir:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/70 leading-relaxed space-y-1">
            <li>
              <b>İletişim Kanalları:</b> WhatsApp (Meta) üzerinden iletişim kurmanız halinde, mesaj
              ve iletişim verileriniz ilgili hizmet sağlayıcının politikalarına tabi olabilir.
            </li>
            <li>
              <b>Teknik Hizmet Sağlayıcıları:</b> Barındırma/altyapı sağlayıcıları, içerik yönetim
              sistemi (CMS – ör. Sanity), CDN/performans servisleri.
            </li>
            <li>
              <b>Harita Hizmeti:</b> Google Haritalar gibi üçüncü taraf hizmetler (harita
              görüntüleme tercihlerinize bağlı olarak çalışır).
            </li>
            <li>
              <b>Hukuki/Yetkili Kurumlar:</b> Mevzuat gereği yetkili kurum ve kuruluşlar.
            </li>
          </ul>

          <p className="text-xs text-black/60 leading-relaxed">
            Yurt dışına aktarım, kullanılan hizmet sağlayıcıların altyapısına göre söz konusu
            olabilir. Bu durumlarda aktarım, mevzuatın öngördüğü şartlara uygun şekilde yürütülür.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">6) Saklama Süreleri</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Kişisel verileriniz; işleme amaçlarının gerektirdiği süre boyunca ve ilgili mevzuatta
            öngörülen zamanaşımı/ saklama süreleri dikkate alınarak saklanır. Talep/sipariş
            iletişimleri; olası uyuşmazlıklarda ispat ve yasal yükümlülükler için makul sürelerle
            muhafaza edilebilir.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">7) KVKK Kapsamındaki Haklarınız</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            KVKK m.11 uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse
            bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt
            dışında aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini
            isteme, silinmesini/yok edilmesini isteme, aktarılan üçüncü kişilere bildirilmesini
            isteme, otomatik sistemlerle analiz sonucu aleyhe bir sonucun ortaya çıkmasına itiraz
            etme ve zararın giderilmesini talep etme haklarına sahipsiniz.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="vakko-subtitle text-lg">8) Başvuru Yöntemi</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Haklarınıza ilişkin başvurularınızı yazılı olarak veya KVKK’da öngörülen yöntemlerle{' '}
            {dash(email)} adresi üzerinden iletebilirsiniz. Başvurunuzda ad-soyad, iletişim
            bilgileriniz ve talebinizin detaylarını belirtiniz.
          </p>
        </div>

        <div className="pt-2">
          <p className="text-xs text-black/60 leading-relaxed">
            Bu metin; hizmet/altyapı değişiklikleri ve mevzuat güncellemeleri nedeniyle revize
            edilebilir.
          </p>
        </div>
      </section>
    </div>
  );
}
