import { useEffect, useState } from 'react';

export default function useResponsive() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return {
    isXs: true,
    isSm: width >= 576,
    isMd: width >= 768,
    isLg: width >= 992,
    isXl: width >= 1200,
    is2Xl: width >= 1440,
    isIpad: width >= 576 && width <= 992
  };
}
