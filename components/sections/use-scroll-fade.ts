'use client';

import { useState, useEffect, useCallback, type RefObject } from 'react';

export function useScrollFade(ref: RefObject<HTMLElement | null>) {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 2);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, [ref]);

  // Sin deps: re-chequea en cada render (el contenido con scroll puede
  // cambiar de ancho — ej. subtabs — sin disparar un evento de scroll/resize).
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });

  return { showLeft, showRight, onScroll: update };
}
