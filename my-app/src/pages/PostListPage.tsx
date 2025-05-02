import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const { slug } = useParams(); // /:slug 경로에서 slug 추출
  const { data, isLoading, error } = useGetPostsQuery(slug || 'free');

  if (isLoading) return <Container>로딩 중...</Container>;
  if (error || !data) return <Container>게시글을 불러올 수 없습니다.</Container>;

  return (
    <Container>
      <Link to={`/boards/${slug || 'free'}/create`}>작성</Link>
      <Title><small>{`[${slug || '자유게시판'}]의`}</small> 게시글 목록</Title>
      <List>
        {data.map((post: any) => (
          <Item key={post.postIdx}>
            <Link to={`/boards/${slug || 'free'}/posts/${post.postIdx}`}>
              {post.postTitle}
            </Link>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default BoardListPage;
