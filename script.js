/* Initialize particles.js */
document.addEventListener('DOMContentLoaded', function() {
    // Fix for mobile viewport height
    fixMobileViewportHeight();
    
    // Improve clickability of all interactive elements
    improveClickability();
    
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#00FFFF", "#FF00C1", "#9400D3"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: false,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.3,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.3,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00FFFF",
                opacity: 0.4,
                width: 1,
                shadow: {
                    enable: true,
                    color: "#00FFFF",
                    blur: 5
                }
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "bounce",
                bounce: true,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
    
    // Re-apply clickability fix after any dynamic content loads
    setTimeout(improveClickability, 1000);
});

/* Pip-Boy Particles Configuration */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": ["#00FFFF", "#FF00C1", "#9400D3"]
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.6,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.3,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00FFFF",
      "opacity": 0.4,
      "width": 1,
      "shadow": {
        "enable": true,
        "color": "#00FFFF",
        "blur": 5
      }
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": true,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 0.8
        }
      },
      "push": {
        "particles_nb": 4
      }
    }
  },
  "retina_detect": true
});

// Carousel Configuration
const ANIMATION_DURATION = 400;
const TOUCH_CONFIG = {
    threshold: 20,
    velocityThreshold: 0.5,
    maxBounceOffset: 100,
    bounceDistance: 30
};

class ProjectCarousel {
    constructor() {
        this.track = document.querySelector('.projects-track');
        this.cards = Array.from(this.track.getElementsByClassName('project-card'));
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nextButton = document.querySelector('.carousel-button.next');
        
        this.state = {
            currentIndex: 0,
            isScrolling: false,
            touch: {
                startY: 0,
                lastY: 0,
                offset: 0,
                velocity: 0,
                lastTime: 0
            },
            animationFrame: null
        };
        
        this.initializeCarousel();
    }
    
    initializeCarousel() {
        this.updateCards();
        this.setupEventListeners();
    }
    
    updateCards(offset = 0) {
        this.cards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'far-far-prev');
            
            const position = index - this.state.currentIndex;
            
            // Apply transform for touch movement
            const transform = offset !== 0 ? `translateY(${offset}px)` : '';
            card.style.transform = transform;
            card.style.transition = offset !== 0 ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
            
