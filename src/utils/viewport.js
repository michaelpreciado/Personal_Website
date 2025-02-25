/**
 * Utility functions for handling viewport-related calculations
 */

/**
 * Returns true if the current device is considered mobile
 * based on screen width
 */
export const isMobile = () => {
  return window.innerWidth <= 768;
};

/**
 * Returns true if the device is in portrait orientation
 */
export const isPortrait = () => {
  return window.innerHeight > window.innerWidth;
};

/**
 * Detects if the device is iOS
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

/**
 * Sets a CSS variable for viewport height that works correctly on mobile
 */
export const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

/**
 * Returns appropriate particle density based on device capability
 */
export const getParticleDensity = () => {
  // Reduce density for mobile devices
  if (window.innerWidth < 768) {
    return 30;
  }
  
  // Further reduce for older devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return 40;
  }
  
  // Default for desktop/high-performance devices
  return 80;
}; 