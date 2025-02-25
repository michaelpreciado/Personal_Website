import { useEffect } from 'react';

export const useViewportHeight = () => {
  useEffect(() => {
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', () => {
      // Delay to ensure correct height after orientation change
      setTimeout(setVhProperty, 100);
    });

    return () => {
      window.removeEventListener('resize', setVhProperty);
      window.removeEventListener('orientationchange', setVhProperty);
    };
  }, []);
}; 