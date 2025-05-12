import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import {
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation
} from '../api/apiSlice';
import type { PostPayload } from '../types';
import { BOARD_LIST } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 0.3s ease-out;
  
  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: ${({ theme }) => theme.spacing.lg};
    margin: 1rem auto;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 4px;
`;

const inputStyles = css`
  padding: 12px 16px;
  border: 1px solid #E5E5EC;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: #AEAEB2;
  }
`;

const Input = styled.input`
  ${inputStyles}
  height: 48px;
`;

const Select = styled.select`
  ${inputStyles}
  height: 48px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 48px;
`;

const TextArea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 240px;
  line-height: 1.6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: 24px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-width: 100px;
  height: 48px;
  
  background-color: ${({ $variant }) => 
    $variant === 'secondary' ? '#F2F2F7' : '#007AFF'};
  color: ${({ $variant }) => 
    $variant === 'secondary' ? '#333333' : 'white'};
  
  &:hover {
    background-color: ${({ $variant }) => 
      $variant === 'secondary' ? '#E5E5EA' : '#0062CC'};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    background-color: #C7C7CC;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const CharacterCount = styled.div`
  font-size: 12px;
  text-align: right;
  color: #8E8E93;
  margin-top: 4px;
`;

const HelperText = styled.p`
  font-size: 14px;
  color: #8E8E93;
  margin-bottom: 16px;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #E5E5EC;
  margin: 16px 0;
`;

const FormHeader = styled.div`
  margin-bottom: 16px;
`;


/** 위치 수정이 필수다. */
const SavedIndicator = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #34C759;
  color: white;
  padding: 12px 18px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1000;
  font-weight: 500;
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
  const [saved, setSaved] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (existing) {
      setTitle(existing.postTitle || '');
      setContent(existing.postContent || '');
      setAuthor(existing.postAuthor || '');
    }
  }, [existing]);

  // Track form changes
  useEffect(() => {
    if (title || content || author) {
      setFormTouched(true);
    }
  }, [title, content, author]);

  // Reset saved indicator after 3 seconds
  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload: PostPayload = {
      postTitle: title.trim(),
      postContent: content.trim(),
      postAuthor: author.trim() || '익명',
      isSecret: false
    };
    
    try {
      if (isEdit && postIdx) {
        await updatePost({
          slug: selectedSlug,
          postIdx,
          body: payload,
        }).unwrap();
        setSaved(true);
        setTimeout(() => navigate(`/boards/${selectedSlug}/posts/${postIdx}`), 1000);
      } else {
        const post = await createPost({
          slug: selectedSlug,
          body: payload,
        }).unwrap();
        setSaved(true);
        setTimeout(() => navigate(`/boards/${selectedSlug}/posts/${post.postIdx}`), 1000);
      }
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
    }
  }, [createPost, updatePost, navigate, isEdit, postIdx, selectedSlug, title, content, author]);

  // Navigation warning for unsaved changes
  const handleCancel = useCallback(() => {
    if (formTouched && !saved) {
      const confirm = window.confirm('작성 중인 내용이 있습니다. 정말 나가시겠습니까?');
      if (!confirm) return;
    }
    navigate(isEdit ? `/boards/${slug}/posts/${postIdx}` : `/boards/${slug}/posts`);
  }, [formTouched, saved, navigate, isEdit, slug, postIdx]);

  if (isEdit && isLoading) return <LoadingSpinner />;
  if (isEdit && (error || !existing)) return <ErrorMessage message="게시글을 불러올 수 없습니다." />;

  const isProcessing = isCreating || isUpdating;
  const titleCharCount = title.length;
  const maxTitleChars = 100;
  const isFormValid = title.trim() && content.trim();

  return (
    <Container>
      {saved && <SavedIndicator>저장 완료!</SavedIndicator>}
      
      {isProcessing && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
      
      <HeaderSection>
        <Title>{isEdit ? '게시글 수정' : '새 게시글 작성'}</Title>
        <HelperText>
          {isEdit 
            ? '게시글을 수정한 후 하단의 "수정 완료" 버튼을 클릭하세요.' 
            : '내용을 작성한 후 "작성 완료" 버튼을 클릭하세요.'}
        </HelperText>
      </HeaderSection>
      
      <Form onSubmit={onSubmit}>
        <FormHeader>
          <FormGroup>
            <Label htmlFor="board">게시판</Label>
            <Select
              id="board"
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              disabled={isEdit}
              aria-label="게시판 선택"
            >
              {BOARD_LIST.map((board) => (
                <option key={board.id} value={board.slug}>
                  {board.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormHeader>
        
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={maxTitleChars}
            required
            aria-required="true"
          />
          <CharacterCount>{titleCharCount}/{maxTitleChars}</CharacterCount>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            type="text"
            placeholder="작성자 이름 (입력하지 않으면 '익명'으로 표시됩니다)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </FormGroup>
        
        <Divider />
        
        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            aria-required="true"
          />
        </FormGroup>
        
        <ButtonGroup>
          <Button 
            type="submit" 
            disabled={isProcessing || !isFormValid}
          >
            {isProcessing ? '저장 중...' : isEdit ? '수정' : '작성 완료'}
          </Button>
          <Button
            type="button"
            $variant="secondary"
            onClick={handleCancel}
          >
            취소
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default React.memo(PostEditPage);



// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import {
//   useGetPostQuery,
//   useCreatePostMutation,
//   useUpdatePostMutation
// } from '../api/apiSlice';
// import type { PostPayload } from '../types';
// import { BOARD_LIST } from '../types';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import ErrorMessage from '../components/common/ErrorMessage';

// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: ${({ theme }) => theme.spacing.xl};
  
//   ${({ theme }) => theme.mediaQueries.tablet} {
//     padding: ${({ theme }) => theme.spacing.lg};
//   }
// `;

