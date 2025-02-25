/**
 * Particles.js Configuration
 * This file initializes and configures the particles.js background effect.
 */

// Check if we're on a desktop device
const isDesktop = window.matchMedia('(min-width: 1200px)').matches;

// Enhanced configuration for desktops
const desktopConfig = {
  particles: {
    number: {
      value: 180,
      density: {
        enable: true,
        value_area: 1200
      }
    },
    color: {
      value: "#00D6FF"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#00D6FF"
      }
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 160,
      color: "#00D6FF",
      opacity: 0.4,
      width: 1.5,
      shadow: {
        enable: true,
        blur: 5,
        color: "#00D6FF"
      }
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 0.8
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
};

// Mobile configuration (fewer particles, less intensive)
const mobileConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#00D6FF"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.6,
      random: false
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#00D6FF",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    }
  },
  retina_detect: true
};

// Initialize particles with the appropriate configuration
document.addEventListener('DOMContentLoaded', function() {
  if (window.particlesJS) {
    console.log('Initializing particles.js with', isDesktop ? 'desktop' : 'mobile', 'configuration');
    window.particlesJS('particles-js', isDesktop ? desktopConfig : mobileConfig);
    
    // Adjust particles density on window resize
    window.addEventListener('resize', function() {
      const newIsDesktop = window.matchMedia('(min-width: 1200px)').matches;
      if (newIsDesktop !== isDesktop) {
        console.log('Screen size changed, reinitializing particles');
        window.particlesJS('particles-js', newIsDesktop ? desktopConfig : mobileConfig);
      }
    });
  } else {
    console.error('particles.js not loaded');
  }
  
  // Adjust particle opacity on scroll
  let scrollTimeout;
  const scrollHandler = () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const particles = document.getElementById('particles-js');
      
      if (particles) {
        // Only fade particle elements, not the background
        const canvas = particles.querySelector('canvas');
        if (canvas) {
          const opacity = Math.max(0.5, 1 - (scrolled / maxScroll));
          canvas.style.opacity = opacity;
        }
        
        // Maintain solid background
        particles.style.background = 'var(--term-bg)';
        particles.style.opacity = 1;
      }
    });
  };

  // Add scroll event listener with passive option for better performance
  window.addEventListener('scroll', scrollHandler, { passive: true });
  
  // Handle reduced motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const particlesCanvas = document.querySelector('#particles-js canvas');
    if (particlesCanvas) {
      particlesCanvas.style.opacity = 0.5;
    }
  }
  
  // Debug check to see if particles.js is loaded
  console.log('Particles.js initialized:', typeof particlesJS !== 'undefined');
}); 