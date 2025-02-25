import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faXmark,
  faMapMarkerAlt,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, 
  faGithub, 
  faXTwitter,
  faInstagram,
  faTiktok,
  faEtsy
} from '@fortawesome/free-brands-svg-icons';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('button[aria-label="Open menu"]')) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.classList.add('no-scroll');
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Handle touch swipe to close
  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX < -50) {
        // Swiped right to left
        toggleSidebar();
      }
    };
    
    const sidebar = sidebarRef.current;
    sidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
    sidebar.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      sidebar.removeEventListener('touchstart', handleTouchStart);
      sidebar.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, toggleSidebar]);

  const sidebarVariants = {
    hidden: { 
      x: '100%',
      opacity: 0.5,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && (
          <SidebarContainer 
            ref={sidebarRef}
            as={motion.aside}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <SidebarContent ref={contentRef}>
              <CloseButton 
                onClick={toggleSidebar}
                aria-label="Close menu"
                whileTap={{ scale: 0.9 }}
                as={motion.button}
              >
                <FontAwesomeIcon icon={faXmark} />
              </CloseButton>
              
              <SidebarTitle
                as={motion.h2}
                variants={itemVariants}
              >
                Let's Connect!
              </SidebarTitle>
              
              <ContactList>
                <ContactItem
                  as={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ContactLink 
                    href="mailto:mpreciado1997@gmail.com"
                    rel="noopener noreferrer"
                  >
                    <ContactIcon>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </ContactIcon>
                    <ContactText>mpreciado1997@gmail.com</ContactText>
                  </ContactLink>
                </ContactItem>
                
                <ContactItem
                  as={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ContactLink 
                    href="https://www.linkedin.com/in/michael-preciado-74959b227/" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ContactIcon>
                      <FontAwesomeIcon icon={faLinkedin} />
                    </ContactIcon>
                    <ContactText>LinkedIn</ContactText>
                    <ExternalIcon>
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </ExternalIcon>
                  </ContactLink>
                </ContactItem>
                
                <ContactItem
                  as={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ContactLink 
                    href="https://github.com/michaelpreciado" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ContactIcon>
                      <FontAwesomeIcon icon={faGithub} />
                    </ContactIcon>
                    <ContactText>GitHub</ContactText>
                    <ExternalIcon>
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </ExternalIcon>
                  </ContactLink>
                </ContactItem>
                
                <ContactItem
                  as={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ContactLink 
                    href="https://x.com/mpdollars" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ContactIcon>
                      <FontAwesomeIcon icon={faXTwitter} />
                    </ContactIcon>
                    <ContactText>X (Twitter)</ContactText>
                    <ExternalIcon>
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </ExternalIcon>
                  </ContactLink>
                </ContactItem>
                
                <ContactItem
                  as={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ContactLink 
                    href="https://www.instagram.com/michael.preciado/" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ContactIcon>
                      <FontAwesomeIcon icon={faInstagram} />
                    </ContactIcon>
                    <ContactText>Instagram</ContactText>
                    <ExternalIcon>
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </ExternalIcon>
                  </ContactLink>
                </ContactItem>
                
                <ContactItem
                  as={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ContactLink 
                    href="https://www.tiktok.com/@.michael.preciado" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ContactIcon>
                      <FontAwesomeIcon icon={faTiktok} />
                    </ContactIcon>
                    <ContactText>TikTok</ContactText>
                    <ExternalIcon>
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </ExternalIcon>
                  </ContactLink>
                </ContactItem>
                
                <ContactItem
                  as={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ContactLink 
                    href="https://www.etsy.com/shop/PrintsByPreciado" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ContactIcon>
                      <FontAwesomeIcon icon={faEtsy} />
                    </ContactIcon>
                    <ContactText>Etsy Shop</ContactText>
                    <ExternalIcon>
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                    </ExternalIcon>
                  </ContactLink>
                </ContactItem>
              </ContactList>
              
              <LocationInfo
                as={motion.div}
                variants={itemVariants}
              >
                <LocationText>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> California, United States
                </LocationText>
              </LocationInfo>
            </SidebarContent>
          </SidebarContainer>
        )}
      </AnimatePresence>
    </>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${({ theme }) => theme.zIndices.sidebar - 1};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  @supports (padding: max(0px)) {
    padding-top: max(0px, env(safe-area-inset-top));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
    padding-left: max(0px, env(safe-area-inset-left));
  }
`;

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: ${({ theme }) => theme.colors.backgroundTransparent};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: ${({ theme }) => theme.zIndices.sidebar};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
  
  /* iOS safe area support */
  @supports (padding: max(0px)) {
    padding-top: max(0px, env(safe-area-inset-top));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
    padding-left: max(0px, env(safe-area-inset-left));
    height: 100vh;
    height: -webkit-fill-available;
  }
  
  /* Terminal-style scanline effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 50%,
      rgba(0, 230, 255, 0.025) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    animation: scanline 15s linear infinite;
    opacity: 0.3;
    z-index: -1;
  }
  
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const SidebarContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  flex-direction: column;
  min-height: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.buttonBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
    border-color: ${({ theme }) => theme.colors.borderActive};
  }
  
  /* Larger touch target for mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 48px;
    height: 48px;
    top: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.sm};
  }
  
  /* iOS safe area support */
  @supports (padding: max(0px)) {
    top: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-top));
    right: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-right));
  }
`;

const SidebarTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  color: ${({ theme }) => theme.colors.primaryBright};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  text-align: center;
  text-shadow: ${({ theme }) => theme.colors.glow};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing.xxl};
  }
`;

const ContactList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ContactItem = styled(motion.div)`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.buttonBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  min-height: 60px;
  
  &:hover, &:active {
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
    border-color: ${({ theme }) => theme.colors.borderActive};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-height: 56px;
  }
`;

const ContactIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  width: 24px;
  margin-right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primaryBright};
  text-shadow: ${({ theme }) => theme.colors.glow};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const ContactText = styled.span`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
  }
`;

const ExternalIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  margin-left: ${({ theme }) => theme.spacing.sm};
  
  ${ContactLink}:hover & {
    opacity: 1;
  }
`;

const LocationInfo = styled(motion.div)`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const LocationText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

export default Sidebar; 