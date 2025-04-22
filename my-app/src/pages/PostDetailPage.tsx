import React, { useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;
const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
const Meta = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
const Content = styled.div`
  white-space: pre-line;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
const Controls = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  & > * {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const PostDetailPage: React.FC = () => {
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useGetPostQuery(postId);
  const [deletePost] = useDeletePostMutation();
  const user = useSelector((s: RootState) => s.auth.user);
  const isAuthor = Boolean(user && post && user.id === post.author.id);

  const onDelete = useCallback(async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deletePost(postId).unwrap();
      navigate('/boards');
    }
  }, [deletePost, navigate, postId]);

  if (isLoading) return <Container>로딩 중...</Container>;
  if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

  return (
    <Container>
      <Title>{post.title}</Title>
      <Meta>
        작성자: {post.author.username} | 조회수: {post.views}
      </Meta>
      <Content>{post.content}</Content>
      <Controls>
        <button onClick={() => navigate(-1)}>← 목록</button>
        {isAuthor && (
          <>
            <Link to={`/boards/${slug}/posts/${postId}/edit`}>수정</Link>
            <button onClick={onDelete}>삭제</button>
          </>
        )}
      </Controls>
    </Container>
  );
};

export default PostDetailPage;