            // Add position class
            if (position === 0) card.classList.add('active');
            else if (position === -1) card.classList.add('prev');
            else if (position === -2) card.classList.add('far-prev');
            else if (position <= -3) card.classList.add('far-far-prev');
            else if (position === 1) card.classList.add('next');
            else if (position >= 2) card.classList.add('far-next');
        });
        
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        const { currentIndex } = this.state;
        const isAtStart = currentIndex <= 0;
        const isAtEnd = currentIndex >= this.cards.length - 1;
        
        this.prevButton.style.opacity = isAtStart ? "0.5" : "1";
        this.nextButton.style.opacity = isAtEnd ? "0.5" : "1";
        this.prevButton.classList.toggle('active', !isAtStart);
        this.nextButton.classList.toggle('active', !isAtEnd);
    }
    
    async slide(direction, animate = true) {
        if (this.state.isScrolling) return;
        
        const isNext = direction === 'next';
        const canMove = isNext ? 
            this.state.currentIndex < this.cards.length - 1 : 
            this.state.currentIndex > 0;
        
        this.state.isScrolling = true;
        
        if (!canMove) {
            this.applyBounceEffect(direction);
            // Reset isScrolling after bounce animation
            setTimeout(() => {
                this.state.isScrolling = false;
            }, 200);
            return;
        }
        
        this.state.currentIndex += isNext ? 1 : -1;
        this.updateCards();
        
        if (animate) {
            const button = isNext ? this.nextButton : this.prevButton;
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 200);
        }
        
        // Ensure isScrolling is reset after animation or immediately if not animating
        setTimeout(() => {
            this.state.isScrolling = false;
        }, animate ? ANIMATION_DURATION : 0);
    }
    
    applyBounceEffect(direction) {
        const bounceOffset = direction === 'next' ? -TOUCH_CONFIG.bounceDistance : TOUCH_CONFIG.bounceDistance;
        this.updateCards(bounceOffset);
        setTimeout(() => this.updateCards(0), 200);
    }
    
    handleTouchStart(e) {
        if (this.state.animationFrame) {
            cancelAnimationFrame(this.state.animationFrame);
        }
        
        // Force reset isScrolling state on new touch
        this.state.isScrolling = false;
        
        const touch = e.touches[0];
        this.state.touch = {
            startY: touch.clientY,
            lastY: touch.clientY,
            lastTime: Date.now(),
            velocity: 0,
            offset: 0
        };
        
        this.cards.forEach(card => card.style.transition = 'none');
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const currentTime = Date.now();
        const deltaY = touch.clientY - this.state.touch.lastY;
        const deltaTime = currentTime - this.state.touch.lastTime;
        
        // Update velocity
        if (deltaTime > 0) {
            this.state.touch.velocity = deltaY / deltaTime;
        }
        
        // Update touch tracking
        this.state.touch.lastY = touch.clientY;
        this.state.touch.lastTime = currentTime;
        
        // Calculate offset with boundary resistance
        this.state.touch.offset = touch.clientY - this.state.touch.startY;
        
        // Apply resistance at boundaries
        if (this.state.currentIndex <= 0 && this.state.touch.offset > 0) {
            this.state.touch.offset = Math.sqrt(this.state.touch.offset) * 5;
        } else if (this.state.currentIndex >= this.cards.length - 1 && this.state.touch.offset < 0) {
            this.state.touch.offset = -Math.sqrt(-this.state.touch.offset) * 5;
        }
        
        this.updateCards(this.state.touch.offset);
    }
    
    handleTouchEnd() {
        const { velocity, offset } = this.state.touch;
        const absVelocity = Math.abs(velocity);
        
        if (absVelocity > TOUCH_CONFIG.velocityThreshold || Math.abs(offset) > TOUCH_CONFIG.threshold) {
            if (velocity < 0 || offset < -TOUCH_CONFIG.threshold) {
                this.slide('next', false);
            } else if (velocity > 0 || offset > TOUCH_CONFIG.threshold) {
                this.slide('prev', false);
            }
        } else {
            this.updateCards(0);
            // Reset isScrolling state if no slide occurs
            this.state.isScrolling = false;
        }
        
        // Reset touch state
        this.state.touch = {
            startY: 0,
            lastY: 0,
            offset: 0,
            velocity: 0,
            lastTime: 0
        };
        
        // Safety timeout to ensure isScrolling is eventually reset
        setTimeout(() => {
            this.state.isScrolling = false;
        }, ANIMATION_DURATION + 100);
    }
    
    setupEventListeners() {
        // Touch Events
        this.track.addEventListener('touchstart', e => this.handleTouchStart(e), { passive: true });
        this.track.addEventListener('touchmove', e => this.handleTouchMove(e), { passive: false });
        this.track.addEventListener('touchend', () => this.handleTouchEnd());
        
        // Mouse Wheel
        let wheelTimeout;
        this.track.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (wheelTimeout) clearTimeout(wheelTimeout);
            
            wheelTimeout = setTimeout(() => {
                this.slide(e.deltaY > 0 ? 'next' : 'prev');
            }, 50);
        }, { passive: false });
        
        // Button Clicks
        this.nextButton.addEventListener('click', () => this.slide('next'));
        this.prevButton.addEventListener('click', () => this.slide('prev'));
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new ProjectCarousel();
});

// Function to type text with animation
const typeText = (element, text, speed = 20) => {
    if (!element || !text) return Promise.resolve();
    
    // Ensure element is visible
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    
    // Clear the element first
    element.textContent = '';
    
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
        
        // Fallback in case animation fails
        setTimeout(() => {
            if (element.textContent !== text) {
                element.textContent = text;
                clearInterval(interval);
                resolve();
            }
        }, text.length * speed + 1000);
    });
};

