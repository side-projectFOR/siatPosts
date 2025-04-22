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
  const { slug, id } = useParams<{ slug: string; id?: string }>();
  const postId = id ? Number(id) : undefined;
  const isEdit = Boolean(postId);
  const navigate = useNavigate();

  const { data: existing } = useGetPostQuery(postId!, { skip: !isEdit });
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(slug || 'general');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content);
      setCategory(slug!);
    }
  }, [existing, slug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: PostPayload = { title, content, category };
    if (isEdit && postId) {
      await updatePost({ id: postId, body: payload }).unwrap();
      navigate(`/boards/${slug}/posts/${postId}`);
    } else {
      const post = await createPost(payload).unwrap();
      navigate(`/boards/${slug}/posts/${post.id}`);
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
