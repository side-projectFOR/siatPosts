import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Meta = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Content = styled.div`
  white-space: pre-line;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Controls = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  & > * {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;