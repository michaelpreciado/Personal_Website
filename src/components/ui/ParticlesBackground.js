import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getParticleDensity } from '../../utils/viewport';

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndices.base};
  pointer-events: none;
  
  /* Optimize for mobile performance */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    opacity: 0.4;
  }
  
  /* Further reduce opacity on small screens */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    opacity: 0.3;
  }
  
  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    opacity: 0.2;
  }
`;

const ParticlesBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only load particles.js if it's available
    if (window.particlesJS) {
      const particleDensity = getParticleDensity();
      
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: window.innerWidth < 768 ? 30 : 60,
            density: {
              enable: true,
              value_area: window.innerWidth < 768 ? 800 : 1200
            }
          },
          color: {
            value: "#00FFFF"
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#fff'
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 120,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: false
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            }
          }
        },
        retina_detect: true,
        // Reduce particle count on mobile for better performance
        responsive: [
          {
            breakpoint: 768,
            options: {
              particles: {
                number: {
                  value: 50
                },
                line_linked: {
                  opacity: 0.3
                }
              }
            }
          },
          {
            breakpoint: 480,
            options: {
              particles: {
                number: {
                  value: 30
                },
                line_linked: {
                  opacity: 0.2
                }
              }
            }
          }
        ]
      });
    }
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e) => {
      if (e.matches && containerRef.current) {
        containerRef.current.style.opacity = '0.3';
        
        // If particles.js is loaded, reduce animation
        if (window.pJSDom && window.pJSDom.length > 0) {
          try {
            window.pJSDom[0].pJS.particles.move.speed = 0.5;
            window.pJSDom[0].pJS.particles.opacity.value = 0.2;
          } catch (err) {
            console.log('Could not adjust particles for reduced motion');
          }
        }
      }
    };
    
    handleReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', handleReducedMotion);
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotion);
    };
  }, []);

  return <ParticlesContainer ref={containerRef} id="particles-js" />;
};

export default ParticlesBackground; 