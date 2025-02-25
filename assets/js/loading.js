// Enhanced loading animation
document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  const loaderContent = document.querySelector('.loader-content');
  const isDesktop = window.matchMedia('(min-width: 1200px)').matches;
  
  if (!loader) return;
  
  // Enhanced loading animation for desktop
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
      }, 500);
    }, totalDelay + 1200);
  } else {
    // Simpler loading for mobile
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

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