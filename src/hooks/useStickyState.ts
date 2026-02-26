'use client';

import { useEffect, useRef, useState } from 'react';

export function useStickyState() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: [1],
    });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { sentinelRef, stuck };
}