// const Title = styled.h1`
//   font-size: 1.8rem;
//   margin-bottom: ${({ theme }) => theme.spacing.lg};
//   color: ${({ theme }) => theme.colors.primary};
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing.md};
//   background-color: ${({ theme }) => theme.colors.white};
//   border-radius: ${({ theme }) => theme.radius.md};
//   box-shadow: ${({ theme }) => theme.shadows.sm};
//   padding: ${({ theme }) => theme.spacing.lg};
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing.sm};
// `;

// const Label = styled.label`
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.text};
// `;

// const Input = styled.input`
//   padding: ${({ theme }) => theme.spacing.sm};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radius.sm};
//   font-size: 1rem;
  
//   &:focus {
//     outline: 2px solid ${({ theme }) => theme.colors.primary};
//     border-color: transparent;
//   }
// `;

// const Select = styled.select`
//   padding: ${({ theme }) => theme.spacing.sm};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radius.sm};
//   font-size: 1rem;
//   background-color: white;
  
//   &:focus {
//     outline: 2px solid ${({ theme }) => theme.colors.primary};
//     border-color: transparent;
//   }
// `;

// const TextArea = styled.textarea`
//   padding: ${({ theme }) => theme.spacing.sm};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radius.sm};
//   font-size: 1rem;
//   resize: vertical;
//   min-height: 300px;
//   font-family: inherit;
  
//   &:focus {
//     outline: 2px solid ${({ theme }) => theme.colors.primary};
//     border-color: transparent;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: ${({ theme }) => theme.spacing.md};
//   margin-top: ${({ theme }) => theme.spacing.md};
// `;

// // const Button = styled.button`
// //   background-color: ${({ theme }) => theme.colors.primary};
// //   color: white;
// //   border: none;
// //   border-radius: ${({ theme }) => theme.radius.sm};
// //   padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
// //   font-weight: 500;
// //   cursor: pointer;
  
// //   &:hover {
// //     background-color: ${({ theme }) => theme.colors.secondary};
// //   }
  
// //   &:disabled {
// //     background-color: ${({ theme }) => theme.colors.textLight};
// //     cursor: not-allowed;
// //   }
// // `;

// const Button = styled.button<{ $isEdit?: boolean }>`
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

// const CancelButton = styled(Button)`
//   background-color: ${({ theme }) => theme.colors.textLight};
  
//   &:hover {
//     background-color: #495057;
//   }
// `;

// const PostEditPage: React.FC = () => {
//   const { slug = 'free', id } = useParams<{ slug: string; id?: string }>();
//   const postIdx = id ? Number(id) : undefined;
//   const isEdit = Boolean(postIdx);
//   const navigate = useNavigate();

//   const { data: existing, isLoading, error } = useGetPostQuery(
//     { slug, postIdx: postIdx! }, 
//     { skip: !isEdit || !postIdx }
//   );
  
