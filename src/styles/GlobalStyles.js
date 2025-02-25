import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Import fonts with display=swap for better performance */
  @font-face {
    font-family: 'SF Mono';
    src: local('SF Mono'), local('SFMono-Regular');
    font-display: swap;
  }
  
  @font-face {
    font-family: 'SF Pro Text';
    src: local('SF Pro Text'), local('SFProText-Regular');
    font-display: swap;
  }
  
  @font-face {
    font-family: 'SF Pro Display';
    src: local('SF Pro Display'), local('SFProDisplay-Regular');
    font-display: swap;
  }
  
  /* Fallback web fonts */
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    /* iOS height fix */
    --vh: 1vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
  }

  html {
    font-size: 16px;
    height: 100%;
    scroll-behavior: smooth;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 15px;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 14px;
    }
    
    /* Prevent text size adjustment after orientation changes on iOS */
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;
    
    /* iOS-specific optimizations */
    @supports (-webkit-touch-callout: none) {
      /* Prevent callouts */
      -webkit-touch-callout: none;
      
      /* Prevent tap highlight */
      -webkit-tap-highlight-color: transparent;
      
      /* Momentum scrolling */
      -webkit-overflow-scrolling: touch;
      
      /* Fix 100vh issue on iOS */
      min-height: -webkit-fill-available;
      
      /* Prevent text selection on interactive elements */
      user-select: none;
    }
    
    /* High-DPI screens */
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      -webkit-font-smoothing: subpixel-antialiased;
    }
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Improved image rendering */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    
    /* Prevent layout shifts */
    content-visibility: auto;
    
    /* Prevent image drag */
    -webkit-user-drag: none;
    user-drag: none;
  }

  /* Better link styling */
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color ${({ theme }) => theme.transitions.fast};
    
    /* Ensure touch targets are large enough */
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: inline-block;
      min-height: ${({ theme }) => theme.touchTargets.min};
      padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    }
  }

  /* Improved button styling */
  button {
    background: none;
    border: none;
    font-family: inherit;
    color: inherit;
    cursor: pointer;
    
    /* Ensure touch targets are large enough */
    min-height: ${({ theme }) => theme.touchTargets.min};
    min-width: ${({ theme }) => theme.touchTargets.min};
    
    /* Prevent text selection */
    -webkit-user-select: none;
    user-select: none;
    
    /* Remove tap highlight */
    -webkit-tap-highlight-color: transparent;
    
    /* Improve touch feedback */
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s ease;
    }
  }

  /* List styling */
  ul, ol {
    list-style: none;
    padding-left: ${({ theme }) => theme.spacing.md};
  }

  /* Improved focus styles for accessibility */
  a:focus-visible, button:focus-visible, input:focus-visible, 
  textarea:focus-visible, select:focus-visible, [tabindex]:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 214, 255, 0.2);
  }

  /* Remove focus outline for mouse users, maintain for keyboard */
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
    line-height: ${({ theme }) => theme.fonts.lineHeights.tight};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 {
    font-size: ${({ theme }) => theme.fonts.sizes.xxxl};
    letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.tight};
  }

  h2 {
    font-size: ${({ theme }) => theme.fonts.sizes.xxl};
    letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.tight};
  }

  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.xl};
  }

  h4 {
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-family: ${({ theme }) => theme.fonts.secondary};
  }

  /* Code blocks */
  code, pre {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 0.9em;
  }

  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Safe area insets for notched devices */
  @supports (padding: max(0px)) {
    body, .safe-area-padding {
      padding-top: max(0px, env(safe-area-inset-top));
      padding-right: max(0px, env(safe-area-inset-right));
      padding-bottom: max(0px, env(safe-area-inset-bottom));
      padding-left: max(0px, env(safe-area-inset-left));
    }
    
    .safe-area-top {
      padding-top: max(0px, env(safe-area-inset-top));
    }
    
    .safe-area-bottom {
      padding-bottom: max(0px, env(safe-area-inset-bottom));
    }
  }
  
  /* Fix iOS 100vh issue */
  .full-height {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
  
  /* Prevent body scroll when modal is open */
  body.no-scroll {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  
  /* Terminal-style scanline effect */
  .scanline-effect::after {
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
    z-index: 0;
  }
  
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  
  /* Improved scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(0, 18, 21, 0.5);
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 214, 255, 0.3);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 214, 255, 0.5);
  }
  
  /* Hide scrollbar on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
  }
`; 