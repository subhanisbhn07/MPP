
'use client';

import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg';

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 768) {
    return 'sm'; // Mobile
  } else if (width < 1024) {
    return 'md'; // Tablet
  } else {
    return 'lg'; // Desktop
  }
};

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    // Set initial breakpoint
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
