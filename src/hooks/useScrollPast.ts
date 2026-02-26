'use client';

import { useEffect, useState } from 'react';

// enter: compact'a geçme eşiği
// exit: compact'tan çıkma eşiği (enter'dan düşük olmalı -> hysteresis)
// freeze: true ise state değişmez (arama açıkken titremeyi keser)
export function useScrollPast(enter = 140, exit = enter - 50, freeze = false) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      if (freeze) return;

      const y = window.scrollY;

      setPast((prev) => {
        // prev=false iken enter'ı geçerse true
        if (!prev && y > enter) return true;

        // prev=true iken exit'in altına düşerse false
        if (prev && y < exit) return false;

        return prev;
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enter, exit, freeze]);

  return past;
}