// Define the sequence of elements to animate
const TYPING_SEQUENCE = [
    '.profile-header-text h1',
    '.profile-header-text h2',
    '.job-ready-description p',
    '.bio-card:nth-child(1) h3',
    '.bio-card:nth-child(1) p',
    '.bio-card:nth-child(2) h3',
    '.bio-card:nth-child(2) p',
    '.bio-card:nth-child(3) h3',
    '.bio-card:nth-child(3) p'
];

// Initialize typing effects in sequence
async function initializeTypingEffects() {
    console.log('Initializing typing effects...');
    // Ensure all elements are visible initially
    TYPING_SEQUENCE.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`Preparing element: ${selector}`);
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        }
    });
    
    // Type each element in sequence
    for (const selector of TYPING_SEQUENCE) {
        const element = document.querySelector(selector);
        if (element && element.dataset.typeEffect) {
            console.log(`Typing text for element: ${selector}`);
            // Type the text
            await typeText(element, element.dataset.typeEffect);
            
            // Add small delay between elements
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    console.log('Typing effects completed.');
}

// Ensure proper initialization
document.addEventListener('DOMContentLoaded', () => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initializeTypingEffects, 500);
    } else {
        document.addEventListener('DOMContentLoaded', initializeTypingEffects);
    }
});

// Optimized animation handling with IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // Animate cards on scroll
    const animatedElements = document.querySelectorAll('.profile-card, .bio-card, .project-card');
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

    // Simplified scroll handler for particles only
    let scrollTimeout;
    const scrollHandler = () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const particles = document.getElementById('particles-js');
            
            if (particles) {
                // Only fade particle elements, not the background
                const canvas = particles.querySelector('canvas');
                if (canvas) {
                    const opacity = Math.max(0.3, 1 - (scrolled / maxScroll));
                    canvas.style.opacity = opacity;
                }
                
                // Maintain solid background
                particles.style.background = 'var(--term-bg)';
                particles.style.opacity = 1;
            }
        });
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Simplified card touch interactions - only for tap detection
    const cards = document.querySelectorAll('.project-card, .bio-card');
    cards.forEach(card => {
        let touchStartTime;
        let touchStartX;
        let touchStartY;
        
        card.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            
            // Very subtle scale effect
            card.style.transform = 'scale(0.995)';
            card.style.transition = 'transform 0.1s ease';
        }, { passive: true });

        card.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const touchDuration = Date.now() - touchStartTime;
            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);

            // Remove scale effect
            card.style.transform = '';
            
            // Only trigger tap if it's a quick, small movement
            if (touchDuration < 150 && deltaX < 10 && deltaY < 10) {
                const link = card.querySelector('a');
                if (link) link.click();
            }
        }, { passive: true });

        card.addEventListener('touchcancel', () => {
            card.style.transform = '';
        }, { passive: true });
    });

    // Start typing effects
    initializeTypingEffects();
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Responsive navigation
const initResponsiveNav = () => {
    const nav = document.querySelector('.profile-social-links');
    if (!nav) return;

    const handleResize = () => {
        requestAnimationFrame(() => {
            nav.style.display = window.innerWidth < 768 ? 'grid' : 'flex';
        });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
};

// Terminal Typing Animation
async function initTerminalAnimation() {
    // Add terminal scan effect
    const scanLine = document.createElement('div');
    scanLine.className = 'terminal-scan';
    document.body.appendChild(scanLine);

    // Get all text elements
    const textElements = [
        document.querySelector('.profile-card h1'),
        document.querySelector('.profile-card h2'),
        ...document.querySelectorAll('.bio-card h3'),
        ...document.querySelectorAll('.bio-card p')
    ];
    
    // Store original text and prepare elements
    const originalTexts = textElements.map(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.visibility = 'visible';
        el.classList.add('terminal-text');
        el.setAttribute('data-text', text);
        return text;
    });
    
    // Add typing class to bio cards
    document.querySelectorAll('.bio-card').forEach(card => {
        card.classList.add('typing');
    });
    
    // Type all text simultaneously with increased speed
    await Promise.all(textElements.map((element, index) => 
        typeText(element, originalTexts[index], 5, Math.random() * 200) // Random start delay between 0-200ms
    ));
    
    // Function to apply random glitch effect with larger delay
    function applyRandomGlitch(element) {
        const delay = Math.random() * 20000 + 10000; // Random delay between 10-30 seconds
        setTimeout(() => {
            element.classList.add('flicker');
        }, delay);
    }
    
    // Randomly trigger glitches
    function startRandomGlitches() {
        textElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.2) { // 20% chance of glitch per interval
                    applyRandomGlitch(element);
                }
            }, Math.random() * 8000 + 4000); // Random interval between 4-12 seconds
        });
    }
    
    // Start random glitches after initial animation
    startRandomGlitches();
    
    // Remove scan line faster
    setTimeout(() => {
        scanLine.style.opacity = '0';
        setTimeout(() => scanLine.remove(), 200);
    }, 500);
}

