// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type {
//   Post,
//   PostPayload,
//   Comment,
//   LoginRequest,
//   LoginResponse,
//   RegisterRequest,
// } from '../types';
// import { setCredentials } from '../features/auth/authSlice';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:80',
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as any).auth.token;
//       if (token) headers.set('Authorization', `Bearer ${token}`);
//       return headers;
//     },
//     cache: 'no-cache', // 캐싱 끄기 (선택사항)
//   }),
//   tagTypes: ['Post', 'Comment', 'User'],
//   endpoints: (builder) => ({
//     // 게시글 목록 (GET /{boardSlug}/posts)
//     getPosts: builder.query<Post[], string>({
//       query: (slug) => `/${slug}/posts`,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map((p) => ({ type: 'Post' as const, id: p.postIdx })),
//               { type: 'Post', id: 'LIST' }
//             ]
//           : [{ type: 'Post', id: 'LIST' }],
//       // 5초마다 데이터 폴링 (선택 사항)
//       // pollingInterval: 5000,
//     }),
    
//     // 게시글 상세 (GET /{boardSlug}/posts/{postIdx})
//     getPost: builder.query<Post, { slug: string; postIdx: number }>({
//       query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}`,
//       providesTags: (_res, _err, { postIdx }) => [{ type: 'Post', id: postIdx }],
//     }),
    
//     // 새 글 작성 (POST /{boardSlug}/posts)
//     createPost: builder.mutation<Post, { slug: string; body: PostPayload }>({
//       query: ({ slug, body }) => ({
//         url: `/${slug}/posts`,
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: [{ type: 'Post', id: 'LIST' }],
//     }),
    
//     // 글 수정 (PUT /{boardSlug}/posts/{postIdx})
//     // updatePost: builder.mutation<Post, { slug: string; postIdx: number; body: PostPayload }>({
//     //   query: ({ slug, postIdx, body }) => ({
//     //     url: `/${slug}/posts/${postIdx}`,
//     //     method: 'PUT',
//     //     body,
//     //   }),
//     //   invalidatesTags: (_res, _err, { postIdx }) => [
//     //     { type: 'Post', id: postIdx },
//     //     { type: 'Post', id: 'LIST' },
//     //   ],
//     // }),
//     updatePost: builder.mutation<Post, { slug: string; postIdx: number; body: PostPayload }>({
//       query: ({ slug, postIdx, body }) => ({
//         url: `/${slug}/posts/${postIdx}`,
//         method: 'PUT',
//         body,
//       }),
//       invalidatesTags: (_result, _error, { postIdx }) => [
//         { type: 'Post', id: postIdx },
//         { type: 'Post', id: 'LIST' },
//       ],
//     }),
    
//     // 글 삭제 (DELETE /{boardSlug}/posts/{postIdx})
//     deletePost: builder.mutation<{ success: boolean }, { slug: string; postIdx: number }>({
//       query: ({ slug, postIdx }) => ({
//         url: `/${slug}/posts/${postIdx}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: [{ type: 'Post', id: 'LIST' }],
//     }),
    
//     // 댓글 목록 (GET /{boardSlug}/posts/{postIdx}/comments)
//     getComments: builder.query<Comment[], { slug: string; postIdx: number }>({
//       query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}/comments`,
//       providesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
//     }),
    
//     // 댓글 작성 (POST /{boardSlug}/posts/{postIdx}/comments)
//     addComment: builder.mutation<Comment, { slug: string; postIdx: number; content: string }>({
//       query: ({ slug, postIdx, content }) => ({
//         url: `/${slug}/posts/${postIdx}/comments`,
//         method: 'POST',
//         body: { content },
//       }),
//       invalidatesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
//     }),
    
//     // 회원가입
//     register: builder.mutation<any, RegisterRequest>({
//       query: (body) => ({ url: '/member/insert', method: 'POST', body }),
//     }),
    
