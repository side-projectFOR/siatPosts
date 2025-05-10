// import React, { useCallback } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../app/store';

// const Container = styled.div`
//   padding: ${({ theme }) => theme.spacing.lg};
// `;
// const Title = styled.h2`
//   margin-bottom: ${({ theme }) => theme.spacing.sm};
// `;
// const Meta = styled.p`
//   color: ${({ theme }) => theme.colors.text};
//   margin-bottom: ${({ theme }) => theme.spacing.md};
// `;
// const Content = styled.div`
//   white-space: pre-line;
//   margin-bottom: ${({ theme }) => theme.spacing.md};
// `;
// const Controls = styled.div`
//   margin-bottom: ${({ theme }) => theme.spacing.md};
//   & > * {
//     margin-right: ${({ theme }) => theme.spacing.sm};
//   }
// `;

// const PostDetailPage: React.FC = React.memo(() => {
//   const { slug, id } = useParams<{ slug: string; id: string }>();
//   const postIdx = Number(id);
//   const navigate = useNavigate();
//   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
//   const [deletePost] = useDeletePostMutation();
//   const user = useSelector((s: RootState) => s.auth.user);
//   const isAuthor = Boolean(user && post && user.id === post.userIdx);

//   const onDelete = useCallback(async () => {
//     if (window.confirm('정말 삭제하시겠습니까?')) {
//       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
//       navigate('/boards');
//     }
//   }, [deletePost, navigate, postIdx, slug]);

//   if (isLoading) return <Container>로딩 중...</Container>;
//   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

//   return (
//     <Container>
//       <Controls>
//         <button onClick={() => navigate(-1)}>← 목록</button>
//         {true && (
//           <>
//             <Link to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</Link>
//             <button onClick={onDelete}>삭제</button>
//           </>
//         )}
//       </Controls>
//       <Title>{post.postTitle}</Title>
//       <Meta>
//         작성자: {post.postAuthor} | 조회수: {post.hit}
//       </Meta>
//       <Content>작성날짜: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}</Content>
//       <Content>{post.postContent}</Content>
//     </Container>
//   );
// });

// export default PostDetailPage;

// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // const Container = styled.div`
// //   padding: ${({ theme }) => theme.spacing.lg};
// // `;
// // const Title = styled.h2`
// //   margin-bottom: ${({ theme }) => theme.spacing.sm};
// // `;
// // const Meta = styled.p`
// //   color: ${({ theme }) => theme.colors.text};
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// // `;
// // const Content = styled.div`
// //   white-space: pre-line;
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// // `;
// // const Controls = styled.div`
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// //   & > * {
// //     margin-right: ${({ theme }) => theme.spacing.sm};
// //   }
// // `;

// // const PostDetailPage: React.FC = () => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);
// //   const isAuthor = Boolean(user && post && user.id === post.userIdx);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <button onClick={() => navigate(-1)}>← 목록</button>
// //         {/* {isAuthor && (
// //           <>
// //             <Link to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</Link>
// //             <button onClick={onDelete}>삭제</button>
// //           </>
// //         )} */}
// //         {true && (
// //           <>
// //             <Link to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</Link>
// //             <button onClick={onDelete}>삭제</button>
// //           </>
// //         )}
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <Meta>
// //         작성자: {post.postAuthor} | 조회수: {post.hit}
// //       </Meta>
// //       <Content>작성자: {post.postAuthor} | 조회수: {post.hit}</Content>
// //       <Content>작성날짜: {post.updateDate ? post.updateDate+"(수정)" : post.regDate}</Content>
      


// //       <Content>{post.postContent}</Content>
      
      
      
// //     </Container>
// //   );
// // };

// // export default PostDetailPage;

import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostQuery, useDeletePostMutation, useGetCommentsQuery, useAddCommentMutation } from '../api/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 800px;
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const PostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const PostHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  word-break: break-word;
  
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 1.8rem;
  }
`;

const PostMeta = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    font-size: 0.9rem;
  }
`;

const PostInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PostAuthor = styled.span`
  font-weight: 500;
`;

const PostContent = styled.div`
  line-height: 1.7;
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  white-space: pre-line;
  word-break: break-word;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  ${({ theme }) => theme.mediaQueries.md} {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Button = styled.button`
  flex: 1;
  min-width: 80px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
  
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 auto;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerDark};
  }
`;

const ListButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gray600};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray700};
  }
`;

const EditButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.info};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.infoDark};
  }