// Function to apply random flicker effect with larger delay
function applyRandomFlicker(element) {
    const delay = Math.random() * 10000; // Random delay up to 10 seconds
    setTimeout(() => {
        element.classList.add('flicker');
    }, delay);
}

// Apply random flicker to each bio card
const bioCards = document.querySelectorAll('.bio-card');
bioCards.forEach(card => applyRandomFlicker(card));

// Apply random flicker to each project card
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => applyRandomFlicker(card));

// Add flicker class in CSS
// .flicker { animation: terminalFlicker 10s infinite; }

document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.profile-header-text h1');
    const fullName = 'Michael Preciado';
    let currentIndex = 0;

    function typeLetter() {
        if (currentIndex < fullName.length) {
            nameElement.textContent = fullName.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeLetter, 100); // Adjusted speed for clarity
        } else {
            nameElement.classList.add('glitch');
        }
    }

    nameElement.textContent = '';
    typeLetter();
});

// Terminal typing effect
function initTerminalAnimations() {
  document.querySelectorAll('[data-terminal]').forEach(el => {
    const text = el.dataset.terminal;
    el.innerHTML = '';
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animation = `terminalGlow 0.5s ${i * 0.05}s both`;
      el.appendChild(span);
    });
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  initTerminalAnimations();
  
  // Add neural connection animation
  const paths = document.querySelectorAll('.neural-connection');
  paths.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });
});

// Add random glitch triggers
setInterval(() => {
    const glitchElements = document.querySelectorAll('[class*="cyan"]');
    glitchElements.forEach(el => {
        el.style.animation = 'lineGlitch 0.8s';
        setTimeout(() => {
            el.style.animation = 'lineGlitch 6s infinite';
        }, 800);
    });
}, 15000); // Trigger every 15 seconds

setInterval(() => {
    document.querySelectorAll('.dev-placeholder').forEach(placeholder => {
        placeholder.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
            placeholder.style.transform = 'translateX(0)';
        }, 50);
    });
}, 5000);

// Enhanced Sidebar Functionality for iOS
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    if (sidebar.classList.contains('active')) {
        // Closing sidebar
        sidebar.classList.remove('active');
        body.classList.remove('sidebar-open');
        
        // Re-enable scrolling after animation
        setTimeout(() => {
            body.style.position = '';
            body.style.width = '';
            body.style.top = '';
            window.scrollTo(0, parseInt(body.style.top || '0') * -1);
        }, 300);
    } else {
        // Opening sidebar - Store current scroll position
        const scrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = `-${scrollY}px`;
        sidebar.classList.add('active');
        body.classList.add('sidebar-open');
        
        // On mobile, ensure the sidebar is fully visible
        if (window.innerWidth <= 480) {
            // Scroll to top of sidebar content
            const sidebarContent = sidebar.querySelector('.sidebar-content');
            if (sidebarContent) {
                sidebarContent.scrollTop = 0;
            }
            
            // Ensure the sidebar is properly positioned for iOS
            if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                sidebar.style.height = `${window.innerHeight}px`;
            }
        }
    }
}

