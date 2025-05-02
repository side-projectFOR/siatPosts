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
    responseHandler: 'content-type', // // 응답 헤더의 Content-Type에 따라 자동으로 처리
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
              ...result.map((p) => ({ type: 'Post' as const, id: p.postIdx })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }]
    }),
    // 여기서부터 게시글 상세, 작성, 수정, 삭제
    
    // 게시글 상세 (GET /{boardSlug}/posts/{postIdx})
    getPost: builder.query<Post, { slug: string; postIdx: number }>({
      // query: () => `/${"free"}/posts/${1}`,
      query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}`,
      providesTags: (_res, _err, { postIdx }) => [{ type: 'Post', id: postIdx }]
    }),
    // 새 글 작성 (POST /{boardSlug}/posts)
    createPost: builder.mutation<Post, { slug: string; body: PostPayload }>({
      query: ({ slug, body }) => ({
        url: `/${slug}/posts`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    // 글 수정 (PUT /{boardSlug}/posts/{postIdx})
    updatePost: builder.mutation<Post, { slug: string; postIdx: number; body: PostPayload }>({
      query: ({ slug, postIdx, body }) => ({
        url: `/${slug}/posts/${postIdx}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (_res, _err, { postIdx }) => [
        { type: 'Post', id: postIdx },
        { type: 'Post', id: 'LIST' }
      ]
    }),
    // // 글 수정
    // updatePost: builder.mutation<Post, { id: number; body: PostPayload }>({
    //   query: ({ id, body }) => ({
    //     url: `/boards/slugs/posts/${id}`,
    //     method: 'PUT',
    //     body
    //   }),
    //   invalidatesTags: (_res, _err, { id }) => [
    //     { type: 'Post', id },
    //     { type: 'Post', id: 'LIST' }
    //   ]
    // }),
    // // 글 삭제
    // deletePost: builder.mutation<{ success: boolean }, number>({
    //   query: (id) => ({ url: `/boards/slugs/posts/${id}`, method: 'DELETE' }),
    //   invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    // }),
    // 글 삭제 (DELETE /{boardSlug}/posts/{postIdx})
    deletePost: builder.mutation<{ success: boolean }, { slug: string, postIdx: number }>({
      query: ({ slug, postIdx }) => ({
        url: `/${slug}/posts/${postIdx}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    
    // // 댓글 목록
    // getComments: builder.query<Comment[], number>({
    //   query: (postId) => `/boards/slugs/posts/${postId}/comments`,
    //   providesTags: (_res, _err, postId) => [{ type: 'Comment', id: `LIST-${postId}` }]
    // }),
    // 댓글 목록 (GET /{boardSlug}/posts/{postIdx}/comments)
    getComments: builder.query<Comment[], { slug: string; postIdx: number }>({
      query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}/comments`,
      providesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }]
    }),
    // // 댓글 작성
    // addComment: builder.mutation<Comment, { postId: number; content: string }>({
    //   query: ({ postId, content }) => ({
    //     url: `/boards/slugs/posts/${postId}/comments`,
    //     method: 'POST',
    //     body: { content }
    //   }),
    //   invalidatesTags: (_res, _err, { postId }) => [{ type: 'Comment', id: `LIST-${postId}` }]
    // }),
    // 댓글 작성 (POST /{boardSlug}/posts/{postIdx}/comments)
    addComment: builder.mutation<Comment, { slug: string; postIdx: number; content: string }>({
      query: ({ slug, postIdx, content }) => ({
        url: `/${slug}/posts/${postIdx}/comments`,
        method: 'POST',
        body: { content }
      }),
      invalidatesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }]
    }),
    // // 회원가입
    // register: builder.mutation<any, RegisterRequest>({
    //   query: (body) => ({ url: '/member/insert', method: 'POST', body })
    // }),
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