`;

const CommentsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const CommentHeader = styled.h3`
  font-size: 1.15rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  
  span {
    margin-left: ${({ theme }) => theme.spacing.xs};
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    border-radius: 12px;
    padding: 0 8px;
    font-size: 0.85rem;
  }
  
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 1.25rem;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CommentItem = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.85rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const CommentContent = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  word-break: break-word;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
`;

const CommentTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: transparent;
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
`;

const EmptyComments = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textLight};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const PostDetailPage: React.FC = () => {
  const { slug = 'free', id } = useParams();
  const postIdx = Number(id);
  const navigate = useNavigate();
  
  const { data: post, isLoading: isLoadingPost, error: postError } = useGetPostQuery({ slug, postIdx });
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsQuery({ slug, postIdx });
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  
  const [commentContent, setCommentContent] = useState('');
  
  const user = useSelector((s: RootState) => s.auth.user);
  const isAuthor = Boolean(user && post && user.id === post.userIdx);

  // URL 파라미터에서 삭제 완료 상태 확인
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const deleted = params.get('deleted');
    
    if (deleted === 'true') {
      toast.success('게시글이 삭제되었습니다.');
      // URL에서 파라미터 제거
      navigate(`/boards/${slug}/posts`, { replace: true });
    }
  }, [navigate, slug]);

  const onDelete = useCallback(async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deletePost({ slug, postIdx }).unwrap();
        navigate(`/boards/${slug}/posts?deleted=true`, { replace: true });
      } catch (error) {
        toast.error('삭제 중 오류가 발생했습니다.');
      }
    }
  }, [deletePost, navigate, postIdx, slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    
    try {
      await addComment({
        slug,
        postIdx,
        content: commentContent
      }).unwrap();
      setCommentContent('');
      toast.success('댓글이 등록되었습니다.');
    } catch (error) {
      toast.error('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  if (isLoadingPost) return <LoadingSpinner />;
  if (postError || !post) return <ErrorMessage message="게시글을 불러올 수 없습니다." />;

  return (
    <Container>
      <BackButton onClick={() => navigate(`/boards/${slug}/posts`)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        목록으로
      </BackButton>
      
      <PostContainer>
        <PostHeader>
          <PostTitle>{post.postTitle}</PostTitle>
          <PostMeta>
            <PostInfo>
              <PostAuthor>{post.postAuthor}</PostAuthor>
              <span>
                {formatDistanceToNow(new Date(post.regDate), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </PostInfo>
            <span>조회수: {post.hit}</span>
          </PostMeta>
        </PostHeader>
        
        <PostContent>{post.postContent}</PostContent>
      </PostContainer>
      
      <ButtonsContainer>
        <ListButton onClick={() => navigate(`/boards/${slug}/posts`)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          목록
        </ListButton>
        
        {isAuthor && (
          <>
            <EditButton onClick={() => navigate(`/boards/${slug}/posts/${postIdx}/edit`)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              수정
            </EditButton>
            
            <DeleteButton onClick={onDelete} disabled={isDeleting}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isDeleting ? '삭제 중...' : '삭제'}
            </DeleteButton>
          </>
        )}
      </ButtonsContainer>
      
      <CommentsSection>
        <CommentHeader>
          댓글 <span>{comments?.length || 0}</span>
        </CommentHeader>
        
        {isLoadingComments ? (
          <LoadingSpinner size="small" />
        ) : (
          <>
            <CommentList>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentItem key={comment.commentIdx}>
                    <CommentMeta>
                      <CommentAuthor>{comment.commentAuthor}</CommentAuthor>
                      <span>
                        {formatDistanceToNow(new Date(comment.regDate), {
                          addSuffix: true,
                          locale: ko,
                        })}
                      </span>
                    </CommentMeta>
                    <CommentContent>{comment.commentContent}</CommentContent>
                  </CommentItem>
                ))
              ) : (
                <EmptyComments>
                  댓글이 없습니다. 첫 댓글을 작성해보세요!
                </EmptyComments>
              )}
            </CommentList>
            
            <CommentForm onSubmit={handleCommentSubmit}>
              <CommentTextarea 
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                required
              />
              <SubmitButton type="submit" disabled={isAddingComment}>
                {isAddingComment ? '등록 중...' : '댓글 등록'}
              </SubmitButton>
            </CommentForm>
          </>
        )}
      </CommentsSection>
    </Container>
  );
};

export default React.memo(PostDetailPage);
