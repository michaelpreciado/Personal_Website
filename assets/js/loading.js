// Enhanced loading animation
document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  const loaderContent = document.querySelector('.loader-content');
  const tsLoadingScreen = document.getElementById('ts-loading-screen');
  const isDesktop = window.matchMedia('(min-width: 1200px)').matches;
  
  // If neither loader exists, initialize text immediately
  if (!loader && !tsLoadingScreen) {
    console.log('No loader found, initializing text immediately');
    startTypescriptEffect();
    return;
  }
  
  // Handle TypeScript loading screen if it exists
  if (tsLoadingScreen) {
    console.log('TypeScript loading screen found');
    // The loading screen will be hidden by index.js
    // We just need to make sure our typing effect runs after it's hidden
    
    // Check if the loading screen is already hidden
    if (tsLoadingScreen.classList.contains('hidden')) {
      console.log('Loading screen already hidden, starting text effects');
      startTypescriptEffect();
    } else {
      // Wait for the loading screen to be hidden
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.target.classList.contains('hidden')) {
            console.log('Loading screen hidden, starting text effects');
            startTypescriptEffect();
            observer.disconnect();
          }
        });
      });
      
      observer.observe(tsLoadingScreen, { attributes: true, attributeFilter: ['class'] });
      
      // Fallback in case the observer doesn't trigger
      setTimeout(function() {
        if (!tsLoadingScreen.classList.contains('hidden')) {
          console.log('Forcing loading screen to hide');
          tsLoadingScreen.classList.add('hidden');
          startTypescriptEffect();
        }
      }, 5000);
    }
  }
  
  // Enhanced loading animation for desktop
  if (loader) {
    if (isDesktop) {
      // Create animated terminal text for desktop
      const terminalLines = [
        { text: "> Initializing system...", delay: 300 },
        { text: "> Loading resources...", delay: 800 },
        { text: "> Configuring interface...", delay: 500 },
        { text: "> Optimizing experience...", delay: 600 },
        { text: "> System ready!", delay: 400 }
      ];
      
      // Create terminal container
      const terminalContainer = document.createElement('div');
      terminalContainer.className = 'terminal-container';
      loaderContent.appendChild(terminalContainer);
      
      // Animate terminal typing
      let totalDelay = 0;
      terminalLines.forEach((line, index) => {
        totalDelay += line.delay;
        
        setTimeout(() => {
          const lineElement = document.createElement('div');
          lineElement.className = 'terminal-line';
          terminalContainer.appendChild(lineElement);
          
          // Simulate typing effect
          let i = 0;
          const typing = setInterval(() => {
            lineElement.textContent = line.text.substring(0, i);
            i++;
            if (i > line.text.length) {
              clearInterval(typing);
              lineElement.innerHTML += '<span class="cursor">█</span>';
              
              // Remove cursor from previous lines
              if (index > 0) {
                const prevLines = document.querySelectorAll('.terminal-line');
                if (prevLines[index - 1]) {
                  const cursor = prevLines[index - 1].querySelector('.cursor');
                  if (cursor) cursor.remove();
                }
              }
            }
          }, 20);
        }, totalDelay);
      });
      
      // Hide loader after all animations
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          
          // Start the text typescript effect after loading is complete
          startTypescriptEffect();
        }, 300);
      }, totalDelay + 800);
    } else {
      // Simpler loading for mobile
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          
          // Start the text typescript effect after loading is complete
          startTypescriptEffect();
        }, 300);
      }, 1000);
    }
  }
});

