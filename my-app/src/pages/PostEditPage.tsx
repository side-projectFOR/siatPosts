import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation
} from '../api/apiSlice';
import type { PostPayload } from '../types';
import { BOARD_LIST } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  
  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 1rem;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: transparent;
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: transparent;
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 1rem;
  resize: vertical;
  min-height: 300px;
  font-family: inherit;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: transparent;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// const Button = styled.button`
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   border-radius: ${({ theme }) => theme.radius.sm};
//   padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
//   font-weight: 500;
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondary};
//   }
  
//   &:disabled {
//     background-color: ${({ theme }) => theme.colors.textLight};
//     cursor: not-allowed;
//   }
// `;

const Button = styled.button<{ $isEdit?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.textLight};
  
  &:hover {
    background-color: #495057;
  }
`;

const PostEditPage: React.FC = () => {
  const { slug = 'free', id } = useParams<{ slug: string; id?: string }>();
  const postIdx = id ? Number(id) : undefined;
  const isEdit = Boolean(postIdx);
  const navigate = useNavigate();

  const { data: existing, isLoading, error } = useGetPostQuery(
    { slug, postIdx: postIdx! }, 
    { skip: !isEdit || !postIdx }
  );
  
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedSlug, setSelectedSlug] = useState(slug);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (existing) {
      setTitle(existing.postTitle || '');
      setContent(existing.postContent || '');
      setAuthor(existing.postAuthor || '');
    }
  }, [existing]);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload: PostPayload = {
      postTitle: title,
      postContent: content,
      postAuthor: author || '익명',
      isSecret: false // 비밀 게시글 입력 버튼이 필요하다.
    };
    try {
      if (isEdit && postIdx) {
        const re = await updatePost({
          slug: selectedSlug,
          postIdx,
          body: payload,
        });
        //.unwrap();
        console.log('Post Updated:', re);
        navigate(`/boards/${selectedSlug}/posts/${postIdx}`);
      } else {
        const post = await createPost({
          slug: selectedSlug,
          body: payload,
        }).unwrap();
        console.log('Post Created:', post);
        navigate(`/boards/${selectedSlug}/posts/${post.postIdx}`);
      }
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
    }
    
    // try {
    //   if (isEdit && postIdx) {
    //     const re = await updatePost({
    //       slug: selectedSlug,
    //       postIdx,
    //       body: payload
    //     }).unwrap(); // 근데 얘는 왜 응답값을 안받지? -> unwrap()을 사용하면 Promise를 반환하고, 성공 시에는 응답값을 반환함.
    //     console.log('Post Updated:', payload);
    //     console.log('Post response value check~! Updated:', re);
    //     // navigate(`/boards/${selectedSlug}/posts/${postIdx}`);
    //   } else {
    //     const post = await createPost({
    //       slug: selectedSlug,
    //       body: payload
    //     }).unwrap();
    //     console.log('Post Created:', post);
    //     // navigate(`/boards/${selectedSlug}/posts/${post.postIdx}`);
    //   }
    // } catch (error) {
    //   alert('저장 중 오류가 발생했습니다.');
    // }
  }, [createPost, updatePost, navigate, isEdit, postIdx, selectedSlug, title, content, author]);

  if (isEdit && isLoading) return <LoadingSpinner />;
  if (isEdit && (error || !existing)) return <ErrorMessage message="게시글을 불러올 수 없습니다." />;

  const isProcessing = isCreating || isUpdating;

  return (
    <Container>
      <Title>{isEdit ? '게시글 수정' : '새 게시글 작성'}</Title>
      
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="board">게시판</Label>
          <Select
            id="board"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            disabled={isEdit}
          >
            {BOARD_LIST.map((board) => (
              <option key={board.id} value={board.slug}>
                {board.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            type="text"
            placeholder="작성자 이름을 입력하세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? '저장 중...' : isEdit ? '수정 완료' : '작성 완료'}
          </Button>
          <CancelButton
            type="button"
            onClick={() => navigate(isEdit ? `/boards/${slug}/posts/${postIdx}` : `/boards/${slug}/posts`)}
          >
            취소
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default React.memo(PostEditPage);
