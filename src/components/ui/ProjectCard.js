import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ProjectCard = ({ project, index, activeIndex }) => {
  const controls = useAnimation();
  
  // Animate card when it becomes active
  useEffect(() => {
    if (index === activeIndex) {
      controls.start('active');
    } else if (index === activeIndex - 1) {
      controls.start('prev');
    } else if (index === activeIndex + 1) {
      controls.start('next');
    }
  }, [activeIndex, index, controls]);

  // Determine card position class
  const getCardClass = () => {
    if (index === activeIndex) return 'active';
    if (index === activeIndex - 1) return 'prev';
    if (index === activeIndex - 2) return 'far-prev';
    if (index === activeIndex - 3) return 'far-far-prev';
    if (index === activeIndex + 1) return 'next';
    if (index === activeIndex + 2) return 'far-next';
    return '';
  };

  // Card animation variants
  const cardVariants = {
    active: {
      y: 0,
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    },
    prev: {
      y: -400,
      scale: 0.75,
      opacity: 0,
      rotateX: 10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    },
    next: {
      y: 400,
      scale: 0.75,
      opacity: 0.5,
      rotateX: -10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    }
  };

  return (
    <Card 
      className={getCardClass()}
      as={motion.div}
      variants={cardVariants}
      animate={controls}
      initial={false}
      whileHover={getCardClass() === 'active' ? { scale: 1.02 } : {}}
      whileTap={getCardClass() === 'active' ? { scale: 0.98 } : {}}
    >
      <CardPattern 
        className={getCardClass()} 
        $pattern={project.bgPattern}
      />
      
      <ProjectImage 
        className={project.isComingSoon ? 'coming-soon' : ''}
        $bgImage={project.image}
        $bgColor={project.bgColor}
      >
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200';
            }}
          />
        ) : (
          <FontAwesomeIcon icon={project.icon} />
        )}
        
        <ImageOverlay />
      </ProjectImage>
      
      <ProjectInfo>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        
        <ProjectLinks>
          {project.isComingSoon ? (
            <ComingSoonBadge
              as={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faClock} />
              <span>Coming Soon</span>
            </ComingSoonBadge>
          ) : (
            project.links.map((link, i) => (
              <ProjectLink 
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                $type={link.type}
                as={motion.a}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon 
                  icon={link.type === 'github' ? faGithub : faExternalLinkAlt} 
                />
                <span>{link.label}</span>
              </ProjectLink>
            ))
          )}
        </ProjectLinks>
      </ProjectInfo>
      
      {/* Card glow effect */}
      <CardGlow className={getCardClass()} />
    </Card>
  );
};

const Card = styled.div`
  min-width: 100%;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  opacity: 0;
  transform: translateY(100px) scale(0.7);
  pointer-events: none;
  background: ${({ theme }) => theme.colors.cardBackground};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  visibility: hidden;
  overflow: hidden;
  will-change: transform, opacity;
  
  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    z-index: 2;
    pointer-events: all;
    visibility: visible;
    background: ${({ theme }) => theme.colors.cardBackgroundActive};
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &.prev {
    transform: translateY(-400px) scale(0.75);
    opacity: 0;
    z-index: 1;
    visibility: hidden;
    pointer-events: none;
  }
  
  &.next {
    transform: translateY(400px) scale(0.75);
    opacity: 0.5;
    z-index: 1;
    visibility: visible;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: ${({ theme }) => theme.colors.cardBackground};
    pointer-events: none;
  }
  
  &.far-prev, &.far-next, &.far-far-prev {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &.active {
      transform: translateY(0) scale(1);
    }
    
    &.prev {
      transform: translateY(-350px) scale(0.7);
    }
    
    &.next {
      transform: translateY(350px) scale(0.7);
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    &.active {
      transform: translateY(0) scale(1);
    }
    
    &.prev {
      transform: translateY(-300px) scale(0.7);
    }
    
    &.next {
      transform: translateY(300px) scale(0.7);
    }
  }
  
  /* Terminal-style scanline effect */
  &.active::after {
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
`;

const CardPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${({ $pattern }) => $pattern ? `url(${$pattern})` : 'none'};
  background-size: 200px 200px;
  background-position: center;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  
  &.active {
    opacity: 0.15;
    animation: patternFloat 60s linear infinite;
  }
  
  @keyframes patternFloat {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 200px 200px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    background-size: 100px 100px;
    
    @keyframes patternFloat {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 100px 100px;
      }
    }
  }
`;

const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  &.active {
    opacity: 1;
    box-shadow: ${({ theme }) => theme.colors.glowStrong};
    animation: pulse 3s infinite alternate;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 15px rgba(0, 230, 255, 0.3); }
    100% { box-shadow: 0 0 25px rgba(0, 230, 255, 0.5); }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bgColor }) => $bgColor || 'rgba(0, 0, 0, 0.2)'};
  background-image: ${({ $bgImage }) => $bgImage ? `url(${$bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    opacity: ${({ $bgImage }) => $bgImage ? 0 : 1}; /* Hide image if we're using background-image */
  }
  
  ${Card}.active:hover & {
    &::before {
      opacity: 0.7;
    }
  }
  
  ${Card}.active:hover & img {
    transform: scale(1.05);
  }
  
  &.coming-soon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme, $bgColor }) => $bgColor || `rgba(0, 214, 255, 0.15)`};
    height: 250px;
    
    svg {
      font-size: 5rem;
      color: rgba(255, 255, 255, 0.4);
      filter: drop-shadow(0 0 8px rgba(0, 214, 255, 0.3));
      z-index: 1;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 180px;
    
    &.coming-soon {
      height: 220px;
      
      svg {
        font-size: 4rem;
      }
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 160px;
    
    &.coming-soon {
      height: 200px;
      
      svg {
        font-size: 3.5rem;
      }
    }
  }
  
  /* Shine effect on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    transform: skewX(-25deg);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 1;
  }
  
  ${Card}.active:hover &::before {
    animation: shine 1.5s ease;
  }
  
  @keyframes shine {
    100% {
      left: 125%;
    }
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    ${({ theme }) => theme.colors.cardBackground} 100%
  );
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;
`;

const ProjectInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.primary};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-family: ${({ theme }) => theme.fonts.primary};
  letter-spacing: -0.5px;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  letter-spacing: 0.3px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.4;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $type, theme }) => 
    $type === 'github' 
      ? theme.colors.buttonBackground
      : theme.colors.buttonBackground};
  border: 1px solid ${({ $type, theme }) => 
    $type === 'github'
      ? theme.colors.border
      : theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  flex: 1;
  justify-content: center;
  min-height: 44px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  svg {
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    color: ${({ $type, theme }) => 
      $type === 'github'
        ? theme.colors.primary
        : theme.colors.primary};
  }
  
  &:hover {
    background: ${({ $type, theme }) => 
      $type === 'github'
        ? theme.colors.buttonBackgroundHover
        : theme.colors.buttonBackgroundHover};
    border-color: ${({ theme }) => theme.colors.borderActive};
    color: ${({ theme }) => theme.colors.primaryBright};
    box-shadow: 0 0 15px rgba(0, 230, 255, 0.3);
    
    svg {
      color: ${({ theme }) => theme.colors.primaryBright};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    min-height: 40px;
    
    svg {
      font-size: ${({ theme }) => theme.fonts.sizes.sm};
    }
  }
  
  /* Remove tap highlight on mobile */
  -webkit-tap-highlight-color: transparent;
`;

const ComingSoonBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.buttonBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  min-height: 44px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  svg {
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    animation: pulse 2s infinite alternate;
  }
  
  @keyframes pulse {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    min-height: 40px;
    
    svg {
      font-size: ${({ theme }) => theme.fonts.sizes.sm};
    }
  }
`;

export default ProjectCard; 