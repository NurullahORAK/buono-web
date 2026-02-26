import type { HeroSlide, OrganizationType } from '../types';

export const organizationHeroSlides: HeroSlide[] = [
  { id: 's1', title: 'Organizasyon 1' },
  { id: 's2', title: 'Organizasyon 2' },
  { id: 's3', title: 'Organizasyon 3' },
];

export const organizationTypes: OrganizationType[] = [
  {
    id: 'o1',
    slug: 'sevgililer-gunu',
    title: 'Sevgililer Günü',
    short: 'Özel konsept, butik tasarım ve lezzetli sunumlar.',
    body: 'Sevgililer Günü organizasyonları için konsept tasarım, tatlı/ikram seçimi ve planlama desteği sağlanır. Sanity bağlanınca bu metin şef tarafından güncellenecek.',
    images: ['1', '2', '3'],
  },
  {
    id: 'o2',
    slug: 'dogum-gunu',
    title: 'Doğum Günü',
    short: 'Kişiye özel pasta, ikramlar ve konsept süsleme.',
    body: 'Doğum günü organizasyonlarında tema seçimi, ikram planı ve pasta tasarımı birlikte belirlenir. Sanity bağlanınca bu metin şef tarafından güncellenecek.',
    images: ['1', '2', '3'],
  },
  {
    id: 'o3',
    slug: 'nisan',
    title: 'Nişan Organizasyonu',
    short: 'Şık sunumlar, catering ve konsept planlama.',
    body: 'Nişan organizasyonlarında kişi sayısına göre ikram ve catering planı yapılır. Sanity bağlanınca bu metin şef tarafından güncellenecek.',
    images: ['1', '2', '3'],
  },
  {
    id: 'o4',
    slug: 'catering',
    title: 'Catering',
    short: 'Etkinliklere özel tatlı/ikram menüsü hazırlığı.',
    body: 'Catering hizmetinde etkinliğin türü ve kişi sayısına göre menü önerilir. Sanity bağlanınca bu metin şef tarafından güncellenecek.',
    images: ['1', '2', '3'],
  },
];
