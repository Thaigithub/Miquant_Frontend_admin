'use client';

import { useLayoutEffect, useState } from 'react';

const useResize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const isMobile = size.width <= 500;
  const isTablet = 500 < size.width && size.width <= 768;

  useLayoutEffect(() => {
    const getSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    getSize();
    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);

  return { ...size, isMobile, isTablet };
};

export default useResize;