//   const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
//   const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [selectedSlug, setSelectedSlug] = useState(slug);
//   const [author, setAuthor] = useState('');

//   useEffect(() => {
//     if (existing) {
//       setTitle(existing.postTitle || '');
//       setContent(existing.postContent || '');
//       setAuthor(existing.postAuthor || '');
//     }
//   }, [existing]);

//   const onSubmit = useCallback(async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const payload: PostPayload = {
//       postTitle: title,
//       postContent: content,
//       postAuthor: author || '익명',
//       isSecret: false // 비밀 게시글 입력 버튼이 필요하다.
//     };
//     try {
//       if (isEdit && postIdx) {
//         const re = await updatePost({
//           slug: selectedSlug,
//           postIdx,
//           body: payload,
//         });
//         //.unwrap();
//         console.log('Post Updated:', re);
//         navigate(`/boards/${selectedSlug}/posts/${postIdx}`);
//       } else {
//         const post = await createPost({
//           slug: selectedSlug,
//           body: payload,
//         }).unwrap();
//         console.log('Post Created:', post);
//         navigate(`/boards/${selectedSlug}/posts/${post.postIdx}`);
//       }
//     } catch (error) {
//       alert('저장 중 오류가 발생했습니다.');
//     }
    
//     // try {
//     //   if (isEdit && postIdx) {
//     //     const re = await updatePost({
//     //       slug: selectedSlug,
//     //       postIdx,
//     //       body: payload
//     //     }).unwrap(); // 근데 얘는 왜 응답값을 안받지? -> unwrap()을 사용하면 Promise를 반환하고, 성공 시에는 응답값을 반환함.
//     //     console.log('Post Updated:', payload);
//     //     console.log('Post response value check~! Updated:', re);
//     //     // navigate(`/boards/${selectedSlug}/posts/${postIdx}`);
//     //   } else {
//     //     const post = await createPost({
//     //       slug: selectedSlug,
//     //       body: payload
//     //     }).unwrap();
//     //     console.log('Post Created:', post);
//     //     // navigate(`/boards/${selectedSlug}/posts/${post.postIdx}`);
//     //   }
//     // } catch (error) {
//     //   alert('저장 중 오류가 발생했습니다.');
//     // }
//   }, [createPost, updatePost, navigate, isEdit, postIdx, selectedSlug, title, content, author]);

//   if (isEdit && isLoading) return <LoadingSpinner />;
//   if (isEdit && (error || !existing)) return <ErrorMessage message="게시글을 불러올 수 없습니다." />;

//   const isProcessing = isCreating || isUpdating;

//   return (
//     <Container>
//       <Title>{isEdit ? '게시글 수정' : '새 게시글 작성'}</Title>
      
//       <Form onSubmit={onSubmit}>
//         <FormGroup>
//           <Label htmlFor="board">게시판</Label>
//           <Select
//             id="board"
//             value={selectedSlug}
//             onChange={(e) => setSelectedSlug(e.target.value)}
//             disabled={isEdit}
//           >
//             {BOARD_LIST.map((board) => (
//               <option key={board.id} value={board.slug}>
//                 {board.name}
//               </option>
//             ))}
//           </Select>
//         </FormGroup>
        
//         <FormGroup>
//           <Label htmlFor="title">제목</Label>
//           <Input
//             id="title"
//             type="text"
//             placeholder="제목을 입력하세요"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </FormGroup>
        
//         <FormGroup>
//           <Label htmlFor="author">작성자</Label>
//           <Input
//             id="author"
//             type="text"
//             placeholder="작성자 이름을 입력하세요"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//         </FormGroup>
        
//         <FormGroup>
//           <Label htmlFor="content">내용</Label>
//           <TextArea
//             id="content"
//             placeholder="내용을 입력하세요"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             required
//           />
//         </FormGroup>
        
//         <ButtonGroup>
//           <Button type="submit" disabled={isProcessing}>
//             {isProcessing ? '저장 중...' : isEdit ? '수정 완료' : '작성 완료'}
//           </Button>
//           <CancelButton
//             type="button"
//             onClick={() => navigate(isEdit ? `/boards/${slug}/posts/${postIdx}` : `/boards/${slug}/posts`)}
//           >
//             취소
//           </CancelButton>
//         </ButtonGroup>
//       </Form>
//     </Container>
//   );
// };

// export default React.memo(PostEditPage);
