import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faGithub, 
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { faCodeFork } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { placeholderImages } from '../../assets/images/placeholder';

const HomePage = () => {
  const controls = useAnimation();
  
  // Animate profile card on mount
  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible');
    };
    sequence();
  }, [controls]);

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      transform: 'rotateX(60deg) rotateY(10deg) rotateZ(-40deg) scale(0.9)'
    },
    visible: { 
      opacity: 1,
      transform: 'rotateX(55deg) rotateY(9deg) rotateZ(-40deg) scale(1)',
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      transform: 'rotateX(52deg) rotateY(8deg) rotateZ(-38deg) scale(1.05)',
      boxShadow: '0 0 35px rgba(255, 255, 255, 0.15), 0 0 25px rgba(255, 255, 255, 0.1)',
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      transform: 'rotateX(58deg) rotateY(10deg) rotateZ(-42deg) scale(0.95)',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  // Social link animation variants
  const socialLinkVariants = {
    hover: {
      z: 10,
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    },
    tap: {
      z: 2,
      scale: 0.95,
      transition: { type: 'spring', stiffness: 400, damping: 15 }
    }
  };

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileCard
        as={motion.div}
        initial="hidden"
        animate={controls}
        whileHover="hover"
        whileTap="tap"
        variants={cardVariants}
      >
        <CardHeader>
          <ProfileImage>
            <img 
              src={placeholderImages.mp} 
              alt="Michael Preciado"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/70';
              }}
            />
          </ProfileImage>
          <div>
            <ProfileName>Michael Preciado</ProfileName>
            <ProfileTitle>Self-taught Developer</ProfileTitle>
          </div>
        </CardHeader>

        <ProfileBio>
          <p>HTML, CSS, Java, SQL, & Python, </p>
          <p>Design with: Figma, XD, & ProCreate.</p>
        </ProfileBio>

        <SocialLinks>
          <SocialLink 
            as={motion.a}
            href="https://x.com/mpdollars" 
            target="_blank"
            rel="noopener noreferrer"
            $type="twitter"
            variants={socialLinkVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Twitter profile"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </SocialLink>
          
          <SocialLink 
            as={motion.a}
            href="https://github.com/michaelpreciado" 
            target="_blank"
            rel="noopener noreferrer"
            $type="github"
            variants={socialLinkVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="GitHub profile"
          >
            <FontAwesomeIcon icon={faGithub} />
          </SocialLink>
          
          <SocialLink 
            as={motion.a}
            href="https://www.linkedin.com/in/michael-preciado-74959b227/" 
            target="_blank"
            rel="noopener noreferrer"
            $type="linkedin"
            variants={socialLinkVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="LinkedIn profile"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </SocialLink>
          
          <SocialLink 
            as={motion(Link)}
            to="/projects"
            $type="projects"
            variants={socialLinkVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="View projects"
          >
            <FontAwesomeIcon icon={faCodeFork} />
          </SocialLink>
        </SocialLinks>
      </ProfileCard>
      
      <MobileHint>
        <HintText>Tap the card to interact</HintText>
        <HintArrow>↑</HintArrow>
      </MobileHint>
    </HomeContainer>
  );
};

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  
  @supports (padding: max(0px)) {
    padding-top: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-top));
    padding-right: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-right));
    padding-bottom: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-bottom));
    padding-left: max(${({ theme }) => theme.spacing.md}, env(safe-area-inset-left));
  }
`;

const ProfileCard = styled.div`
  position: relative;
  width: 400px;
  height: 250px;
  background-color: rgba(45, 45, 45, 0);
  color: ${({ theme }) => theme.colors.text};
  font-smooth: antialiased;
  perspective: 100%;
  transform-style: preserve-3d;
  transform: rotateX(55deg) rotateY(9deg) rotateZ(-40deg);
  transition: all 0.5s ease-in;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.1),
              0 0 15px rgba(255, 255, 255, 0.05);
  will-change: transform, box-shadow;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 350px;
    height: 220px;
    margin-left: 45px; /* Offset to account for centered social links */
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 300px;
    height: 190px;
    margin-left: 40px; /* Offset to account for centered social links */
  }
  
  @media (max-width: 375px) {
    width: 280px;
    height: 180px;
    margin-left: 35px; /* Offset to account for centered social links */
  }
  
  /* Improved touch feedback */
  @media (hover: none) {
    &:active {
      transform: rotateX(58deg) rotateY(10deg) rotateZ(-42deg) scale(0.95);
      transition: all 0.2s ease-out;
    }
  }
`;

const CardHeader = styled.header`
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 249px;
  background-color: ${({ theme }) => theme.colors.secondary};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  text-align: right;
  z-index: 1;
  transform-style: preserve-3d;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  &:before,
  &:after {
    position: absolute;
    bottom: 1px;
    display: block;
    content: '';
    height: 10px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.quaternaryDark};
    transform: rotateX(90deg);
    transform-origin: 0 100% 0;
  }
  
  &:after {
    height: 100%;
    width: 10px;
    transform: rotateY(90deg);
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.border},
      rgba(255, 255, 255, 0.05)
    );
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 260px;
    height: 219px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 220px;
    height: 189px;
  }
