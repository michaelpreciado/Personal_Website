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