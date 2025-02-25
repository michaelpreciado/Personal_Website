/**
 * Projects Page Functionality
 * This file contains functionality specific to the projects page.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize project card animations with staggered delay
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.setProperty('--index', index);
    
    // Add hover effects for desktop devices
    if (window.matchMedia('(hover: hover)').matches) {
      card.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
      });
    }
  });
  
  // Add click handlers for project card links
  document.querySelectorAll('.project-link').forEach(link => {
    // Prevent clicks on disabled links
    if (link.classList.contains('disabled')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
      });
    }
    
    // Add touch feedback
    link.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    }, { passive: true });
    
    link.addEventListener('touchend', function() {
      this.style.transform = '';
    }, { passive: true });
  });
  
  // Filter functionality (if filter buttons are present)
  const filterButtons = document.querySelectorAll('[data-filter]');
  if (filterButtons.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Handle missing images gracefully
  document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('error', function() {
      const container = this.closest('.project-image');
      container.classList.add('placeholder');
      this.style.display = 'none';
    });
  });
  
  // Add development placeholders animation
  const placeholders = document.querySelectorAll('.dev-placeholder');
  if (placeholders.length) {
    setInterval(() => {
      placeholders.forEach(placeholder => {
        placeholder.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
          placeholder.style.transform = 'translateX(0)';
        }, 50);
      });
    }, 5000);
  }
}); 