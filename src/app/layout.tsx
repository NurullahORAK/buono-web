import './globals.css';
import SiteHeader from '@/components/header/SiteHeader';
import SiteFooter from '@/components/footer/SiteFooter';
import OrderLineBar from '@/components/common/OrderLineBar';
import { config } from '@/lib/config';
import { features } from '@/lib/features';
import BackToTopButton from '@/components/common/BackToTopButton';
import { Cormorant_Garamond, Inter } from 'next/font/google';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${sans.variable} ${serif.variable}`}
      style={{ ['--gold' as any]: config.theme?.gold ?? '#8A7B4A' }}
    >
      <body>
        <SiteHeader />
        <main className={features.orderLineBar ? 'pb-24' : undefined}>{children}</main>
        {features.orderLineBar ? <OrderLineBar /> : null}
        <SiteFooter />
        <BackToTopButton />
      </body>
    </html>
  );
}
