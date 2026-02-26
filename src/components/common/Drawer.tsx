'use client';

import { useEffect, useId } from 'react';

export default function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  side = 'right',
  widthClassName = 'w-[360px]',
}: {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'right' | 'left';
  widthClassName?: string;
}) {
  const titleId = useId();

  // ESC ile kapatma
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Drawer açıkken body scroll kilitle
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    // scrollbar genişliği (overlay açılınca layout kaymasın)
    const scrollbarW = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [open]);

  const translateClosed = side === 'right' ? 'translate-x-full' : '-translate-x-full';
  const sidePos = side === 'right' ? 'right-0' : 'left-0';

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={[
          'fixed inset-0 z-[1200] bg-black/30 transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={[
          'fixed top-0 z-[1201] h-dvh max-w-[90vw] bg-white shadow-xl',
          sidePos,
          widthClassName,
          'transition-transform duration-300 will-change-transform flex flex-col',
          open ? 'translate-x-0' : translateClosed,
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div id={titleId} className="text-[12px] uppercase tracking-[0.16em] text-black/70">
            {title ?? ''}
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-black/5 transition"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <div className="p-5 text-sm text-black/70 overflow-auto">{children}</div>

        {footer ? <div className="mt-auto border-t border-black/10 p-5">{footer}</div> : null}
      </aside>
    </>
  );
}
