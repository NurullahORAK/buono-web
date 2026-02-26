import type { ConsultingService } from '../types';

export const consultingServices: ConsultingService[] = [
  {
    id: 'cs1',
    slug: 'menu-planlama',
    title: 'Menü Planlama',
    short: 'Etkinliğe uygun menü kurgusu ve ikram planı.',
    body: 'Detay metni (placeholder). Sanity bağlanınca şef dolduracak.',
    images: ['1', '2', '3'],
  },
  {
    id: 'cs2',
    slug: 'konsept-tasarim',
    title: 'Konsept Tasarım',
    short: 'Tema, sunum dili ve konsept önerileri.',
    body: 'Detay metni (placeholder). Sanity bağlanınca şef dolduracak.',
    images: ['1', '2'],
  },
];