// Function to start the typescript effect
function startTypescriptEffect() {
  console.log('Starting typescript effect from loading.js');
  
  // Make sure all text elements are visible first
  document.querySelectorAll('h1, h2, .bio, .bio-description, .project-title, .project-description, .link-card span, div:not(.terminal-container):not(.terminal-line):not(.cursor):not(.loader-content):not(.ts-loading-screen):not(.ts-line):not(.ts-command):not(.ts-output)').forEach(el => {
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
  
  // Add the typewriter class to bio description to trigger the animation
  const bioDescription = document.querySelector('.bio-description');
  if (bioDescription) {
    console.log('Found bio description, adding typewriter class');
    bioDescription.classList.add('typewriter');
    bioDescription.style.whiteSpace = 'normal';
    bioDescription.style.wordWrap = 'break-word';
    bioDescription.style.overflowWrap = 'break-word';
    bioDescription.style.width = '100%';
    bioDescription.style.maxWidth = '100%';
    bioDescription.style.textAlign = 'center';
    
    // If the bio description has a data-type-effect attribute but is empty, fill it
    if (bioDescription.dataset.typeEffect && bioDescription.textContent.trim() === '') {
      typeText(bioDescription, bioDescription.dataset.typeEffect);
    } else {
      // Ensure the text is visible even if not animating
      bioDescription.style.visibility = 'visible';
      bioDescription.style.opacity = '1';
    }
  }
  
  // Initialize typing effects for other elements
  const typingElements = document.querySelectorAll('[data-type-effect]');
  if (typingElements.length > 0) {
    console.log(`Found ${typingElements.length} elements with data-type-effect`);
    typingElements.forEach(element => {
      if (element && element.dataset.typeEffect && element.textContent.trim() === '') {
        console.log(`Typing text for element: ${element.className}`);
        typeText(element, element.dataset.typeEffect);
      } else {
        // Ensure the text is visible even if not animating
        element.style.visibility = 'visible';
        element.style.opacity = '1';
      }
    });
  } else {
    console.log('No elements with data-type-effect found');
  }
  
  // Dispatch a custom event that other scripts can listen for
  document.dispatchEvent(new CustomEvent('typingEffectsReady'));
}

// Function to animate text letter by letter for all divs
function animateTextLetterByLetter() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion) {
    console.log('User prefers reduced motion, skipping letter-by-letter animation');
    return;
  }
  
  // Select all divs that contain text and aren't part of the loading animation
  const textElements = document.querySelectorAll('div:not(.terminal-container):not(.terminal-line):not(.cursor):not(.loader-content):not(.ts-loading-screen):not(.ts-line):not(.ts-command):not(.ts-output)');
  
  textElements.forEach(element => {
    // Skip elements with no text content or that already have animation
    if (!element.textContent.trim() || 
        element.classList.contains('animated') || 
        element.classList.contains('text-reveal') ||
        element.getAttribute('data-animating') === 'true' ||
        element.querySelector('[data-type-effect]') ||
        element.closest('nav') || // Skip navigation elements
        element.closest('button') || // Skip buttons
        element.closest('a') || // Skip links
        element.closest('header') || // Skip header elements
        element.closest('footer') || // Skip footer elements
        element.closest('.sidebar') || // Skip sidebar elements
        element.closest('.menu') || // Skip menu elements
        element.closest('form') || // Skip form elements
        element.closest('input') || // Skip input elements
        element.closest('textarea') || // Skip textarea elements
        element.closest('select') || // Skip select elements
        element.closest('[role="button"]') || // Skip elements with button role
        element.closest('[role="navigation"]') || // Skip elements with navigation role
        element.closest('[role="menu"]') || // Skip elements with menu role
        element.closest('[role="tab"]') || // Skip elements with tab role
        element.closest('[role="tabpanel"]') || // Skip elements with tabpanel role
        element.closest('[role="dialog"]') || // Skip elements with dialog role
        element.closest('[role="alert"]') || // Skip elements with alert role
        element.closest('[role="alertdialog"]') || // Skip elements with alertdialog role
        element.closest('[role="tooltip"]') || // Skip elements with tooltip role
        element.closest('[data-no-animation]') || // Skip elements with data-no-animation attribute
        element.classList.contains('no-letter-animation')) { // Skip elements with no-letter-animation class
      return;
    }
    
    // Mark element as being animated
    element.setAttribute('data-animating', 'true');
    
    // Store original text and clear the element
    const originalText = element.textContent;
    const originalHTML = element.innerHTML;
    
    // Check if element has HTML content
    const hasHTML = originalHTML !== originalText;
    
    // If element has HTML content, we need a different approach
    if (hasHTML) {
      // Create a temporary div to hold the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = originalHTML;
      
      // Get all text nodes
      const textNodes = [];
      const getTextNodes = (node) => {
        if (node.nodeType === 3) { // Text node
          if (node.textContent.trim()) {
            textNodes.push(node);
          }
        } else if (node.nodeType === 1) { // Element node
          Array.from(node.childNodes).forEach(getTextNodes);
        }
      };
      
      getTextNodes(tempDiv);
      
      // Animate each text node
      let delay = 0;
      textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const parent = textNode.parentNode;
        const index = Array.from(parent.childNodes).indexOf(textNode);
        
        // Replace text node with empty text
        const originalNode = element.querySelectorAll('*')[Array.from(tempDiv.querySelectorAll('*')).indexOf(parent)];
        if (originalNode) {
          const originalTextNode = originalNode.childNodes[index];
          if (originalTextNode) {
            const fragment = document.createDocumentFragment();
            
            // Create a span for each letter
            for (let i = 0; i < text.length; i++) {
              const letterSpan = document.createElement('span');
              letterSpan.textContent = text[i];
              letterSpan.classList.add('letter-animated');
              letterSpan.style.animationDelay = `${delay}ms`;
              fragment.appendChild(letterSpan);
              delay += 5; // Adjust speed here
            }
            
            // Replace the text node with our animated spans
            originalTextNode.parentNode.replaceChild(fragment, originalTextNode);
          }
        }
      });
    } else {
      // For plain text, it's simpler
      element.textContent = '';
      element.style.opacity = '1';
      
      // Create a span for each letter
      const fragment = document.createDocumentFragment();
      let delay = 0;
      
      for (let i = 0; i < originalText.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = originalText[i];
        letterSpan.classList.add('letter-animated');
        letterSpan.style.animationDelay = `${delay}ms`;
        fragment.appendChild(letterSpan);
        delay += 5; // Adjust speed here
      }
      
      // Add all letters to the element
      element.appendChild(fragment);
      
      // Mark as complete after all animations
      setTimeout(() => {
        element.setAttribute('data-animating', 'false');
      }, delay + 100); // Add a little extra time for the animation to complete
    }
  });
}

// Function to type text with animation
function typeText(element, text, speed = 20) {
  let i = 0;
  element.textContent = '';
  
  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      element.setAttribute('data-typing-complete', 'true');
    }
  }, speed);
}

// Add CSS for the terminal style loading animation
const style = document.createElement('style');
style.textContent = `
  .terminal-container {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 20px;
    font-family: 'Courier New', monospace;
    color: #00ff00;
    width: 400px;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    border: 1px solid #00ff00;
    margin-top: 20px;
    text-align: left;
  }
  
  .terminal-line {
    line-height: 1.6;
    margin-bottom: 10px;
    white-space: nowrap;
  }
  
  .cursor {
    animation: cursor-blink 1s infinite;
    font-weight: bold;
  }
  
  @keyframes cursor-blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @media (max-width: 480px) {
    .terminal-container {
      width: 90%;
      padding: 15px;
    }
  }
`;
document.head.appendChild(style); 