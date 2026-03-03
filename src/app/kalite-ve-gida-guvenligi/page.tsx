// src/app/kalite-ve-gida-guvenligi/page.tsx
import { notFound } from 'next/navigation';
import { fetchQualityPage } from '@/sanity/data/quality';
import QualityClient from './quality-client';

export const revalidate = 60;

export default async function Page() {
  const data = await fetchQualityPage();
  if (!data) return notFound();

  return <QualityClient data={data} />;
}
