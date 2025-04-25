// src/types/index.ts

/** 사용자 정보 */  
export interface User {  
    id: number;  
    username: string;  
    email?: string;  
  }
  
  /** 게시글 단건 */  
  export interface Post {  
    id: number;  
    title: string;  
    content: string;  
    author: User;  
    category: string;  //
    createdAt: string;  
    views: number;  
    likesCount: number;  // 북마크랑 구분하기(북마크 들어갈예정)
    likedByUser?: boolean;  //추가 예정이라고 하심.
  }
  
  /** 게시글 목록 응답 */  
  export interface PostsResponse {  
    posts: Post[];  
    total?: number;  
  }
  
  /** 게시글 생성·수정 요청 */  
  export interface PostPayload {  
    title: string;  
    content: string;  
    category: string;  
  }
  
  /** 댓글 */  
  export interface Comment {  
    id: number;  
    postId: number;  
    content: string;  
    author: User;  
    createdAt: string;  
  }
  
  /** 로그인 요청 */  
  export interface LoginRequest {  
    username: string;  
    password: string;  
  }
  
  /** 로그인 응답 */  
  export interface LoginResponse {  
    user: User;  
    token: string;  
  }
  
  /** 회원가입 요청 */  
  export interface RegisterRequest {  
    username: string;  
    email: string;  
    password: string;  
  }
  