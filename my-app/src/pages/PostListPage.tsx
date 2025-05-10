import React, { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostsQuery } from '../api/apiSlice';
import { BOARD_LIST } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useToast } from '../components/common/Toast';
import { motion } from 'framer-motion';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const BoardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BoardTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  
  span {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const BoardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 500;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.colors.textLight};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: #495057;
  }
`;

// 카드 형태의 게시글 목록 (모바일용)
const PostCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const PostCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
  transition: ${({ theme }) => theme.transition};
`;

const PostCardTitle = styled(Link)`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const PostCardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const PostCardAuthor = styled.span`
  font-weight: 500;
`;

// 테이블 형태의 게시글 목록 (데스크탑용)
const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  display: none;
  
  @media (min-width: 768px) {
    display: table;
  }
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  
  &:nth-child(1) {
    width: 10%;
  }
  
  &:nth-child(2) {
    width: 50%;
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
`;

const PostTitle = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const PostListPage: React.FC = () => {
  const { slug = 'free' } = useParams();
  const { data: posts, isLoading, error } = useGetPostsQuery(slug);
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // URL 파라미터에서 삭제 완료 상태 확인
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const deleted = params.get('deleted');
    
    if (deleted === 'true') {
      showToast('게시글이 삭제되었습니다.', 'success');
      
      // URL에서 파라미터 제거
      navigate(`/boards/${slug}/posts`, { replace: true });
    }
  }, [navigate, showToast, slug]);
  
  const currentBoard = useMemo(() => {
    return BOARD_LIST.find(board => board.slug === slug) || BOARD_LIST[0];
  }, [slug]);

  // 애니메이션 변수
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="게시글 목록을 불러올 수 없습니다." />;
  
  return (
    <Container>
      <BoardHeader>
        <BoardTitle>
          <span>{currentBoard.icon}</span> {currentBoard.name}
        </BoardTitle>
        <BoardDescription>{currentBoard.description}</BoardDescription>
      </BoardHeader>
      
      <ButtonContainer>
        <Button to={`/boards/${slug}/posts/create`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          새 글 작성
        </Button>
        <BackButton onClick={() => navigate(-1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          뒤로 가기
        </BackButton>
      </ButtonContainer>
      
      {posts && posts.length > 0 ? (
        <>
          {/* 모바일용 카드 리스트 */}
          <PostCardList>
            {posts.map((post, i) => (
              <PostCard
                key={post.postIdx}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <PostCardTitle to={`/boards/${slug}/posts/${post.postIdx}`}>
                  {post.postTitle}
                </PostCardTitle>
                <PostCardMeta>
                  <PostCardAuthor>{post.postAuthor}</PostCardAuthor>
                  <div>
                    <span>
                      {formatDistanceToNow(new Date(post.regDate), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </span>
                    <span> · 조회 {post.hit}</span>
                  </div>
                </PostCardMeta>
              </PostCard>
            ))}
          </PostCardList>
          
          {/* 데스크탑용 테이블 */}
          <PostTable>
            <TableHead>
              <TableRow>
                <TableHeader>번호</TableHeader>
                <TableHeader>제목</TableHeader>
                <TableHeader>작성자</TableHeader>
                <TableHeader>작성일</TableHeader>
                <TableHeader>조회수</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {posts.map((post) => (
                <TableRow key={post.postIdx}>
                  <TableCell>{post.postIdx}</TableCell>
                  <TableCell>
                    <PostTitle to={`/boards/${slug}/posts/${post.postIdx}`}>
                      {post.postTitle}
                    </PostTitle>
                  </TableCell>
                  <TableCell>{post.postAuthor}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(post.regDate), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </TableCell>
                  <TableCell>{post.hit}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </PostTable>
        </>
      ) : (
        <EmptyMessage>
          등록된 게시글이 없습니다. 첫 번째 게시글을 작성해보세요!
        </EmptyMessage>
      )}
    </Container>
  );
};

export default React.memo(PostListPage);
