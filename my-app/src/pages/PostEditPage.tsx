// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import {
//   useGetPostQuery,
//   useCreatePostMutation,
//   useUpdatePostMutation
// } from '../api/apiSlice';
// import type { PostPayload } from '../types';

// const Container = styled.div`
//   padding: ${({ theme }) => theme.spacing.lg};
// `;
// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing.md};
// `;
// const Input = styled.input`
//   padding: ${({ theme }) => theme.spacing.sm};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radius.sm};
// `;
// const TextArea = styled.textarea`
//   padding: ${({ theme }) => theme.spacing.sm};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radius.sm};
// `;
// const Button = styled.button`
//   padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   border-radius: ${({ theme }) => theme.radius.sm};
//   cursor: pointer;
// `;

// const PostEditPage: React.FC = () => {
//   const { slug, id } = useParams<{ slug: string; id?: string }>();
//   const postId = id ? Number(id) : undefined;
//   const isEdit = Boolean(postId);
//   const navigate = useNavigate();

//   const { data: existing } = useGetPostQuery(postId!, { skip: !isEdit });
//   const [createPost] = useCreatePostMutation();
//   const [updatePost] = useUpdatePostMutation();

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState(slug || 'general');

//   useEffect(() => {
//     if (existing) {
//       setTitle(existing.title);
//       setContent(existing.content);
//       setCategory(slug!);
//     }
//   }, [existing, slug]);

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload: PostPayload = { title, content, category };
//     if (isEdit && postId) {
//       await updatePost({ id: postId, body: payload }).unwrap();
//       navigate(`/boards/${slug}/posts/${postId}`);
//     } else {
//       const post = await createPost(payload).unwrap();
//       navigate(`/boards/${slug}/posts/${post.id}`);
//     }
//   };

//   return (
//     <Container>
//       <h2>{isEdit ? '게시글 수정' : '새 게시글 작성'}</h2>
//       <Form onSubmit={onSubmit}>
//         <Input
//           type="text"
//           placeholder="제목"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="dev">개발</option>
//           <option value="qna">Q&A</option>
//           <option value="thoughts">생각</option>
//         </select>
//         <TextArea
//           rows={10}
//           placeholder="내용"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         />
//         <Button type="submit">
//           {isEdit ? '수정 완료' : '작성 완료'}
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default PostEditPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation
} from '../api/apiSlice';
import type { PostPayload } from '../types';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
`;
const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
`;
const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
`;

const PostEditPage: React.FC = () => {
  const { slug = 'free', id } = useParams<{ slug: string; id?: string }>();
  const postIdx = id ? Number(id) : undefined;
  const isEdit = Boolean(postIdx);
  const navigate = useNavigate();

  // 수정: skip을 활용하여 postIdx가 undefined일 때 쿼리 실행 방지
  const { data: existing } = useGetPostQuery(
    { slug, postIdx: postIdx! }, 
    { skip: !isEdit || !postIdx }
  );
  
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(slug || 'free');

  useEffect(() => {
    if (existing) {
      // 수정: 응답 필드명 변경 (API 응답 구조에 맞춤)
      setTitle(existing.postTitle || '');
      setContent(existing.postContent || '');
      setCategory(slug);
    }
  }, [existing, slug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: PostPayload = { 
      // postAuthor?: string, // 필요할까? 
      postTitle: title,
      postContent: content,
      // isSecret?: boolean, // 비밀글 여부
      // postPassword?: string 
    };

    if (isEdit && postIdx) {
      // 수정: 올바른 파라미터 전달 (객체 형태)
      await updatePost({ 
        slug, 
        postIdx, 
        body: payload 
      }).unwrap();
      navigate(`/${slug}/posts/${postIdx}`);
    } else {
      // 수정: 올바른 파라미터 전달 (객체 형태)
      const post = await createPost({ 
        slug, 
        body: payload 
      }).unwrap();
      // 수정: postId → postIdx
      navigate(`/${slug}/posts/${post.postIdx}`);
    }
  };

  return (
    <Container>
      <h2>{isEdit ? '게시글 수정' : '새 게시글 작성'}</h2>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="free">자유</option>
          <option value="dev">개발</option>
          <option value="qna">Q&A</option>
          <option value="thoughts">생각</option>
        </select>
        <TextArea
          rows={10}
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit">
          {isEdit ? '수정 완료' : '작성 완료'}
        </Button>
      </Form>
    </Container>
  );
};

export default PostEditPage;