// Improved touch handling for sidebar
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarContent = sidebar.querySelector('.sidebar-content');
    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;
    let isSwiping = false;
    
    // Prevent default touch events on iOS
    sidebar.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        touchStartTime = Date.now();
        isSwiping = false;
    }, { passive: true });
    
    sidebar.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const deltaY = touchStartY - touchY;
        const deltaX = touchStartX - touchX;
        
        // Check if user is swiping horizontally to close (right to left)
        if (Math.abs(deltaX) > 30 && deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
            isSwiping = true;
            // Allow the swipe to happen naturally
            return;
        }
        
        // Only prevent default if scrolling at boundaries to allow normal scrolling
        if (!isSwiping && sidebarContent) {
            const isAtTop = sidebarContent.scrollTop <= 0;
            const isAtBottom = Math.abs(sidebarContent.scrollHeight - sidebarContent.scrollTop - sidebarContent.clientHeight) < 1;
            
            if ((deltaY > 0 && isAtTop) || (deltaY < 0 && isAtBottom)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    sidebar.addEventListener('touchend', (e) => {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        // Close sidebar on quick swipe from right to left
        if (isSwiping && touchDuration < 300) {
            toggleSidebar();
        }
    }, { passive: true });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !e.target.closest('#contact-me')) {
            toggleSidebar();
        }
    });
    
    // Close sidebar with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
});

// iOS Safari height fix
function setViewHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewHeight);
window.addEventListener('orientationchange', () => {
    setTimeout(setViewHeight, 100);
});

setViewHeight();

// Optimize scroll performance
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    document.body.classList.add('is-scrolling');
    
    isScrolling = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
    }, 66);
}, { passive: true });

// Better touch feedback for all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .bio-card');
    
    interactiveElements.forEach(element => {
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
});

// Prevent rubber-banding/overscroll on iOS
document.body.addEventListener('touchmove', (e) => {
    if (e.target === document.body) {
        e.preventDefault();
    }
}, { passive: false });

// Handle iOS keyboard
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        setTimeout(() => {
            window.scrollTo(0, window.scrollY + 1);
        }, 100);
    });
    
    input.addEventListener('blur', () => {
        setTimeout(() => {
            window.scrollTo(0, window.scrollY);
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeButton = document.querySelector('.close-sidebar');
    const body = document.body;
    
    // Touch Variables
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    // Fix iOS 100vh issue
    const setViewportHeight = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    // Initial height set and resize listener
    setViewportHeight();
    window.addEventListener('resize', () => {
        setViewportHeight();
    });
    
    // Toggle Sidebar Function
    const toggleSidebar = () => {
        const isOpen = sidebar.classList.contains('active');
        sidebar.classList.toggle('active');
        
        if (!isOpen) {
            body.classList.add('sidebar-open');
            body.style.top = `-${window.scrollY}px`;
            body.style.position = 'fixed';
        } else {
            body.classList.remove('sidebar-open');
            const scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };
    
    // Event Listeners
    menuToggle.addEventListener('click', toggleSidebar);
    closeButton.addEventListener('click', toggleSidebar);
    
    // Touch Event Handlers
    sidebar.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
    }, { passive: true });
    
    sidebar.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        touchEndX = e.touches[0].clientX;
        const diffX = touchStartX - touchEndX;
        
        // Only prevent default if swiping from right edge
        if (touchStartX > window.innerWidth - 30 && diffX < 0) {
            e.preventDefault();
        }
    }, { passive: false });
    
    sidebar.addEventListener('touchend', () => {
        if (!isSwiping) return;
        
        const diffX = touchStartX - touchEndX;
        
        // Close sidebar if swiped right to left
        if (diffX > 50) {
            toggleSidebar();
        }
        
        isSwiping = false;
    });
    
    // Prevent rubber-banding/overscroll
    document.addEventListener('touchmove', (e) => {
        if (body.classList.contains('sidebar-open')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleSidebar();
        }
    });
    
    // Handle keyboard appearance
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Add padding to prevent input from being hidden by keyboard
            sidebar.style.paddingBottom = '20vh';
        });
        
        input.addEventListener('blur', () => {
            sidebar.style.paddingBottom = '';
        });
    });
    
    // Add active state for touch feedback
    const touchElements = document.querySelectorAll('.contact-item, .menu-toggle, .close-sidebar');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.96)';
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            element.style.transform = '';
        }, { passive: true });
    });
});

