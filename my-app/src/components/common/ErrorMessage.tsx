import React from 'react';
import styled from 'styled-components';
// margin width만 수정하는 것도 필요하다.
const ErrorContainer = styled.div`
  background-color: #fff5f5;
  border: 1px solid #ffc9c9;
  border-radius: ${({ theme }) => theme.radius.md};
  margin: ${({ theme }) => theme.spacing.md}; 
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.error};
`;

const ErrorIcon = styled.span`
  font-size: 1.5rem;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const ErrorText = styled.p`
  margin: 0;
  font-weight: 500;
`;

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
};

export default ErrorMessage;