`;

const ProfileImage = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors.secondary};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 100%;
  height: 90px;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  img {
    margin: 0;
    height: 70px;
    width: 70px;
    border-radius: 5px;
    object-fit: cover;
    float: right;
    margin-right: 10px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 80px;
    
    img {
      height: 60px;
      width: 60px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 70px;
    
    img {
      height: 50px;
      width: 50px;
    }
  }
`;

const ProfileName = styled.h1`
  padding: 5px 20px 0;
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  font-family: ${({ theme }) => theme.fonts.primary};
  letter-spacing: -0.5px;
  clear: both;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
    padding: 5px 15px 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    padding: 5px 10px 0;
  }
`;

const ProfileTitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.light};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0 20px;
  font-family: ${({ theme }) => theme.fonts.primary};
  letter-spacing: 0.5px;
  margin-top: 4px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: calc(${({ theme }) => theme.fonts.sizes.xs} * 1.1);
    padding: 0 15px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    padding: 0 10px;
  }
`;

const ProfileBio = styled.div`
  margin: 156px 0 0 100px;
  padding: 8px 20px;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.primary};
  letter-spacing: 0.5px;
  
  p {
    line-height: 1.4;
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
    margin-bottom: 4px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 136px 0 0 90px;
    padding: 8px 15px;
    
    p {
      font-size: calc(${({ theme }) => theme.fonts.sizes.xs} * 1.1);
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 116px 0 0 80px;
    padding: 8px 10px;
    
    p {
      font-size: ${({ theme }) => theme.fonts.sizes.xs};
    }
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  transform-style: preserve-3d;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 90px;
    left: 50%;
    transform: translateX(-50%) translateX(-45px); /* Adjust for card offset */
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 80px;
    left: 50%;
    transform: translateX(-50%) translateX(-40px); /* Adjust for card offset */
  }
  
  @media (max-width: 375px) {
    width: 70px;
    left: 50%;
    transform: translateX(-50%) translateX(-35px); /* Adjust for card offset */
  }
`;

const SocialLink = styled.a`
  display: block;
  height: 25%;
  width: 100%;
  list-style: none;
  background-color: ${({ $type, theme }) => {
    switch($type) {
      case 'twitter': return theme.colors.primary;
      case 'github': return theme.colors.secondary;
      case 'linkedin': return theme.colors.tertiary;
      case 'projects': return theme.colors.quaternary;
      default: return theme.colors.quaternary;
    }
  }};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(1px);
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  will-change: transform;
  transition: all 0.4s;
  
  &:before,
  &:after {
    position: absolute;
    display: block;
    content: '';
    height: 100%;
    width: 10px;
    background-color: ${({ $type, theme }) => {
      switch($type) {
        case 'twitter': return theme.colors.primaryDark;
        case 'github': return theme.colors.secondaryDark;
        case 'linkedin': return theme.colors.tertiaryDark;
        case 'projects': return theme.colors.quaternaryDark;
        default: return theme.colors.quaternaryDark;
      }
    }};
    transform: rotateY(90deg);
    transform-origin: 0 0;
  }
  
  &:after {
    height: 10px;
    width: 100%;
    transform: rotateX(-90deg);
  }
  
  &:hover {
    transform: translateZ(5px);
    transition: transform 0.2s ease-out;
  }
  
  /* Font Awesome icon */
  svg {
    display: block;
    height: 100%;
    width: 100%;
    padding: 15px;
    text-align: center;
    transition: transform 0.2s ease-out;
    font-size: 35px;
    line-height: 35px;
    text-decoration: none;
    color: #ffffff;
    transform: translateZ(0);
  }
  
  &:hover svg {
    transform: scale(1.05);
  }
  
  /* Larger touch targets for mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    svg {
      padding: 12px;
      font-size: 28px;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    svg {
      padding: 8px;
      font-size: 22px;
    }
  }
  
  /* Extra small screens */
  @media (max-width: 375px) {
    svg {
      padding: 6px;
      font-size: 20px;
    }
  }
  
  /* Improved touch feedback */
  @media (hover: none) {
    &:active {
      transform: translateZ(2px);
      transition: transform 0.1s ease-out;
    }
    
    &:active svg {
      transform: scale(0.95);
      transition: transform 0.1s ease-out;
    }
  }
  
  /* Remove tap highlight on mobile */
  -webkit-tap-highlight-color: transparent;
`;

const MobileHint = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  opacity: 0.7;
  
  @media (hover: none) and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    animation: fadeInOut 3s ease-in-out infinite;
  }
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
`;

const HintText = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.primaryBright};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const HintArrow = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.primaryBright};
  animation: bounce 1.5s ease infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

export default HomePage; 