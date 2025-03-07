import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faChevronUp, 
  faChevronDown,
  faExternalLinkAlt,
  faCode,
  faMobile,
  faDatabase,
  faClock,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ProjectCard from '../ui/ProjectCard';
import { placeholderImages } from '../../assets/images/placeholder';
import { backgroundPatterns } from '../../assets/images/patterns';
import ProjectsSidebar from '../ui/ProjectsSidebar';

// Project data
const projects = [
  {
    id: 1,
    title: "Mario Preciado Photography landing page",
    description: "A professional photography portfolio website showcasing the artistic work and services of freelance photographer Mario Preciado. Features a dynamic gallery, booking system, and responsive design to display high-quality photography across all devices.",
    image: placeholderImages.djset,
    bgImage: placeholderImages.djset,
    bgPattern: backgroundPatterns.wave,
    links: [
      { type: 'github', url: 'https://github.com/michaelpreciado/mario.preciado.photography', label: 'Code' },
      { type: 'live', url: 'https://michaelpreciado.github.io/mario.preciado.photography/', label: 'Live Site' }
    ],
    isComingSoon: false
  },
  {
    id: 2,
    title: "Michael's Film Collection",
    description: "A searchable database of my personal film collection, featuring details like genres, directors, and ratings. Built with modern web technologies.",
    image: placeholderImages.michael,
    bgImage: placeholderImages.michael,
    bgPattern: backgroundPatterns.grid,
    links: [
      { type: 'github', url: 'https://github.com/michaelpreciado/MP.FIlmCollection', label: 'Code' },
      { type: 'live', url: 'https://michaelpreciado.github.io/MP.FIlmCollection/', label: 'Live Site' }
    ],
    isComingSoon: false
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "A cross-platform mobile application focused on enhancing user productivity and daily workflow management.",
    icon: faMobile,
    bgColor: "rgba(130, 71, 229, 0.15)",
    bgPattern: backgroundPatterns.hexagon,
    links: [],
    isComingSoon: true
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    description: "A comprehensive data visualization platform providing real-time insights and interactive analytics tools.",
    icon: faDatabase,
    bgColor: "rgba(255, 102, 0, 0.15)",
    bgPattern: backgroundPatterns.dots,
    links: [],
    isComingSoon: true
  }
];

const ProjectsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const touchThreshold = 30;
  const projectsTrackRef = useRef(null);
  const controls = useAnimation();
  const activeProject = projects[activeIndex];
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
  // Initialize animations
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    
    // Hide swipe hint after 5 seconds
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [controls]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigatePrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, isScrolling]);

  // Handle wheel events
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        navigateNext();
      } else {
        navigatePrev();
      }
    };

    const projectsTrack = projectsTrackRef.current;
    if (projectsTrack) {
      projectsTrack.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (projectsTrack) {
        projectsTrack.removeEventListener('wheel', handleWheel);
      }
    };
  }, [activeIndex, isScrolling]);

  const navigateNext = () => {
    if (activeIndex < projects.length - 1 && !isScrolling) {
      setIsScrolling(true);
      setActiveIndex(activeIndex + 1);
      setShowSwipeHint(false);
      
      // Provide haptic feedback on iOS if available
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 400);
    }
  };

  const navigatePrev = () => {
    if (activeIndex > 0 && !isScrolling) {
      setIsScrolling(true);
      setActiveIndex(activeIndex - 1);
      setShowSwipeHint(false);
      
      // Provide haptic feedback on iOS if available
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 400);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    // Prevent default only if we're handling the swipe
    if (Math.abs(e.touches[0].clientY - touchStartY) > touchThreshold) {
      e.preventDefault();
    }
    setTouchEndY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartY - touchEndY;
    if (Math.abs(touchDiff) >= touchThreshold) {
      if (touchDiff > 0) {
        navigateNext();
      } else {
        navigatePrev();
      }
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Filter projects based on active category
  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <ProjectsContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      $bgImage={activeProject.bgImage}
      $bgColor={activeProject.bgColor}
    >
      <BackgroundImage 
        $bgImage={activeProject.bgImage}
        $bgColor={activeProject.bgColor}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        key={`bg-${activeIndex}`}
      />
      
      <BackgroundPattern 
        $pattern={activeProject.bgPattern}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        key={`pattern-${activeIndex}`}
      />
      
      <ContentWrapper>
        <ProjectsHeader>
          <BackButton 
            to="/"
            as={motion.div}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to Card</span>
          </BackButton>
          <h1>My Projects</h1>
        </ProjectsHeader>

        <ProjectsCarousel>
          <CarouselButton 
            className={`prev ${activeIndex > 0 ? 'active' : ''}`}
            onClick={navigatePrev}
            disabled={activeIndex === 0 || isScrolling}
            aria-label="Previous project"
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </CarouselButton>
          
          <ProjectsTrack 
            className="projects-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={projectsTrackRef}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  bgPattern: project.bgPattern
                }}
                index={index}
                activeIndex={activeIndex}
              />
            ))}
          </ProjectsTrack>

          <CarouselButton 
            className={`next ${activeIndex < projects.length - 1 ? 'active' : ''}`}
            onClick={navigateNext}
            disabled={activeIndex === projects.length - 1 || isScrolling}
            aria-label="Next project"
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </CarouselButton>
          
          <AnimatePresence>
            {showSwipeHint && (
              <SwipeHint
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SwipeIcon>
                  <FontAwesomeIcon icon={faArrowUp} />
                  <FontAwesomeIcon icon={faArrowDown} />
                </SwipeIcon>
                <SwipeText>Swipe to navigate</SwipeText>
              </SwipeHint>
            )}
          </AnimatePresence>
          
          <ProjectCounter>
            {activeIndex + 1} / {projects.length}
          </ProjectCounter>
        </ProjectsCarousel>

        <FilterButtons>
          {['all', 'web', 'mobile', 'design', 'other'].map(category => (
            <FilterButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterButtons>

        {/* Sidebar component */}
        <ProjectsSidebar 
          isVisible={isSidebarVisible} 
          onClose={toggleSidebar}
        />
      </ContentWrapper>
    </ProjectsContainer>
  );
};

const ProjectsContainer = styled(motion.div)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.content};
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${({ $bgImage }) => $bgImage ? `url(${$bgImage})` : 'none'};
  background-color: ${({ $bgColor }) => $bgColor || 'transparent'};
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  filter: blur(20px);
  transform: scale(1.1);
  z-index: -2;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      ${({ theme }) => theme.colors.background} 80%
    );
  }
