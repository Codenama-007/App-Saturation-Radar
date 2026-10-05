'use client';

import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import type Lenis from 'lenis';

interface LenisContextValue {
  scrollTo: (target: string | HTMLElement | number, options?: object) => void;
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let instance: Lenis;

    async function init() {
      const { default: LenisClass } = await import('lenis');

      instance = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenisRef.current = instance;

      function raf(time: number) {
        instance.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }

      rafRef.current = requestAnimationFrame(raf);
    }

    init();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement | number, options?: object) => {
      lenisRef.current?.scrollTo(target as never, {
        offset: -80,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    },
    []
  );

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
