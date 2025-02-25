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
          }, 50);
        }, totalDelay);
      });
      
      // Hide loader after all animations
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          
          // Start the text typescript effect after loading is complete
          startTypescriptEffect();
        }, 500);
      }, totalDelay + 1200);
    } else {
      // Simpler loading for mobile
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          
          // Start the text typescript effect after loading is complete
          startTypescriptEffect();
        }, 500);
      }, 1500);
    }
  }
});

// Function to start the typescript effect
function startTypescriptEffect() {
  console.log('Starting typescript effect');
  
  // Make sure all text elements are visible first
  document.querySelectorAll('h1, h2, .bio, .bio-description, .project-title, .project-description, .profile-tag, .link-card span').forEach(el => {
    el.style.visibility = 'visible';
    el.style.opacity = '1';
  });
  
  // Add the typewriter class to bio description to trigger the animation
  const bioDescription = document.querySelector('.bio-description');
  if (bioDescription) {
    console.log('Found bio description, adding typewriter class');
    bioDescription.classList.add('typewriter');
    
    // If the bio description has a data-type-effect attribute but is empty, fill it
    if (bioDescription.dataset.typeEffect && bioDescription.textContent.trim() === '') {
      typeText(bioDescription, bioDescription.dataset.typeEffect);
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
      }
    });
  } else {
    console.log('No elements with data-type-effect found');
  }
  
  // Add the permanent cursor animation to headings
  const headings = document.querySelectorAll('h1');
  headings.forEach(heading => {
    const cursor = heading.querySelector('.permanent-cursor');
    if (cursor) {
      cursor.style.opacity = '1';
    }
  });
  
  // Dispatch a custom event that other scripts can listen for
  document.dispatchEvent(new CustomEvent('typingEffectsReady'));
}

// Function to type text with animation
function typeText(element, text, speed = 50) {
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