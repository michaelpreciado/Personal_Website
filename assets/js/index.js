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

  // TypeScript Loading Screen Animation
  const loadingScreen = document.getElementById('ts-loading-screen');
  const loadingBar = document.getElementById('loading-bar');
  const terminalLines = document.querySelectorAll('.ts-line');
  
  // Animate terminal lines one by one
  let delay = 100;
  terminalLines.forEach((line, index) => {
    // Hide all lines initially
    line.style.opacity = '0';
    
    // Show lines with increasing delays
    setTimeout(() => {
      line.style.opacity = '1';
      
      // Add typing animation to command lines
      const command = line.querySelector('.ts-command');
      if (command) {
        const text = command.textContent;
        command.textContent = '';
        let i = 0;
        
        const typeWriter = setInterval(() => {
          if (i < text.length) {
            command.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(typeWriter);
          }
        }, 50);
      }
      
      // Update loading bar progress
      const progress = (index + 1) / terminalLines.length * 100;
      loadingBar.style.width = `${progress}%`;
      
    }, delay);
    
    // Increase delay for next line
    delay += (line.classList.contains('ts-output')) ? 200 : 500;
  });
  
  // Hide loading screen after all animations complete
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    
    // Make all elements initially hidden but ready for scroll animations
    document.querySelectorAll('h1, h2, .bio, .project-title, .project-description, .profile-tag, .link-card span').forEach(el => {
      if (!el.classList.contains('animated') && !el.classList.contains('text-reveal')) {
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
      }
    });
    
    // Trigger scroll event to check for elements in viewport
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
    
    // Fallback to ensure text is visible after a delay
    setTimeout(() => {
      document.querySelectorAll('h1, h2, .bio, .project-title, .project-description, .profile-tag, .link-card span').forEach(el => {
        if (el.style.visibility !== 'visible') {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.classList.add('text-reveal');
        }
      });
      
      // Ensure the bio description is visible and has content
      const bioDescription = document.querySelector('.bio-description');
      if (bioDescription && bioDescription.textContent.trim() === '' && bioDescription.dataset.typeEffect) {
        // If loading.js hasn't started the typing effect yet, show the text directly
        if (!bioDescription.classList.contains('typewriter')) {
          bioDescription.textContent = bioDescription.dataset.typeEffect;
        }
      }
      
      // Dispatch an event to notify that text is visible
      document.dispatchEvent(new CustomEvent('textElementsVisible'));
    }, 2000);
  }, delay + 1000);

  // Initialize genie effect
  enhanceGenieEffect();
  
  // Add particles to sidebar
  addSidebarParticles();
});

// Simple text reveal function as backup
function simpleTextReveal() {
  const textElements = document.querySelectorAll('h1, h2, .bio, .bio-description, .project-title, .project-description, .profile-tag, .link-card span');
  
  // Make all elements visible immediately
  textElements.forEach(el => {
    el.style.visibility = 'visible';
    el.style.opacity = '1';
    el.classList.add('text-reveal');
  });
  
  console.log('Using simple text reveal animation');
}

// Toggle sidebar function
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.pointerEvents = 'auto';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.pointerEvents = 'none';
    }
  });
});

// Enhance sidebar genie effect
function enhanceGenieEffect() {
    const contactButton = document.getElementById('contact-me');
    const sidebarContent = document.querySelector('.sidebar-content');
    
    if (!contactButton || !sidebarContent) return;
    
    // Update the transform origin based on contact button position
    function updateTransformOrigin() {
        const buttonRect = contactButton.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate position as percentage from bottom right
        const originX = ((windowWidth - (buttonRect.left + buttonRect.width/2)) / windowWidth) * 100;
        const originY = ((windowHeight - (buttonRect.top + buttonRect.height/2)) / windowHeight) * 100;
        
        // Set the transform origin
        sidebarContent.style.transformOrigin = `${originX}% ${originY}%`;
    }
    
    // Update on window resize
    window.addEventListener('resize', updateTransformOrigin);
    
    // Update before sidebar opens
    const originalToggleSidebar = window.toggleSidebar;
    window.toggleSidebar = function() {
        updateTransformOrigin();
        originalToggleSidebar();
    };
    
    // Initial setup
    updateTransformOrigin();
}

// Add particle effects to the sidebar
function addSidebarParticles() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    // Create a particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'sidebar-particles';
    
    // Add some particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'genie-particle';
        
        // Random initial position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    sidebar.insertBefore(particlesContainer, sidebar.firstChild);
} 