// Function to start the typescript effect
function startTypescriptEffect() {
  console.log('Starting typescript effect');
  
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
  
  // Add the permanent cursor animation to headings
  const headings = document.querySelectorAll('h1');
  headings.forEach(heading => {
    const cursor = heading.querySelector('.permanent-cursor');
    if (cursor) {
      cursor.style.opacity = '1';
    }
  });
  
  // Animate all text elements letter by letter
  animateTextLetterByLetter();
  
  // Dispatch a custom event that other scripts can listen for
  document.dispatchEvent(new CustomEvent('typingEffectsReady'));
}

// Function to animate text letter by letter for all divs
function animateTextLetterByLetter() {
  // Select all divs that contain text and aren't part of the loading animation
  const textElements = document.querySelectorAll('div:not(.terminal-container):not(.terminal-line):not(.cursor):not(.loader-content):not(.ts-loading-screen):not(.ts-line):not(.ts-command):not(.ts-output):not(.profile-tag)');
  
  textElements.forEach(element => {
    // Skip elements with no text content or that already have animation
    if (!element.textContent.trim() || 
        element.classList.contains('animated') || 
        element.classList.contains('text-reveal') ||
        element.getAttribute('data-animating') === 'true' ||
        element.querySelector('[data-type-effect]') ||
        element.classList.contains('profile-tag') ||
        element.closest('.profile-tags')) {
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
        textNode.textContent = '';
        
        // Animate each letter
        for (let i = 0; i < text.length; i++) {
          setTimeout(() => {
            textNode.textContent += text[i];
            
            // When all letters are added, mark as complete
            if (i === text.length - 1) {
              element.setAttribute('data-animating', 'false');
              element.style.opacity = '1';
            }
          }, delay);
          delay += 5; // Adjust speed here
        }
      });
    } else {
      // For plain text, it's simpler
      element.textContent = '';
      element.style.opacity = '1';
      
      // Animate each letter
      let delay = 0;
      for (let i = 0; i < originalText.length; i++) {
        setTimeout(() => {
          element.textContent += originalText[i];
          
          // When all letters are added, mark as complete
          if (i === originalText.length - 1) {
            element.setAttribute('data-animating', 'false');
          }
        }, delay);
        delay += 5; // Adjust speed here
      }
    }
  });
  
  // Ensure profile tags are visible after animation
  setTimeout(() => {
    document.querySelectorAll('.profile-tag').forEach(tag => {
      tag.style.visibility = 'visible';
      tag.style.opacity = '1';
    });
  }, 500);
}

/* Fix for mobile viewport height, especially on iOS devices */
function fixMobileViewportHeight() {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // Also update on orientation change
    window.addEventListener('orientationchange', () => {
        // Wait for the orientation change to complete
        setTimeout(() => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });
    
    // Special handling for iOS devices
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Prevent elastic scrolling/bounce effect
        document.body.style.overscrollBehavior = 'none';
        document.documentElement.style.overscrollBehavior = 'none';
        
        // Fix for iOS Safari address bar showing/hiding
        window.addEventListener('scroll', () => {
            // Debounce the scroll event
            clearTimeout(window.scrollEndTimer);
            window.scrollEndTimer = setTimeout(() => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }, 100);
        });
        
        // Improve touch handling on iOS
        improveIOSTouchHandling();
    }
}

