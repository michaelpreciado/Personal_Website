import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import { useViewportHeight } from '../../hooks/useViewportHeight';

const LayoutContainer = styled.div`
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  position: relative;
  overflow-x: hidden;
`;

const Main = styled(motion.main)`
  padding-top: 60px; /* Height of the header */
  min-height: calc(100vh - 60px);
  min-height: calc((var(--vh, 1vh) * 100) - 60px);
`;

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Use custom hook for viewport height
  useViewportHeight();

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    in: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -10
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3
  };

  return (
    <LayoutContainer>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <AnimatePresence mode="wait">
        <Main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet />
        </Main>
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default Layout; 