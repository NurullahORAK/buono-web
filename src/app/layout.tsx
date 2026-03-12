import './globals.css';
import type { CSSProperties } from 'react';
import SiteHeader from '@/components/header/SiteHeader';
import SiteFooter from '@/components/footer/SiteFooter';
import OrderLineBar from '@/components/common/OrderLineBar';
import { config } from '@/lib/config';
import { features } from '@/lib/features';
import BackToTopButton from '@/components/common/BackToTopButton';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import CookieConsentBanner from '@/components/common/CookieConsentBanner';
import CookieConsentPopup from '@/components/common/CookieConsentPopup';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const style = {
    '--gold': config.theme?.gold ?? '#8A7B4A',
  } as CSSProperties;

  return (
    <html lang="tr" className={`${sans.variable} ${serif.variable}`} style={style}>
      <body>
        <SiteHeader />
        <main className={features.orderLineBar ? 'pb-8' : undefined}>{children}</main>
        {features.orderLineBar ? <OrderLineBar /> : null}
        <SiteFooter />
        <BackToTopButton />
        <CookieConsentPopup />
      </body>
    </html>
  );
}
