import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 300px;
  background: rgba(0, 18, 21, 0.98);
  box-shadow: -2px 0 15px rgba(0, 230, 255, 0.2);
  z-index: 1000;
  padding: 20px;
  border-left: 2px solid ${({ theme }) => theme.colors.primaryBright};
  background-image: linear-gradient(
    to bottom,
    rgba(0, 40, 45, 0.95) 0%,
    rgba(0, 18, 21, 0.98) 100%
  );
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 30, 35, 0.95);
  border: 2px solid ${({ theme }) => theme.colors.primaryBright};
  color: ${({ theme }) => theme.colors.primaryBright};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 230, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 230, 255, 0.15);
    box-shadow: 0 0 12px rgba(0, 230, 255, 0.4);
  }
`;

const SidebarContent = styled.div`
  color: ${({ theme }) => theme.colors.primaryBright};
  padding-top: 2rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 10px rgba(0, 230, 255, 0.4);
    -webkit-text-stroke: 0.5px ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectsSidebar = ({ isVisible, onClose }) => {
    return (
        <SidebarContainer isVisible={isVisible}>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <SidebarContent>
                <h2>Contact Information</h2>
                {/* Add your contact form/content here */}
            </SidebarContent>
        </SidebarContainer>
    );
};

export default ProjectsSidebar; 