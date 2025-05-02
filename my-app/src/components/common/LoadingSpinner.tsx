import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const SpinnerContainer = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ size }) => 
    size === 'small' ? '100px' : 
    size === 'large' ? '50vh' : 
    '30vh'
  };
`;

const Spinner = styled.div<SpinnerProps>`
  width: ${({ size }) => 
    size === 'small' ? '24px' : 
    size === 'large' ? '64px' : 
    '48px'
  };
  height: ${({ size }) => 
    size === 'small' ? '24px' : 
    size === 'large' ? '64px' : 
    '48px'
  };
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${rotate} 1s ease-in-out infinite;
`;

const LoadingSpinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {
  return (
    <SpinnerContainer size={size}>
      <Spinner size={size} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
