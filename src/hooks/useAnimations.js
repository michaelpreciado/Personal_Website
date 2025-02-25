import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const useSequentialAnimation = (sequence, dependencies = []) => {
  const controls = useAnimation();
  
  useEffect(() => {
    const runSequence = async () => {
      for (const step of sequence) {
        await controls.start(step);
      }
    };
    
    runSequence();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, controls]);
  
  return controls;
}; 