import React, { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostsQuery } from '../api/apiSlice';
import { BOARD_LIST } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  
  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const BoardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BoardTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  
  span {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const BoardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 링크를 위한 컴포넌트
const StyledLink = styled(Link)`
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

// 버튼을 위한 별도의 컴포넌트
const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 500;
  text-align: center;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`;

const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
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
  
  ${({ theme }) => theme.mediaQueries.mobile} {
    &:nth-child(3),
    &:nth-child(4) {
      display: none;
    }
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  
  ${({ theme }) => theme.mediaQueries.mobile} {
    &:nth-child(3),
    &:nth-child(4) {
      display: none;
    }
  }
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
`;

const PostListPage: React.FC = () => {
  const { slug = 'free' } = useParams<{ slug: string }>();
  const { data: posts, isLoading, error } = useGetPostsQuery(slug);
  const navigate = useNavigate();
  
  const currentBoard = useMemo(() => {
    return BOARD_LIST.find(board => board.slug === slug) || BOARD_LIST[0];
  }, [slug]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="게시글을 불러올 수 없습니다." />;
  
  return (
    <Container>
      <BoardHeader>
        <BoardTitle>
          <span>{currentBoard.icon}</span> {currentBoard.name}
        </BoardTitle>
        <BoardDescription>{currentBoard.description}</BoardDescription>
      </BoardHeader>
      
      <ButtonContainer>
        <StyledLink to={`/boards/${slug}/posts/create`}>
          새 글 작성
        </StyledLink>
        {/* 문제 해결: 별도의 StyledButton 컴포넌트 사용 */}
        <StyledButton onClick={() => navigate(-1)}>
          뒤로 가기
        </StyledButton>
      </ButtonContainer>
      
      {posts && posts.length > 0 ? (
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
      ) : (
        <EmptyMessage>
          등록된 게시글이 없습니다. 첫 번째 게시글을 작성해보세요!
        </EmptyMessage>
      )}
    </Container>
  );
};

export default React.memo(PostListPage);
