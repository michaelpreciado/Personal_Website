/**
 * UI Effects
 * This file handles animations, typing effects, and other UI interactions.
 */

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set viewport height for iOS
  setViewHeight();
  
  // Set up observers for lazy loading and animations
  setupObservers();
  
  // Initialize typing effects if present - REMOVED, now handled by loading.js
  // initTypingEffects();
  
  // Set up touch interactions
  setupTouchInteractions();
  
  // Add random glitch effects on a timer
  setupRandomGlitches();
  
  // Setup sidebar functionality
  setupSidebar();
});

// Set a CSS variable for viewport height (fixes iOS issues)
function setViewHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Update on resize and orientation change for better mobile experience
  window.addEventListener('resize', setViewHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewHeight, 100);
  });
}

// Initialize observers for lazy loading and animations
function setupObservers() {
  // Lazy load images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (lazyImages.length) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.removeAttribute('loading');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll('.profile-card, .bio-card, .project-card, .link-card');
  if (animatedElements.length) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('animate-in');
          });
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '50px'
    });

    animatedElements.forEach(el => {
      el.classList.add('animate-prepare');
      animationObserver.observe(el);
    });
  }
}

// Initialize typing effects for text elements
function initTypingEffects() {
  const typingElements = document.querySelectorAll('[data-type-effect]');
  
  if (typingElements.length === 0) return;
  
  // Type text function
  const typeText = (element, text) => {
    element.textContent = text;
    element.setAttribute('data-typing-complete', 'true');
    return Promise.resolve();
  };

  // Process all typing elements with a small delay between each
  const processTyping = async () => {
    for (const element of typingElements) {
      if (element && element.dataset.typeEffect) {
        await typeText(element, element.dataset.typeEffect);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  };

  // Start typing with a small initial delay
  setTimeout(processTyping, 500);
}

// Set up touch interactions for better mobile experience
function setupTouchInteractions() {
  const touchElements = document.querySelectorAll('a, button, .project-card, .bio-card, .link-card');
  
  touchElements.forEach(element => {
    element.addEventListener('touchstart', () => {
      element.style.transform = 'scale(0.98)';
      element.style.transition = 'transform 0.1s ease';
    }, { passive: true });
    
    element.addEventListener('touchend', () => {
      element.style.transform = '';
      element.style.transition = 'transform 0.2s ease';
    }, { passive: true });
    
    element.addEventListener('touchcancel', () => {
      element.style.transform = '';
      element.style.transition = 'transform 0.2s ease';
    }, { passive: true });
  });
}

// Add random glitch effects to elements
function setupRandomGlitches() {
  // Add random glitch triggers
  setInterval(() => {
    const glitchElements = document.querySelectorAll('[class*="term-cyan"], [class*="cyan"]');
    if (glitchElements.length) {
      glitchElements.forEach(el => {
        el.style.animation = 'lineGlitch 0.8s';
        setTimeout(() => {
          el.style.animation = 'lineGlitch 6s infinite';
        }, 800);
      });
    }
  }, 15000); // Trigger every 15 seconds
}

// Setup sidebar functionality
function setupSidebar() {
  const sidebarToggle = document.getElementById('contact-me');
  const sidebar = document.getElementById('sidebar');
  const closeButton = document.querySelector('.close-sidebar');
  
  if (!sidebar) return;
  
  // Toggle sidebar function
  window.toggleSidebar = function() {
    const body = document.body;
    
    if (sidebar.classList.contains('active')) {
      // Closing sidebar
      sidebar.classList.remove('active');
      body.classList.remove('sidebar-open');
      
      // Add closing animation
      sidebar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
      sidebar.style.opacity = '0';
      
      // Re-enable scrolling after animation
      setTimeout(() => {
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(body.style.top || '0') * -1);
        sidebar.style.opacity = ''; // Reset opacity
      }, 300);
    } else {
      // Opening sidebar - Store current scroll position
      const scrollY = window.scrollY;
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.top = `-${scrollY}px`;
      
      // Add opening animation
      sidebar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
      sidebar.style.opacity = '0';
      sidebar.classList.add('active');
      
      // Trigger reflow to ensure animation works
      void sidebar.offsetWidth;
      
      // Fade in
      sidebar.style.opacity = '1';
      body.classList.add('sidebar-open');
      
      // Set focus to the sidebar for accessibility
      setTimeout(() => {
        sidebar.setAttribute('tabindex', '-1');
        sidebar.focus();
      }, 100);
      
      // Add animation to contact button
      if (sidebarToggle) {
        sidebarToggle.classList.add('clicked');
        setTimeout(() => {
          sidebarToggle.classList.remove('clicked');
        }, 500);
      }
    }
  };
  
  // Add click event listeners if elements exist
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', window.toggleSidebar);
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', window.toggleSidebar);
  }
  
  // Handle touch swipe on sidebar
  if (sidebar) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    sidebar.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    sidebar.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    sidebar.addEventListener('touchend', () => {
      // If swiped left to right (close gesture)
      if (touchEndX - touchStartX > 50) {
        window.toggleSidebar();
      }
    }, { passive: true });
  }
  
  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar && 
        sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !(sidebarToggle && sidebarToggle.contains(e.target))) {
      window.toggleSidebar();
    }
  });
  
  // Close sidebar with escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
      window.toggleSidebar();
    }
  });
} 