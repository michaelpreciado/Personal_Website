import { keyframes } from 'styled-components';

// Terminal cursor blink animation
export const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// Slow terminal flicker
export const terminalFlicker = keyframes`
  0% { opacity: 1; }
  3% { opacity: 0.7; }
  6% { opacity: 1; }
  7% { opacity: 0.7; }
  8% { opacity: 1; }
  9% { opacity: 0.7; }
  10% { opacity: 1; }
  100% { opacity: 1; }
`;

// Glitch animations
export const glitch2 = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(1px, -1px); }
`;

export const glitch3 = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-0.5px, -0.5px); }
`;

// Scanline animation
export const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

// Fade in animation
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Blink animation
export const blink = keyframes`
  0%, 100% { opacity: 0 }
  50% { opacity: 1 }
`; 