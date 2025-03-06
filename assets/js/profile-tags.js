/**
 * Profile Tags Handler
 * This script ensures profile tags are properly displayed and prevents duplication
 */

(function() {
  // Track whether tags have been processed
  let tagsProcessed = false;
  
  // Function to ensure profile tags are properly displayed
  window.ensureProfileTags = function() {
    // Prevent duplicate processing
    if (tagsProcessed) {
      console.log('Profile tags already processed');
      return;
    }
    
    console.log('Processing profile tags');
    
    // Get the profile tags container
    const tagsContainer = document.getElementById('profile-tags-container');
    if (!tagsContainer) {
      console.log('Profile tags container not found');
      return;
    }
    
    // Process each profile tag
    const tags = tagsContainer.querySelectorAll('.profile-tag');
    if (tags.length === 0) {
      console.log('No profile tags found');
      return;
    }
    
    console.log(`Found ${tags.length} profile tags`);
    
    tags.forEach(tag => {
      // Ensure tag is visible
      tag.style.visibility = 'visible';
      tag.style.opacity = '1';
      
      // Get the data-content attribute
      const tagContent = tag.getAttribute('data-content');
      
      // First, clear any existing text nodes to prevent duplication
      // We'll keep only the icon element
      let iconElement = null;
      
      // Find the icon element and remove text nodes
      Array.from(tag.childNodes).forEach(node => {
        if (node.nodeType === 1 && node.tagName === 'I') {
          iconElement = node;
        } else if (node.nodeType === 3) {
          // Remove text nodes
          tag.removeChild(node);
        }
      });
      
      // Now add the text content after the icon
      if (tagContent && iconElement) {
        // Create a text node with the content
        const textNode = document.createTextNode(' ' + tagContent);
        // Insert after the icon
        if (iconElement.nextSibling) {
          tag.insertBefore(textNode, iconElement.nextSibling);
        } else {
          tag.appendChild(textNode);
        }
      }
      
      // Apply styling
      tag.style.display = 'inline-flex';
      tag.style.alignItems = 'center';
      tag.style.justifyContent = 'center';
      tag.style.whiteSpace = 'normal';
      tag.style.wordWrap = 'break-word';
      tag.style.overflowWrap = 'break-word';
    });
    
    // Mark as processed
    tagsProcessed = true;
    console.log('Profile tags processing complete');
  };
  
  // Run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', window.ensureProfileTags);
  
  // Also run on load (in case DOMContentLoaded already fired)
  window.addEventListener('load', window.ensureProfileTags);
  
  // Run immediately if DOM is already loaded
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    window.ensureProfileTags();
  }
})(); 