//     // 로그인
//     login: builder.mutation<LoginResponse, LoginRequest>({
//       query: (body) => ({ url: '/member/auth', method: 'POST', body }),
//       async onQueryStarted(args, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           dispatch(setCredentials(data));
//         } catch {
//           // 로그인 실패 처리
//         }
//       },
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// // 훅 자동 생성
// export const {
//   useGetPostsQuery,
//   useGetPostQuery,
//   useCreatePostMutation,
//   useUpdatePostMutation,
//   useDeletePostMutation,
//   useGetCommentsQuery,
//   useAddCommentMutation,
//   useRegisterMutation,
//   useLoginMutation,
// } = api;

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
    getPosts: builder.query<Post[], string>({
      query: (slug) => `/${slug}/posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: 'Post' as const, id: p.postIdx })),
              { type: 'Post', id: 'LIST' }
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    
    // 게시글 상세 (GET /{boardSlug}/posts/{postIdx})
    getPost: builder.query<Post, { slug: string; postIdx: number }>({
      query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}`,
      providesTags: (_res, _err, { postIdx }) => [{ type: 'Post', id: postIdx }],
    }),
    
    // 새 글 작성 (POST /{boardSlug}/posts)
    // createPost: builder.mutation<Post, { slug: string; body: PostPayload }>({
    //   query: ({ slug, body }) => ({
    //     url: `/${slug}/posts`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    // }),
    createPost: builder.mutation<Post, { slug: string; body: PostPayload }>({
      query: ({ slug, body }) => ({
        url: `/${slug}/posts`,
        method: 'POST',
        body,
        responseHandler: (response: Response) => response.text(),
      }),
      transformResponse: (responseText: string): Post => {
        try {
          return JSON.parse(responseText);
        } catch {
          // 파싱 실패 시 원본 텍스트 반환 (타입 캐스팅 필요)
          return responseText as unknown as Post;
        }
      },
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    
    // 글 수정 (PUT /{boardSlug}/posts/{postIdx})
    updatePost: builder.mutation<Post, { slug: string; postIdx: number; body: PostPayload }>({
      query: ({ slug, postIdx, body }) => ({
        url: `/${slug}/posts/${postIdx}`,
        method: 'PUT',
        body,
        responseHandler: (response: Response) => response.text(),
      }),
      transformResponse: (responseText: string): Post => {
        try {
          return JSON.parse(responseText);
        } catch {
          // 파싱 실패 시 원본 텍스트 반환 (타입 캐스팅 필요)
          return responseText as unknown as Post;
        }
      },
      invalidatesTags: (_result, _error, { postIdx }) => [
        { type: 'Post', id: postIdx },
        { type: 'Post', id: 'LIST' },
      ],
    }),
    
    // 글 삭제 (DELETE /{boardSlug}/posts/{postIdx})
    deletePost: builder.mutation<{ success: boolean }, { slug: string; postIdx: number }>({
      query: ({ slug, postIdx }) => ({
        url: `/${slug}/posts/${postIdx}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    
    // 댓글 목록 (GET /{boardSlug}/posts/{postIdx}/comments)
    // 댓글 목록 (POST /{postIdx}/comments)
    // getComments: builder.query<Comment[], { slug: string; postIdx: number }>({
    //   query: ({ slug, postIdx }) => `/${slug}/posts/${postIdx}/comments`,
    //   providesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
    // }),
    // 댓글 목록 조회 - 수정된 엔드포인트 (/{postIdx}/comments)
    getComments: builder.query<Comment[], number>({
      query: (postIdx) => `/${postIdx}/comments`,
      providesTags: (result, error, postIdx) => 
        result
          ? [
              ...result.map(({ commentIdx }) => ({ type: 'Comment' as const, id: commentIdx })),
              { type: 'Comment', id: `LIST-${postIdx}` }
            ]
          : [{ type: 'Comment', id: `LIST-${postIdx}` }]
    }),
    
    // 댓글 작성 (POST /{boardSlug}/posts/{postIdx}/comments)
    // 댓글 작성 ㅍㅍ
    // addComment: builder.mutation<Comment, { slug: string; postIdx: number; content: string }>({
    //   query: ({ slug, postIdx, content }) => ({
    //     url: `/${postIdx}/comments`,
    //     // url: `/${slug}/posts/${postIdx}/comments`,
    //     method: 'POST',
    //     // body: { content },
    //     body: { content },
    //   }),
    //   invalidatesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
    // }),
    addComment: builder.mutation<string, { postIdx: number; content: string; author: string }>({
      query: ({ postIdx, content, author }) => ({
        url: `/${postIdx}/comments`,
        method: 'POST',
        body: { 
          // 해당 부분도 원래 로그인했을때 필수적으로 받아야한다.
          userId: 1, // 현재 로그인된 사용자 ID으로 알아서 처리해줘야한다.
          postIdx: postIdx, // 포스트idx는 알아서 현재 포스트idx를 받아와야지.
          // 이거는 왜 그렇게 결정되는가? 
          commentParentIdx: 789, // 부모 댓글 ID (최상위 댓글의 경우)
          commentContent: content,
          commentAuthor: author, // 저자는 그냥 현재 사람의 이름을 받아오면 된다.
          isDelete: 0
        },
        responseHandler: (response) => response.text(), // text/plain 응답 처리
      }),
      transformResponse: (response: string) => {
        if (response === '작성실패') {
          throw new Error('댓글 작성에 실패했습니다.');
        }
        return response;
      },
      invalidatesTags: (result, error, { postIdx }) => 
        [{ type: 'Comment', id: `LIST-${postIdx}` }]
    }),

    // 댓글 수정 (PUT /{boardSlug}/posts/{postIdx}/comments/{commentIdx})
    updateComment: builder.mutation<Comment, { slug: string; postIdx: number; commentIdx: number; content: string }>({
      query: ({ slug, postIdx, commentIdx, content }) => ({
        url: `/${slug}/posts/${postIdx}/comments/${commentIdx}`,
        method: 'PUT',
        body: { commentContent: content },
      }),
      invalidatesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
    }),
    // 댓글 삭제 (DELETE /{boardSlug}/posts/{postIdx}/comments/{commentIdx})
    deleteComment: builder.mutation<{ success: boolean }, { slug: string; postIdx: number; commentIdx: number }>({
      query: ({ slug, postIdx, commentIdx }) => ({
        url: `/${slug}/posts/${postIdx}/comments/${commentIdx}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { postIdx }) => [{ type: 'Comment', id: `LIST-${postIdx}` }],
    }),

    // 회원가입
    register: builder.mutation<any, RegisterRequest>({
      query: (body) => ({ url: '/member/insert', method: 'POST', body }),
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
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useRegisterMutation,
  useLoginMutation,
} = api;
