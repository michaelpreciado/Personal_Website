export const theme = {
  colors: {
    // Terminal-inspired cyberpunk color scheme
    background: '#001215',
    backgroundTransparent: 'rgba(0, 18, 21, 0.95)',
    backgroundOverlay: 'rgba(0, 18, 21, 0.85)',
    primary: '#00D6FF', // Terminal cyan
    primaryBright: '#00FFFF',
    primaryDim: 'rgba(0, 214, 255, 0.8)',
    primaryDark: 'rgba(0, 214, 255, 0.4)',
    secondary: 'rgba(26, 31, 35, 0.7)', // GitHub dark
    secondaryDark: '#1a1f23',
    tertiary: 'rgba(0, 119, 181, 0.7)', // LinkedIn blue
    tertiaryDark: '#006396',
    quaternary: 'rgba(26, 31, 35, 0.7)', // Dark gray
    quaternaryDark: '#15191c',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(0, 214, 255, 0.4)',
    borderActive: 'rgba(0, 214, 255, 0.8)',
    cardBackground: 'rgba(0, 18, 21, 0.7)',
    cardBackgroundActive: 'rgba(0, 18, 21, 0.9)',
    cardBackgroundHover: 'rgba(0, 18, 21, 0.8)',
    buttonBackground: 'rgba(0, 214, 255, 0.1)',
    buttonBackgroundHover: 'rgba(0, 214, 255, 0.2)',
    shadow: 'rgba(0, 0, 0, 0.2)',
    shadowStrong: 'rgba(0, 0, 0, 0.3)',
    glow: '0 0 10px rgba(0, 230, 255, 0.6)',
    glowStrong: '0 0 20px rgba(0, 230, 255, 0.8)',
  },
  fonts: {
    // Optimized for readability on mobile
    primary: "'Source Code Pro', monospace",
    secondary: "'Fira Code', monospace",
    terminal: "'Share Tech Mono', monospace",
    sizes: {
      // Responsive font sizes using clamp for better scaling
      xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
      sm: 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
      md: 'clamp(1rem, 0.9rem + 0.375vw, 1.125rem)',
      lg: 'clamp(1.125rem, 1rem + 0.5vw, 1.25rem)',
      xl: 'clamp(1.25rem, 1.1rem + 0.625vw, 1.5rem)',
      xxl: 'clamp(1.5rem, 1.3rem + 0.75vw, 1.875rem)',
      xxxl: 'clamp(1.875rem, 1.6rem + 1vw, 2.25rem)'
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em'
    },
  },
  spacing: {
    // Responsive spacing using clamp
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    // Safe area insets for notched devices
    safeTop: "max(env(safe-area-inset-top), 0px)",
    safeRight: "max(env(safe-area-inset-right), 0px)",
    safeBottom: "max(env(safe-area-inset-bottom), 0px)",
    safeLeft: "max(env(safe-area-inset-left), 0px)",
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '24px',
    pill: '9999px',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  zIndices: {
    base: -1,
    overlay: 100,
    modal: 200,
    tooltip: 300
  },
  shadows: {
    subtle: '0 2px 10px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 20px rgba(0, 0, 0, 0.15)',
    strong: '0 8px 30px rgba(0, 0, 0, 0.2)'
  },
  // Touch target sizes for mobile
  touchTargets: {
    min: '44px', // Minimum size for all interactive elements
    spacing: '8px', // Minimum spacing between touch targets
  },
  effects: {
    glow: '0 0 10px rgba(0, 230, 255, 0.6)',
    glowStrong: '0 0 20px rgba(0, 230, 255, 0.8)'
  }
}; 