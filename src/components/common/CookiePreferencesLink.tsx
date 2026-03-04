'use client';

import { openCookiePreferences } from '@/lib/cookieConsent';

export default function CookiePreferencesLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className={className ?? 'hover:opacity-70 transition'}
    >
      {children ?? 'ÇEREZ TERCİHLERİ'}
    </button>
  );
}
