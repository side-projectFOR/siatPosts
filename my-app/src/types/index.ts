/** 사용자 정보 */  
export interface User {  
  id: number;  
  username: string;  
  email?: string;  
}

/** 게시글 단건 */  
export interface Post {  
  postIdx: number;
  boardIdx: number;
  userIdx: number;
  postAuthor: string;
  postTitle: string;
  postContent: string;
  hit: number;
  isSecret: boolean;
  regDate: string;
  updateDate: string | null;
  isDelete: boolean;
}

/** 게시글 생성·수정 요청 */  
export interface PostPayload {  
  postTitle: string;  
  postContent: string;  
  postAuthor?: string;
  boardSlug?: string;
  isSecret?: boolean;
}

/** 댓글 */  
export interface Comment {  
  commentIdx: number;  
  postIdx: number;  
  userIdx: number;  
  commentContent: string;  
  commentAuthor: string;  
  regDate: string;  
}
/** 댓글 */  
export interface Comment {  
  // commentIdx: number;  
  postIdx: number;  
  userIdx: number;  
  commentParentIdx: number; // 추가
  commentContent: string;  
  commentAuthor: string; 
  isDelete: number; 
  // regDate: string;  
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

/** 게시판 정보 */
export interface Board {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

/** 게시판 목록 */
export const BOARD_LIST: Board[] = [
  { id: '1', name: '자유게시판', slug: 'free', description: '자유롭게 이야기를 나누는 공간입니다.', icon: '💬' },
  { id: '2', name: '개발 이야기', slug: 'devStorage', description: '개발에 관한 이야기를 공유해요.', icon: '💻' },
  { id: '3', name: '코드 리뷰', slug: 'codeReview', description: '코드 리뷰를 요청하거나 도움을 줄 수 있어요.', icon: '🔍' },
  { id: '4', name: '스터디', slug: 'study', description: '함께 공부할 스터디를 모집해요.', icon: '📚' },
  { id: '5', name: '맛집 공유', slug: 'foodStore', description: '맛집 정보를 공유해요.', icon: '🍽️' },
];
