import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Post,
  PostPayload,
  Comment,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
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
    },
    cache: 'no-cache', // 캐싱 끄기 (선택사항)
  }),
  tagTypes: ['Post', 'Comment', 'User'],
  endpoints: (builder) => ({
    // 게시글 목록 (GET /{boardSlug}/posts)
    getPosts: builder.query({
      query: (slug) => `/${slug}/posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: 'Post' as const, id: p.postIdx })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }],
      // 5초마다 데이터 폴링 (선택 사항)
      // pollingInterval: 5000,
      transformResponse: (response: Post[]) => {
        return response?.sort((a, b) => b.postIdx - a.postIdx) || [];
      }
    }),
    
    // 게시글 상세 (GET /{boardSlug}/posts/{postIdx})
    getPost: builder.query({
      query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}`,
      providesTags: (_res, _err, { postIdx }) => [{ type: 'Post', id: postIdx }],
    }),
    
    // 새 글 작성 (POST /{boardSlug}/posts)
    createPost: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/${slug}/posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
      // 성공 토스트 메시지
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          // App.tsx에서 rtkQueryErrorMiddleware로 처리됨
        } catch (err) {
          // 에러는 미들웨어에서 처리됨
        }
      },
    }),
    
    // 글 수정 (PUT /{boardSlug}/posts/{postIdx})
    updatePost: builder.mutation({
      query: ({ slug, postIdx, body }) => ({
        url: `/${slug}/posts/${postIdx}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_res, _err, { postIdx }) => [
        { type: 'Post', id: postIdx },
        { type: 'Post', id: 'LIST' },
      ],
      // 성공 토스트 메시지
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          // App.tsx에서 rtkQueryErrorMiddleware로 처리됨
        } catch (err) {
          // 에러는 미들웨어에서 처리됨
        }
      },
    }),
    
    // 글 삭제 (DELETE /{boardSlug}/posts/{postIdx})
    deletePost: builder.mutation({
      query: ({ slug, postIdx }) => ({
        url: `/${slug}/posts/${postIdx}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    
    // 댓글 목록 (GET /{boardSlug}/posts/{postIdx}/comments)
    getComments: builder.query({
      query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}/comments`,
      providesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
    }),
    
    // 댓글 작성 (POST /{boardSlug}/posts/{postIdx}/comments)
    addComment: builder.mutation({
      query: ({ slug, postIdx, content }) => ({
        url: `/${slug}/posts/${postIdx}/comments`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
    }),
    
    // 회원가입
    register: builder.mutation({
      query: (body) => ({ url: '/member/insert', method: 'POST', body }),
    }),
    
    // 로그인
    login: builder.mutation({
      query: (body) => ({ url: '/member/auth', method: 'POST', body }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // 로그인 실패 처리 (미들웨어에서 처리)
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
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
  useLoginMutation,
} = api;