`;

const BackgroundPattern = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${({ $pattern }) => $pattern ? `url(${$pattern})` : 'none'};
  background-size: 400px 400px;
  background-position: center;
  opacity: 0.4;
  z-index: -1;
  pointer-events: none;
  animation: patternFloat 120s linear infinite;
  
  @keyframes patternFloat {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 400px 400px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    background-size: 200px 200px;
    
    @keyframes patternFloat {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 200px 200px;
      }
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  flex: 1;
  
  @supports (padding: max(0px)) {
    padding-top: max(${({ theme }) => theme.spacing.lg}, env(safe-area-inset-top));
    padding-right: max(${({ theme }) => theme.spacing.lg}, env(safe-area-inset-right));
    padding-bottom: max(${({ theme }) => theme.spacing.lg}, env(safe-area-inset-bottom));
    padding-left: max(${({ theme }) => theme.spacing.lg}, env(safe-area-inset-left));
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProjectsHeader = styled.header`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.content + 1};
  
  h1 {
    font-size: ${({ theme }) => theme.fonts.sizes.xxl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    text-shadow: ${({ theme }) => theme.colors.glow};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.xl};
    
    h1 {
      font-size: ${({ theme }) => theme.fonts.sizes.xl};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    
    h1 {
      font-size: ${({ theme }) => theme.fonts.sizes.lg};
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  transition: ${({ theme }) => theme.transitions.fast};
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.buttonBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryBright};
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
    border-color: ${({ theme }) => theme.colors.borderActive};
  }
  
  /* Ensure touch target size */
  min-height: 44px;
  min-width: 44px;
  
  span {
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      display: none;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: ${({ theme }) => theme.spacing.sm};
    left: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
  }
  
  /* iOS safe area support */
  @supports (padding: max(0px)) {
    top: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-top));
    left: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-left));
  }
  
  /* Remove tap highlight on mobile */
  -webkit-tap-highlight-color: transparent;
`;

const ProjectsCarousel = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  flex: 1;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  overflow: visible;
  z-index: ${({ theme }) => theme.zIndices.content};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing.md};
    max-width: 350px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 300px;
    padding-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProjectsTrack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: 100%;
  perspective: 1000px;
  touch-action: pan-x; /* Allow vertical swiping but prevent horizontal */
`;

const CarouselButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.buttonBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndices.content + 1};
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transitions.normal};
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
    color: ${({ theme }) => theme.colors.primaryBright};
    border-color: ${({ theme }) => theme.colors.borderActive};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:active:not(:disabled) {
    transform: translateX(-50%) scale(0.95);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.prev {
    top: -60px;
  }
  
  &.next {
    bottom: -60px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 48px;
    height: 48px;
    
    &.prev {
      top: -50px;
    }
    
    &.next {
      bottom: -50px;
    }
  }
  
  /* Remove tap highlight on mobile */
  -webkit-tap-highlight-color: transparent;
`;

const SwipeHint = styled(motion.div)`
  position: absolute;
  bottom: -120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const SwipeIcon = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.primaryBright};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  svg {
    animation: pulse 1.5s infinite alternate;
    filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.primary});
    
    &:first-child {
      animation-delay: 0s;
    }
    
    &:last-child {
      animation-delay: 0.75s;
    }
  }
  
  @keyframes pulse {
    0% { transform: translateY(0); opacity: 0.5; }
    100% { transform: translateY(-5px); opacity: 1; }
  }
`;

const SwipeText = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.primaryBright};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
`;

const ProjectCounter = styled.div`
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.buttonBackground};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: -140px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: ${({ active, theme }) => active ? 
    'rgba(0, 214, 255, 0.2)' : 'rgba(0, 18, 21, 0.8)'};
  color: ${({ theme }) => theme.colors.primaryBright};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 214, 255, 0.15);
  }
`;

export default ProjectsPage; 