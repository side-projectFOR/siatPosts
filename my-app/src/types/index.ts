// src/types/index.ts

/** 사용자 정보 */  
export interface User {  
  id: number;  
  username: string;  
  email?: string;  
}
// Post[]가 안될 것 같은데
// 게시글들 -> 게시글 목록 VS 게시글 단건 

// /** 게시글들 */
// export interface Posts {  
//   postIdx: number;  
//   postTitle: string;  
//   postContent: string;  
//   postAuthor: string;  
//   userIdx: number;  
//   hit: number; // 조회수  
//   boardIdx: number;  
//   category: string;  //
//   createdAt: string;   // 작성일 "regDate": "2025-04-15T07:47:45",
//   updatedAt: string;  // 수정일 "updateDate": "2025-04-15T07:48:35",
//   // views: number;  // 조회수
//   likesCount: number;  // 북마크랑 구분하기(북마크 들어갈예정)
//   likedByUser?: boolean;  //추가 예정이라고 하심.
// }

/** 게시글 단건 */  
export interface Post {  
  postIdx: number;  
  postTitle: string;  
  postContent: string;  
  postAuthor: string;
  userIdx: number; 
  hit: number; // 조회수
  boardIdx: number;  
  category: string;  //
  regDate: string;   // 작성일 "regDate": "2025-04-15T07:47:45",
  updateDate: string;  // 수정일 "updateDate": "2025-04-15T07:48:35",
  // views: number;  // 조회수
  isSecret: boolean;  // 비밀글 여부
  isDelete: boolean;  // 삭제 여부


  likesCount: number;  // 북마크랑 구분하기(북마크 들어갈예정)
  likedByUser?: boolean;  //추가 예정이라고 하심.
}

/** 게시글 목록 응답 */  
export interface PostsResponse {  
  posts: Post[];  
  total?: number;  
}


/** 게시글 생성·수정 요청 => 생성 수정 따로 만들어야겠다. (아직 미반영)*/
// 게시글 수정 요청 
export interface PostPayload {  
  //지금은 일단 수정 생성 통합해서 만들었음.
  // 나중에 수정하는게 좋을 것 같다. 왜냐하면, 권한을 가지고 이동시켜야하기 때문.
  userIdx?: number, // 작성자 idx
  postAuthor?: string, // 필요할까? 
  postTitle: string,
  postContent: string,
  isSecret?: boolean, // 비밀글 여부
  postPassword?: string 
}


// /** 게시글 생성 요청 */  
// export interface PostPayload {  
//   "userIdx": 123,
//   // "postAuthor": "닉네임",
//   // "postTitle": "제목",
//   // "postContent": "글내용",
//   // "postPassword": "1234",
//   // "isSecret": false
//   postAuthor: string,
//   postTitle: string,
//   postContent: string,
//   isSecret: boolean, // 비밀글 여부
//   postPassword: string 
// }

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
