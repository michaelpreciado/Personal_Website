import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Header = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === '/';
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer $sidebarOpen={sidebarOpen} $scrolled={scrolled}>
      <HeaderContent>
        {!isHomePage ? (
          <BackButton 
            to="/"
            aria-label="Back to home"
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <BackText>Home</BackText>
          </BackButton>
        ) : (
          <Logo 
            to="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogoText>MP</LogoText>
          </Logo>
        )}
        
        <MenuButton 
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          $isActive={sidebarOpen}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <IconWrapper
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </IconWrapper>
            ) : (
              <IconWrapper
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon icon={faBars} />
              </IconWrapper>
            )}
          </AnimatePresence>
          <MenuText>Menu</MenuText>
        </MenuButton>
      </HeaderContent>
      <HeaderBorder $scrolled={scrolled} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme, $scrolled }) => 
    $scrolled 
      ? theme.colors.backgroundTransparent 
      : 'rgba(0, 18, 21, 0.85)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: ${({ theme }) => theme.zIndices.header};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  /* iOS safe area support */
  @supports (padding: max(0px)) {
    padding-top: max(0px, env(safe-area-inset-top));
    height: calc(60px + env(safe-area-inset-top));
  }
  
  /* Hide header when sidebar is open on mobile */
  ${({ $sidebarOpen }) => $sidebarOpen && `
    @media (max-width: 768px) {
      transform: translateY(-100%);
    }
  `}
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const HeaderBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 40%;
  width: ${({ $scrolled }) => ($scrolled ? '30%' : '20%')};
  height: 2px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.colors.glow};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 35%;
    width: ${({ $scrolled }) => ($scrolled ? '40%' : '30%')};
  }
`;

const Logo = styled(motion(Link))`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  text-shadow: ${({ theme }) => theme.colors.glow};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
  }
`;

const LogoText = styled.span`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform ${({ theme }) => theme.transitions.normal};
  }
  
  ${Logo}:hover &::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const BackButton = styled(motion(Link))`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.buttonBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
    border-color: ${({ theme }) => theme.colors.borderActive};
  }
  
  /* Ensure touch target size */
  min-height: 44px;
  min-width: 44px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs};
    min-width: 40px;
  }
`;

const BackText = styled.span`
  margin-left: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const MenuButton = styled(motion.button)`
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primaryBright : theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.buttonBackgroundHover : theme.colors.buttonBackground};
  border: 1px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.borderActive : theme.colors.border};
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.header + 1};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
    border-color: ${({ theme }) => theme.colors.borderActive};
  }
  
  /* Ensure touch target size */
  min-height: 44px;
  min-width: 44px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 48px;
  }
`;

const MenuText = styled.span`
  margin-left: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const IconWrapper = styled(motion.span)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header; 