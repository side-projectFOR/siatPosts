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

const PostDetailPage: React.FC = React.memo(() => {
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const postIdx = Number(id);
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
  const [deletePost] = useDeletePostMutation();
  const user = useSelector((s: RootState) => s.auth.user);
  const isAuthor = Boolean(user && post && user.id === post.userIdx);

  const onDelete = useCallback(async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
      navigate('/boards');
    }
  }, [deletePost, navigate, postIdx, slug]);

  if (isLoading) return <Container>로딩 중...</Container>;
  if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

  return (
    <Container>
      <Controls>
        <button onClick={() => navigate(-1)}>← 목록</button>
        {true && (
          <>
            <Link to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</Link>
            <button onClick={onDelete}>삭제</button>
          </>
        )}
      </Controls>
      <Title>{post.postTitle}</Title>
      <Meta>
        작성자: {post.postAuthor} | 조회수: {post.hit}
      </Meta>
      <Content>작성날짜: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}</Content>
      <Content>{post.postContent}</Content>
    </Container>
  );
});

export default PostDetailPage;
