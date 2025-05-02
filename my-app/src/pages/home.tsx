import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BOARD_LIST } from '../types';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  
  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  
  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: 2rem;
  }
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const BoardCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-4px);
  }
`;

const BoardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BoardName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const BoardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BoardButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 500;
  text-align: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Title>게시판 목록</Title>
      
      <BoardGrid>
        {BOARD_LIST.map((board) => (
          <BoardCard
            key={board.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BoardIcon>{board.icon}</BoardIcon>
            <BoardName>{board.name}</BoardName>
            <BoardDescription>{board.description}</BoardDescription>
            <BoardButton to={`/boards/${board.slug}/posts`}>
              게시글 보기
            </BoardButton>
          </BoardCard>
        ))}
      </BoardGrid>
    </Container>
  );
};

export default Home;
