/**
 * Unified Scroll Animations
 * This file handles the scroll-based animations for the entire page,
 * applying consistent fade effects to all sections as they enter/exit the viewport.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all sections
  const sections = document.querySelectorAll('section');
  const backToTopButton = document.getElementById('back-to-top');

  // Options for the Intersection Observer
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '-10% 0px', // Trigger slightly before sections enter/exit
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Multiple thresholds for smoother animations
  };

  // Set up Intersection Observer for all sections
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      const section = entry.target;
      const ratio = entry.intersectionRatio;
      
      // When section comes into view
      if (entry.isIntersecting) {
        // Apply progressive opacity and transform based on visibility ratio
        section.style.opacity = Math.max(ratio, 0.2); // Minimum opacity of 0.2
        section.style.transform = `translateY(${20 - (ratio * 20)}px)`;
        
        // When more than 40% visible, add the in-view class
        if (ratio > 0.4) {
          section.classList.add('in-view');
          section.classList.remove('scrolled-past');
          
          // Show back-to-top button when not on first section
          if (section.id !== 'profile-section' && backToTopButton) {
            backToTopButton.classList.add('visible');
          }
        }
      } else {
        // Check if section is above or below viewport
        const sectionRect = section.getBoundingClientRect();
        const isAbove = sectionRect.bottom < 0;
        
        // If section is scrolled past (above viewport), add scrolled-past class
        if (isAbove) {
          section.classList.add('scrolled-past');
          section.classList.remove('in-view');
        } else {
          // If below viewport, just remove in-view
          section.classList.remove('in-view');
        }
      }
    });
  }, observerOptions);

  // Start observing all sections
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Handle back to top button click
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Handle scroll events for parallax effects and back-to-top button
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Calculate which section is most visible
    let mostVisibleSection = null;
    let maxVisibility = 0;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibility = visibleHeight / rect.height;
      
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        mostVisibleSection = section;
      }
    });
    
    // Show back to top button when not at the top
    if (backToTopButton) {
      if (scrollPosition > window.innerHeight / 3) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }
  }, { passive: true }); // Using passive listener for better scroll performance
  
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

/**
 * Scroll-based Text Animations
 * This script handles text animations that trigger as elements enter the viewport
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    // Elements to observe for scroll-based animations
    const elementsToAnimate = document.querySelectorAll('h1:not(.animated), h2:not(.animated), .bio:not(.animated), .bio-description:not(.animated), .project-title:not(.animated), .project-description:not(.animated), .profile-tag:not(.animated), .link-card span:not(.animated)');
    
    // Create observer with options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -50px 0px', // trigger slightly before element enters viewport
      threshold: 0.1 // trigger when 10% of element is visible
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // If element is entering the viewport
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Skip if already animated
          if (element.classList.contains('animated') || element.classList.contains('text-reveal')) {
            return;
          }
          
          // Special handling for the name with permanent cursor
          if (element.tagName === 'H1' && element.textContent.trim().includes('Michael Preciado')) {
            // Check if there's already a permanent cursor
            const existingCursor = element.querySelector('.permanent-cursor');
            
            // If there's already a cursor in the HTML, just make it visible
            if (existingCursor) {
              existingCursor.style.visibility = 'visible';
              existingCursor.style.opacity = '1';
              element.classList.add('text-reveal');
              element.classList.add('animated');
              return;
            }
          }
          
          // For headings and bio, use typing effect
          if (element.tagName === 'H1' || element.tagName === 'H2' || element.classList.contains('bio')) {
            animateTypingEffect(element);
          } else {
            // For other elements, use simple reveal
            element.classList.add('text-reveal');
            element.classList.add('animated');
          }
          
          // Stop observing this element
          observer.unobserve(element);
        }
      });
    }, observerOptions);
    
    // Start observing elements
    elementsToAnimate.forEach(element => {
      // Make sure element is visible for animation
      element.style.visibility = 'visible';
      element.style.opacity = '0';
      observer.observe(element);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    document.querySelectorAll('h1, h2, .bio, .bio-description, .project-title, .project-description, .profile-tag, .link-card span').forEach(element => {
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      element.classList.add('no-animation');
    });
  }
});

/**
 * Animate element with typing effect
 * @param {HTMLElement} element - The element to animate
 */
function animateTypingEffect(element) {
  // Store original text
  const originalText = element.textContent.trim();
  
  // Clear the element
  element.textContent = '';
  element.classList.add('animated');
  
  // Create cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  
  // Special handling for name to keep permanent cursor
  const isPermanentCursor = element.tagName === 'H1' && originalText.includes('Michael Preciado');
  if (isPermanentCursor) {
    cursor.classList.add('permanent-cursor');
  }
  
  // Add cursor to element
  element.appendChild(cursor);
  
  // Type text character by character
  let charIndex = 0;
  const typeInterval = setInterval(() => {
    if (charIndex < originalText.length) {
      // Create text node for current character
      const char = document.createTextNode(originalText.charAt(charIndex));
      // Insert before cursor
      element.insertBefore(char, cursor);
      charIndex++;
    } else {
      clearInterval(typeInterval);
      
      // Remove cursor after typing unless it's permanent
      if (!isPermanentCursor) {
        setTimeout(() => cursor.remove(), 500);
      }
    }
  }, 25); // Typing speed
} 