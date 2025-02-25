import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import ProjectsPage from './components/pages/ProjectsPage';
import ParticlesBackground from './components/ui/ParticlesBackground';
import { useViewportHeight } from './hooks/useViewportHeight';

const App = () => {
  // Use custom hook for viewport height
  useViewportHeight();

  return (
    <>
      <ParticlesBackground />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App; 