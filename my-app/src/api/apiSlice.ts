// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Post,
  PostsResponse,
  PostPayload,
  Comment,
  LoginRequest,
  LoginResponse,
  RegisterRequest
} from '../types';
import { setCredentials } from '../features/auth/authSlice';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:80',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Post', 'Comment', 'User'],
  endpoints: (builder) => ({
    // 게시글 목록
    getPosts: builder.query<Post[], string>({
      query: (slug) => `/${slug}/posts`, // (boardSlug) => `/${boardSlug}/posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: 'Post' as const, id: p.id })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }]
    }),
    // 여기서부터 게시글 상세, 작성, 수정, 삭제
    
    // 게시글 상세
    getPost: builder.query<Post, number>({
      query: (id) => `/boards/slugs/posts/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Post', id }]
    }),
    // 새 글 작성
    createPost: builder.mutation<Post, PostPayload>({
      query: (body) => ({ url: '/boards/slugs/posts', method: 'POST', body }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    // 글 수정
    updatePost: builder.mutation<Post, { id: number; body: PostPayload }>({
      query: ({ id, body }) => ({
        url: `/boards/slugs/posts/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' }
      ]
    }),
    // 글 삭제
    deletePost: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: `/boards/slugs/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    // 댓글 목록
    getComments: builder.query<Comment[], number>({
      query: (postId) => `/boards/slugs/posts/${postId}/comments`,
      providesTags: (_res, _err, postId) => [{ type: 'Comment', id: `LIST-${postId}` }]
    }),
    // 댓글 작성
    addComment: builder.mutation<Comment, { postId: number; content: string }>({
      query: ({ postId, content }) => ({
        url: `/boards/slugs/posts/${postId}/comments`,
        method: 'POST',
        body: { content }
      }),
      invalidatesTags: (_res, _err, { postId }) => [{ type: 'Comment', id: `LIST-${postId}` }]
    }),
    // 회원가입
    register: builder.mutation<any, RegisterRequest>({
      query: (body) => ({ url: '/member/insert', method: 'POST', body })
    }),
    // 로그인
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/member/auth', method: 'POST', body }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // 로그인 실패 처리
        }
      },
      invalidatesTags: ['User']
    })
  })
});

// 훅 자동 생성
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useRegisterMutation,
  useLoginMutation
} = api;
