'use client';

import { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 220);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Sayfanın en üstüne çık"
      className={[
        'fixed bottom-24 right-5 md:bottom-5 z-[1200]',
        'h-12 w-12 rounded-full',
        'border border-[color:var(--ink)]',
        'bg-white/90 backdrop-blur',
        'grid place-items-center',
        'shadow-lg shadow-black/10',
        'transition hover:shadow-xl hover:shadow-black/15 hover:scale-[1.04]',
      ].join(' ')}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5l-7 7m7-7l7 7M12 5v14"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
