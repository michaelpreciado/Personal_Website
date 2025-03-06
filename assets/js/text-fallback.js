/**
 * Text Fallback Script
 * This script ensures all text elements are visible, even if animations fail
 */

// Text Fallback Script
// This script ensures text is visible even if animations fail to load or execute

document.addEventListener('DOMContentLoaded', function() {
  console.log('Text fallback script loaded');
  
  // Make all text elements visible
  const textElements = document.querySelectorAll('h1, h2, .bio, .bio-description, .project-title, .project-description, .link-card span');
  textElements.forEach(el => {
    el.style.visibility = 'visible';
    el.style.opacity = '1';
    
    // Ensure text wrapping for specific elements
    if (el.classList.contains('bio-description')) {
      el.style.whiteSpace = 'normal';
      el.style.wordWrap = 'break-word';
      el.style.overflowWrap = 'break-word';
      el.style.maxWidth = '100%';
    }
  });
  
  // Use the profile tags handler if available
  if (typeof window.ensureProfileTags === 'function') {
    window.ensureProfileTags();
  }
  
  // Ensure bio description is visible and properly styled
  const bioDescription = document.querySelector('.bio-description');
  if (bioDescription) {
    bioDescription.style.visibility = 'visible';
    bioDescription.style.opacity = '1';
    bioDescription.style.whiteSpace = 'normal';
    bioDescription.style.wordWrap = 'break-word';
    bioDescription.style.overflowWrap = 'break-word';
    bioDescription.style.width = '100%';
    bioDescription.style.maxWidth = '100%';
    bioDescription.style.textAlign = 'center';
  }
  
  // Ensure project descriptions are visible
  document.querySelectorAll('.project-description').forEach(desc => {
    desc.style.visibility = 'visible';
    desc.style.opacity = '1';
    desc.style.whiteSpace = 'normal';
    desc.style.wordWrap = 'break-word';
    desc.style.overflowWrap = 'break-word';
  });
  
  // Ensure link card text is visible
  document.querySelectorAll('.link-card span').forEach(span => {
    span.style.visibility = 'visible';
    span.style.opacity = '1';
  });
  
  console.log('Text fallback complete');
}); 