/* Improve touch handling specifically for iOS devices */
function improveIOSTouchHandling() {
    // Fix for iOS scrolling issues with interactive elements
    document.addEventListener('touchstart', function(e) {
        // Allow default touch behavior for form elements and links
        if (e.target.tagName === 'INPUT' || 
            e.target.tagName === 'TEXTAREA' || 
            e.target.tagName === 'SELECT' || 
            e.target.tagName === 'A' ||
            e.target.closest('a') ||
            e.target.closest('.interactive')) {
            return;
        }
        
        // For all other elements, prevent default touch behavior
        // that might interfere with smooth scrolling
        if (e.touches.length === 1) {
            // Single touch - might be a scroll attempt
            const touchStartY = e.touches[0].clientY;
            
            // Store the starting position
            e.target.setAttribute('data-touch-start-y', touchStartY);
        }
    }, { passive: true });
    
    // Handle touch move for smoother scrolling
    document.addEventListener('touchmove', function(e) {
        // Skip if it's an interactive element
        if (e.target.tagName === 'INPUT' || 
            e.target.tagName === 'TEXTAREA' || 
            e.target.tagName === 'SELECT' || 
            e.target.tagName === 'A' ||
            e.target.closest('a') ||
            e.target.closest('.interactive')) {
            return;
        }
        
        // For single touch movements
        if (e.touches.length === 1) {
            const touchStartY = parseInt(e.target.getAttribute('data-touch-start-y') || '0');
            const currentTouchY = e.touches[0].clientY;
            const deltaY = currentTouchY - touchStartY;
            
            // If we're at the top of the page and trying to scroll down,
            // or at the bottom and trying to scroll up, prevent the bounce effect
            if ((window.scrollY <= 0 && deltaY > 0) || 
                (window.scrollY + window.innerHeight >= document.body.scrollHeight && deltaY < 0)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    // Clean up after touch ends
    document.addEventListener('touchend', function(e) {
        if (e.target.hasAttribute('data-touch-start-y')) {
            e.target.removeAttribute('data-touch-start-y');
        }
    }, { passive: true });
}

/* Improve touch handling for all clickable elements */
function improveClickability() {
  // Get all clickable elements
  const clickableElements = document.querySelectorAll('a, button, .link-card, .project-link, .contact-button, .contact-item');
  
  // Ensure each element has proper event handling
  clickableElements.forEach(element => {
    // Add pointer cursor
    element.style.cursor = 'pointer';
    
    // Enable pointer events
    element.style.pointerEvents = 'auto';
    
    // Ensure z-index is high enough
    const currentZIndex = parseInt(window.getComputedStyle(element).zIndex, 10);
    if (isNaN(currentZIndex) || currentZIndex < 5) {
      element.style.zIndex = '5';
    }
    
    // Add touch action for mobile
    element.style.touchAction = 'manipulation';
    
    // Add tap highlight color for mobile feedback
    element.style.webkitTapHighlightColor = 'rgba(0, 230, 255, 0.3)';
    
    // Add click event listener if not already present
    if (!element._hasClickListener) {
      element.addEventListener('click', function(e) {
        // For anchor tags with href, let the default behavior handle it
        if (element.tagName === 'A' && element.getAttribute('href')) {
          return;
        }
        
        // For buttons with onclick, let the default behavior handle it
        if (element.tagName === 'BUTTON' && element.getAttribute('onclick')) {
          return;
        }
        
        // Check if this is a link-card
        if (element.classList.contains('link-card')) {
          const linkHref = element.getAttribute('href');
          if (linkHref) {
            window.open(linkHref, '_blank', 'noopener,noreferrer');
          }
        }
        
        e.stopPropagation();
      }, { passive: false });
      
      element._hasClickListener = true;
    }
  });
}

// Also call the fix when window resizes (may reveal/hide elements)
window.addEventListener('resize', function() {
  improveClickability();
});

