// src/hooks/useDrawer.ts
'use client';

import { useCallback, useState } from 'react';

export function useDrawer(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const toggleDrawer = useCallback(() => setOpen((v) => !v), []);

  return { open, setOpen, openDrawer, closeDrawer, toggleDrawer };
}
