import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostsQuery } from '../api/apiSlice';
import type { Post } from '../types';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;
const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const Item = styled.li`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const BoardListPage: React.FC = () => {
  const { data, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <Container>로딩 중...</Container>;
  if (error || !data) return <Container>게시글을 불러올 수 없습니다.</Container>;

  return (
    <Container>
      <Title>게시글 목록</Title>
      <List>
        {data.posts.map((post: Post) => (
          <Item key={post.id}>
            <Link to={`/boards/${post.category}/posts/${post.id}`}>
              {post.title}
            </Link>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default BoardListPage;
