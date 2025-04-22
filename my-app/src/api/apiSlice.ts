import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post, PostsResponse, PostPayload, Comment, LoginRequest, LoginResponse, RegisterRequest } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Post', 'Comment', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => '/posts',
      providesTags: (res) =>
        res
          ? [
              ...res.posts.map((p) => ({ type: 'Post' as const, id: p.id })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }]
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (res, err, id) => [{ type: 'Post', id }]
    }),
    createPost: builder.mutation<Post, PostPayload>({
      query: (data) => ({ url: '/posts', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    updatePost: builder.mutation<Post, { id: number; data: PostPayload }>({
      query: ({ id, data }) => ({ url: `/posts/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (res, err, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' }
      ]
    }),
    deletePost: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    getComments: builder.query<Comment[], number>({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (res, err, postId) =>
        res
          ? [
              ...res.map((c) => ({ type: 'Comment' as const, id: c.id })),
              { type: 'Comment', id: `LIST-${postId}` }
            ]
          : [{ type: 'Comment', id: `LIST-${postId}` }]
    }),
    addComment: builder.mutation<Comment, { postId: number; content: string }>({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: 'POST',
        body: { content }
      }),
      invalidatesTags: (res, err, { postId }) => [{ type: 'Comment', id: `LIST-${postId}` }]
    }),
    register: builder.mutation<any, RegisterRequest>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body })
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['User']
    })
  })
});

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
