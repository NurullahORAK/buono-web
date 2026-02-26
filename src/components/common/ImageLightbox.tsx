'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function ImageLightbox({
  open,
  src,
  alt,
  onClose,
}: {
  open: boolean;
  src?: string;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Kapat"
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/90 hover:text-white transition"
        >
          ✕
        </button>

        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black">
          <Image
            src={src}
            alt={alt ?? ''}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
