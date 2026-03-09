'use client';

import Link from 'next/link';
import Drawer from '@/components/common/Drawer';
import { config } from '@/lib/config';
import { categoryHref } from '@/lib/routes';

export default function MobileMenuDrawer({
  open,
  onClose,
  gold,
}: {
  open: boolean;
  onClose: () => void;
  gold: string;
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={<span style={{ color: gold }}>Menü</span>}
      widthClassName="w-[360px]"
    >
      <div className="space-y-6" style={{ color: gold }}>
        {/* Kategoriler */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] opacity-70">Kategoriler</div>
          <div className="mt-3 grid gap-2">
            {config.categories.map((c) => (
              <Link
                key={c.slug}
                href={categoryHref(c.slug)}
                onClick={() => onClose()}
                className="rounded-2xl border border-black/10 px-4 py-3
           bg-white/40 hover:bg-white/70
           hover:border-black/25 transition"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Kurumsal */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.16em] opacity-70">Kurumsal</div>
          <div className="mt-3 grid gap-2">
            <Link
              href="/uretim-merkezi"
              onClick={() => onClose()}
              className="rounded-2xl border border-black/10 px-4 py-3
           bg-white/40 hover:bg-white/70
           hover:border-black/25 transition"
            >
              Buono Üretim Merkezi
            </Link>

            <Link
              href="/kalite-ve-gida-guvenligi"
              onClick={() => onClose()}
              className="rounded-2xl border border-black/10 px-4 py-3
           bg-white/40 hover:bg-white/70
           hover:border-black/25 transition"
            >
              Kalite ve Gıda Güvenliği
            </Link>

            <Link
              href="/sss"
              onClick={() => onClose()}
              className="rounded-2xl border border-black/10 px-4 py-3
           bg-white/40 hover:bg-white/70
           hover:border-black/25 transition"
            >
              SSS
            </Link>

            <Link
              href="/iletisim"
              onClick={() => onClose()}
              className="rounded-2xl border border-black/10 px-4 py-3
           bg-white/40 hover:bg-white/70
           hover:border-black/25 transition"
            >
              İletişim
            </Link>

            <Link
              href="/fikri-sinai-mulkiyet"
              onClick={() => onClose()}
              className="rounded-2xl border border-black/10 px-4 py-3
           bg-white/40 hover:bg-white/70
           hover:border-black/25 transition"
            >
              Fikri Sınai Mülkiyet
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
