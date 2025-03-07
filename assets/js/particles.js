/**
 * Particles.js Configuration
 * This file initializes and configures the particles.js background effect.
 */

// Check if we're on a desktop device or ultra-wide display
const isDesktop = window.matchMedia('(min-width: 1200px)').matches;
const isUltraWide = window.matchMedia('(min-width: 1800px)').matches;

// Enhanced configuration for desktops
const desktopConfig = {
  particles: {
    number: {
      value: 100,
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
      value: 40,
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

// Ultra-wide configuration (more particles, broader distribution)
const ultraWideConfig = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 1800
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
      value: 0.65,
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
      distance: 200, // Increased distance between connected particles
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
      speed: 1.5,
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
        distance: 250, // Increased grab distance
        line_linked: {
          opacity: 0.8
        }
      },
      push: {
        particles_nb: 5
      }
    }
  },
  retina_detect: true
};

// Super ultra-wide configuration (optimized for 21:9 and 32:9 displays)
const superUltraWideConfig = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 2400 // Larger area for better distribution
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
      value: 0.6, // Slightly more transparent
      random: true,
      anim: {
        enable: true,
        speed: 0.8, // Slower animation
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
      distance: 250, // Increased connection distance for ultrawide
      color: "#00D6FF",
      opacity: 0.3, // Slightly more transparent lines
      width: 1.5,
      shadow: {
        enable: true,
        blur: 5,
        color: "#00D6FF"
      }
    },
    move: {
      enable: true,
      speed: 1.2, // Slightly slower movement
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 800,
        rotateY: 1500
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
        distance: 300, // Increased grab distance for ultrawide
        line_linked: {
          opacity: 0.6
        }
      },
      push: {
        particles_nb: 6
      }
    }
  },
  retina_detect: true
};

// Initialize particles with the appropriate configuration
document.addEventListener('DOMContentLoaded', function() {
  if (window.particlesJS) {
    // Check for super ultrawide screens (typically 32:9 aspect ratio)
    const isSuperUltraWide = window.matchMedia('(min-width: 3000px)').matches;
    
    console.log('Initializing particles.js with configuration for:', 
      isSuperUltraWide ? 'super-ultra-wide' : (isUltraWide ? 'ultra-wide' : (isDesktop ? 'desktop' : 'mobile')));
    
    // Select configuration based on screen size
    let config;
    if (isSuperUltraWide) {
      config = superUltraWideConfig;
    } else if (isUltraWide) {
      config = ultraWideConfig;
    } else if (isDesktop) {
      config = desktopConfig;
    } else {
      config = mobileConfig;
    }
    
    window.particlesJS('particles-js', config);
    
    // Adjust particles density on window resize
    window.addEventListener('resize', function() {
      const newIsDesktop = window.matchMedia('(min-width: 1200px)').matches;
      const newIsUltraWide = window.matchMedia('(min-width: 1800px)').matches;
      const newIsSuperUltraWide = window.matchMedia('(min-width: 3000px)').matches;
      
      if (newIsSuperUltraWide !== isSuperUltraWide || newIsUltraWide !== isUltraWide || newIsDesktop !== isDesktop) {
        console.log('Screen size changed, reinitializing particles');
        
        let newConfig;
        if (newIsSuperUltraWide) {
          newConfig = superUltraWideConfig;
        } else if (newIsUltraWide) {
          newConfig = ultraWideConfig;
        } else if (newIsDesktop) {
          newConfig = desktopConfig;
        } else {
          newConfig = mobileConfig;
        }
        
        window.particlesJS('particles-js', newConfig);
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