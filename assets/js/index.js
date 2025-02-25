/**
 * Main JavaScript Entry Point
 * This file serves as the main entry point for all JavaScript functionality.
 * It checks for feature support and loads only what's needed for the current page.
 */

// Feature detection
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsAnimations = 'animation' in document.documentElement.style;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Set viewport height for mobile devices
function setViewportHeight() {
  // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Helper to load scripts asynchronously
function loadScript(src, callback) {
  console.log('Loading script:', src); // Debug log
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  
  script.onload = function() {
    console.log('Script loaded:', src); // Debug log
    if (callback) callback();
  };
  
  script.onerror = function() {
    console.error('Failed to load script:', src); // Debug log
  };
  
  document.head.appendChild(script);
}

// Determine if we're on a specific page
const isProjectsPage = document.querySelector('.projects-container') !== null;
const hasParticles = document.getElementById('particles-js') !== null;

console.log('Page initialization:', { isProjectsPage, hasParticles }); // Debug log

// Load required scripts
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded'); // Debug log
  
  // Set the viewport height
  setViewportHeight();
  
  // Update viewport height on resize and orientation change
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', function() {
    setTimeout(setViewportHeight, 100);
  });
  
  // Core functionality - always load
  loadScript('./assets/js/effects.js');
  
  // Check if particles background is present
  if (hasParticles) {
    console.log('Particles container found, loading particles.js'); // Debug log
    
    // First load particles.js library
    loadScript('./assets/js/lib/particles.min.js', function() {
      console.log('Particles library loaded, initializing configuration'); // Debug log
      // After particles.js is loaded, load our configuration
      loadScript('./assets/js/particles.js');
    });
  }
  
  // Page-specific scripts
  if (isProjectsPage) {
    loadScript('./assets/js/projects.js');
  }
  
  // If reduced motion is preferred, apply optimizations
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // If Intersection Observer is not supported, show all elements immediately
  if (!supportsIntersectionObserver) {
    document.querySelectorAll('.animate-prepare').forEach(el => {
      el.classList.remove('animate-prepare');
      el.classList.add('animate-in');
    });
  }
  
  // Setup iOS-specific handling
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.documentElement.classList.add('ios-device');
  }
  
  // Listen for orientation changes on mobile
  window.addEventListener('orientationchange', function() {
    // Slight delay to allow for iOS viewport adjustments
    setTimeout(function() {
      // Trigger resize event to fix any layout issues
      window.dispatchEvent(new Event('resize'));
    }, 200);
  });
  
  // Add smooth scroll behavior if supported
  if ('scrollBehavior' in document.documentElement.style && !prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'smooth';
  } else {
    // Implement basic smooth scroll for browsers that don't support it
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}); 