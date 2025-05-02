import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCreatePostMutation } from '../api/apiSlice';
import { BOARD_LIST } from '../types';
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

const Button = styled.button`
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

const PostCreatePage: React.FC = () => {
  const { slug = 'free' } = useParams<{ slug: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedSlug, setSelectedSlug] = useState(slug);
  const [error, setError] = useState<string | null>(null);
  
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }
    
    try {
      const result = await createPost({
        slug: selectedSlug,
        body: {
          postTitle: title,
          postContent: content,
          postAuthor: author || '익명',
        }
      }).unwrap();
      
      console.log('Post Created:', result);
      navigate(`/boards/${selectedSlug}/posts/${result.postIdx}`);
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('게시글 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Title>새 게시글 작성</Title>
      
      {error && <ErrorMessage message={error} />}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="board">게시판</Label>
          <Select
            id="board"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자 이름을 입력하세요"
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            required
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '게시 중...' : '게시글 등록'}
          </Button>
          <CancelButton
            type="button"
            onClick={() => navigate(`/boards/${selectedSlug}/posts`)}
          >
            취소
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default React.memo(PostCreatePage);
