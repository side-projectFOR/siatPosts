// import React, { useCallback, useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import styled, { css } from 'styled-components';
// import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../app/store';

// // --- 스타일 정의 ---
// const Container = styled.div`
//   max-width: 600px;
//   margin: 48px auto 0 auto;
//   padding: 40px 32px 32px 32px;
//   background: #f7f8fa;
//   border-radius: 16px;
//   font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Segoe UI', Arial, sans-serif;
// `;

// const Controls = styled.div`
//   display: flex;
//   gap: 16px;
//   margin-bottom: 36px;
// `;

// const buttonBase = css`
//   border: none;
//   outline: none;
//   border-radius: 10px;
//   font-weight: 600;
//   font-size: 1.07rem;
//   padding: 11px 28px;
//   cursor: pointer;
//   transition: background 0.15s, box-shadow 0.13s, transform 0.10s;
//   box-shadow: 0 1.5px 0 0 #e3e6ed;
//   &:active {
//     transform: scale(0.98);
//     box-shadow: 0 0.5px 0 0 #e3e6ed;
//   }
// `;

// const ListButton = styled.button`
//   ${buttonBase}
//   background: #111;
//   color: #fff;
  
//   &:hover {
//     background: #222;
//   }
// `;

// const EditButton = styled(Link)`
//   ${buttonBase}
//   background: transparent;
//   color: #4662e4;
//   border: none;
//   box-shadow: none;
//   padding: 11px 16px;
//   &:hover {
//     text-decoration: underline;
//     background: #eaf0ff;
//   }
// `;

// const DeleteButton = styled.button`
//   ${buttonBase}
//   background: #111;
//   color: #fff;
//   border: none;
//   box-shadow: none;
//   &:hover {
//     background: #222;
//   }
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   font-weight: 700;
//   margin: 0 0 22px 0;
//   color: #23272f;
//   letter-spacing: -0.5px;
// `;

// const InfoBox = styled.div`
//   background: #fff;
//   border-radius: 10px;
//   padding: 18px 20px 12px 20px;
//   margin-bottom: 26px;
//   box-shadow: 0 1px 4px rgba(76,92,255,0.06);
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const Meta = styled.div`
//   font-size: 1.13rem;
//   color: #4e5562;
//   display: flex;
//   gap: 18px;
//   align-items: center;
//   & span {
//     font-weight: 600;
//     color: #23272f;
//   }
// `;

// const DateText = styled.div`
//   font-size: 1.08rem;
//   color: #6d7582;
// `;

// const Content = styled.div`
//   font-size: 1.18rem;
//   color: #23272f;
//   white-space: pre-line;
//   line-height: 1.7;
//   background: #fff;
//   border-radius: 10px;
//   padding: 24px 20px;
//   box-shadow: 0 1px 4px rgba(76,92,255,0.04);
// `;

// // --- 맨 위로 스크롤 버튼 (단일 버튼으로 수정) ---
// const ScrollTopButton = styled.button`
//   position: fixed;
//   right: 32px;
//   bottom: 40px;
//   width: 54px;
//   height: 54px;
//   border-radius: 50%;
//   background: #111;
//   color: #fff;
//   font-size: 1.13rem;
//   font-weight: bold;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//   border: 2.5px solid #4662e4;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 9999;
//   cursor: pointer;
//   transition: transform 0.2s, box-shadow 0.2s;
  
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
//   }
  
//   &:active {
//     transform: translateY(0);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   }
// `;

// // --- 맨 위로 스크롤 버튼 컴포넌트 (로직 단순화) ---
// const ScrollToTop: React.FC = () => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setVisible(window.scrollY > 120);
//     };
    
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleClick = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (!visible) return null;
  
//   return (
//     <ScrollTopButton onClick={handleClick} aria-label="맨 위로 스크롤">
//       ↑
//     </ScrollTopButton>
//   );
// };

// // --- 게시글 상세 페이지 ---
// const PostDetailPage: React.FC = React.memo(() => {
//   const { slug, id } = useParams<{ slug: string; id: string }>();
//   const postIdx = Number(id);
//   const navigate = useNavigate();
//   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
//   const [deletePost] = useDeletePostMutation();
//   const user = useSelector((s: RootState) => s.auth.user);
//   const isAuthor = Boolean(user && post && user.id === post.userIdx);

//   const onDelete = useCallback(async () => {
//     if (window.confirm('정말 삭제하시겠습니까?')) {
//       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
//       navigate('/boards');
//     }
//   }, [deletePost, navigate, postIdx, slug]);

//   if (isLoading) return <Container>로딩 중...</Container>;
//   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

//   return (
//     <>
//       <Container>
//         <Controls>
//           <ListButton onClick={() => navigate(-1)}>← 뒤로가기</ListButton>
//           {/* (isAuthor || true)  */}
//           {(isAuthor || true) && (
//             <>
//               <EditButton to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditButton>
//               <DeleteButton onClick={onDelete}>삭제</DeleteButton>
//             </>
//           )}
//           {/** 수정필요.  */}
//           <ListButton onClick={() => navigate(`/boards/${"free"}/posts/`)}>목록</ListButton>
//         </Controls>
//         <Title>{post.postTitle}</Title>
//         <InfoBox>
//           <Meta>
//             <span>작성자</span>: {post.postAuthor}
//             <span>조회수</span>: {post.hit}
//           </Meta>
//           <DateText>
//             <span>작성날짜</span>: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
//           </DateText>
//         </InfoBox>
//         <Content>{post.postContent}</Content>
//       </Container>
//       <ScrollToTop />
//     </>
//   );
// });

// export default PostDetailPage;



// // import React, { useCallback, useEffect, useState } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled, { css } from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // // --- 스타일 정의 ---

// // const Container = styled.div`
// //   max-width: 600px;
// //   margin: 48px auto 0 auto;
// //   padding: 40px 32px 32px 32px;
// //   background: #f7f8fa;
// //   border-radius: 16px;
// //   font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Segoe UI', Arial, sans-serif;
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   gap: 16px;
// //   margin-bottom: 36px;
// // `;

// // const buttonBase = css`
// //   border: none;
// //   outline: none;
// //   border-radius: 10px;
// //   font-weight: 600;
// //   font-size: 1.07rem;
// //   padding: 11px 28px;
// //   cursor: pointer;
// //   transition: background 0.15s, box-shadow 0.13s, transform 0.10s;
// //   box-shadow: 0 1.5px 0 0 #e3e6ed;
// //   &:active {
// //     transform: scale(0.98);
// //     box-shadow: 0 0.5px 0 0 #e3e6ed;
// //   }
// // `;

// // const ListButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   border: 2px solid #4c5cff;
// //   box-shadow: 0 2px 0 0 #4c5cff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const EditButton = styled(Link)`
// //   ${buttonBase}
// //   background: transparent;
// //   color: #4662e4;
// //   border: none;
// //   box-shadow: none;
// //   padding: 11px 16px;
// //   &:hover {
// //     text-decoration: underline;
// //     background: #eaf0ff;
// //   }
// // `;

// // const DeleteButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   border: none;
// //   box-shadow: none;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const Title = styled.h2`
// //   font-size: 2rem;
// //   font-weight: 700;
// //   margin: 0 0 22px 0;
// //   color: #23272f;
// //   letter-spacing: -0.5px;
// // `;

// // const InfoBox = styled.div`
// //   background: #fff;
// //   border-radius: 10px;
// //   padding: 18px 20px 12px 20px;
// //   margin-bottom: 26px;
// //   box-shadow: 0 1px 4px rgba(76,92,255,0.06);
// //   display: flex;
// //   flex-direction: column;
// //   gap: 10px;
// // `;

// // const Meta = styled.div`
// //   font-size: 1.13rem;
// //   color: #4e5562;
// //   display: flex;
// //   gap: 18px;
// //   align-items: center;
// //   & span {
// //     font-weight: 600;
// //     color: #23272f;
// //   }
// // `;

// // const DateText = styled.div`
// //   font-size: 1.08rem;
// //   color: #6d7582;
// // `;

// // const Content = styled.div`
// //   font-size: 1.18rem;
// //   color: #23272f;
// //   white-space: pre-line;
// //   line-height: 1.7;
// //   background: #fff;
// //   border-radius: 10px;
// //   padding: 24px 20px;
// //   box-shadow: 0 1px 4px rgba(76,92,255,0.04);
// // `;

// // // --- 맨 위로 스크롤 버튼 스타일 ---
// // const ScrollTopButton = styled.button`
// //   position: fixed;
// //   right: 32px;
// //   bottom: 40px;
// //   width: 54px;
// //   height: 54px;
// //   border-radius: 50%;
// //   background: #111;
// //   color: #fff;
// //   font-size: 1.13rem;
// //   font-weight: bold;
// //   box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
// //   border: 2px solid #4c5cff;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   z-index: 9999;
// //   cursor: pointer;
// //   opacity: 0.85;
// //   transition: background 0.15s, opacity 0.2s, box-shadow 0.2s;
// //   &:hover {
// //     background: #222;
// //     opacity: 1;
// //     box-shadow: 0 12px 24px 0 rgba(76,92,255,0.12);
// //   }
// // `;

// // // --- 맨 위로 스크롤 버튼 컴포넌트 ---
// // const ScrollToTop: React.FC = () => {
// //   const [visible, setVisible] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setVisible(window.scrollY > 120);
// //     };
// //     window.addEventListener('scroll', handleScroll, { passive: true });
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   const handleClick = () => {
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   if (!visible) return null;
// //   return (
// //     <ScrollTopButton onClick={handleClick} title="맨 위로">
// //       ↑
// //     </ScrollTopButton>
// //   );
// // };

// // // --- 게시글 상세 페이지 ---
// // const PostDetailPage: React.FC = React.memo(() => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);
// //   const isAuthor = Boolean(user && post && user.id === post.userIdx);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <>
// //       <Container>
// //         <Controls>
// //           <ListButton onClick={() => navigate(-1)}>← 목록</ListButton>
// //           {isAuthor && (
// //             <>
// //               <EditButton to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditButton>
// //               <DeleteButton onClick={onDelete}>삭제</DeleteButton>
// //             </>
// //           )}
// //         </Controls>
// //         <Title>{post.postTitle}</Title>
// //         <InfoBox>
// //           <Meta>
// //             <span>작성자</span>: {post.postAuthor}
// //             <span>조회수</span>: {post.hit}
// //           </Meta>
// //           <DateText>
// //             <span>작성날짜</span>: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
// //           </DateText>
// //         </InfoBox>
// //         <Content>{post.postContent}</Content>
// //       </Container>
// //       <ScrollToTop />
// //     </>
// //   );
// // });

// // export default PostDetailPage;


// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled, { css } from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // // 스타일 정의
// // const Container = styled.div`
// //   max-width: 600px;
// //   margin: 48px auto 0 auto;
// //   padding: 40px 32px 32px 32px;
// //   background: #f7f8fa;
// //   border-radius: 16px;
// //   font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Segoe UI', Arial, sans-serif;
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   gap: 16px;
// //   margin-bottom: 36px;
// // `;

// // const buttonBase = css`
// //   border: none;
// //   outline: none;
// //   border-radius: 10px;
// //   font-weight: 600;
// //   font-size: 1.07rem;
// //   padding: 11px 28px;
// //   cursor: pointer;
// //   transition: background 0.15s, box-shadow 0.13s, transform 0.10s;
// //   box-shadow: 0 1.5px 0 0 #e3e6ed;
// //   &:active {
// //     transform: scale(0.98);
// //     box-shadow: 0 0.5px 0 0 #e3e6ed;
// //   }
// // `;

// // const ListButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   border: 2px solid #4c5cff;
// //   box-shadow: 0 2px 0 0 #4c5cff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const EditButton = styled(Link)`
// //   ${buttonBase}
// //   background: transparent;
// //   color: #4662e4;
// //   border: none;
// //   box-shadow: none;
// //   padding: 11px 16px;
// //   &:hover {
// //     text-decoration: underline;
// //     background: #eaf0ff;
// //   }
// // `;

// // const DeleteButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   border: none;
// //   box-shadow: none;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const Title = styled.h2`
// //   font-size: 2rem;
// //   font-weight: 700;
// //   margin: 0 0 22px 0;
// //   color: #23272f;
// //   letter-spacing: -0.5px;
// // `;

// // const Meta = styled.div`
// //   font-size: 1.13rem;
// //   color: #4e5562;
// //   margin-bottom: 8px;
// // `;

// // const DateText = styled.div`
// //   font-size: 1.08rem;
// //   color: #6d7582;
// //   margin-bottom: 18px;
// // `;

// // const Content = styled.div`
// //   font-size: 1.18rem;
// //   color: #23272f;
// //   white-space: pre-line;
// //   line-height: 1.7;
// // `;

// // const PostDetailPage: React.FC = React.memo(() => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);
// //   const isAuthor = Boolean(user && post && user.id === post.userIdx);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <ListButton onClick={() => navigate(-1)}>← 목록</ListButton>
// //         {isAuthor && (
// //           <>
// //             <EditButton to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditButton>
// //             <DeleteButton onClick={onDelete}>삭제</DeleteButton>
// //           </>
// //         )}
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <Meta>
// //         작성자: {post.postAuthor} | 조회수: {post.hit}
// //       </Meta>
// //       <DateText>
// //         작성날짜: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
// //       </DateText>
// //       <Content>{post.postContent}</Content>
// //     </Container>
// //   );
// // });

// // export default PostDetailPage;


// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled, { css } from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // // 전체 컨테이너
// // const Container = styled.div`
// //   max-width: 1200px;
// //   margin: 48px auto 0 auto;
// //   padding: 40px 32px 32px 32px;
// //   background: #f7f8fa;
// //   border-radius: 16px;
// //   font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Segoe UI', Arial, sans-serif;
// // `;

// // // 버튼 스타일 통일
// // const Controls = styled.div`
// //   display: flex;
// //   gap: 12px;
// //   margin-bottom: 36px;
// // `;

// // const buttonBase = css`
// //   border: none;
// //   outline: none;
// //   border-radius: 10px;
// //   font-weight: 600;
// //   font-size: 1.07rem;
// //   padding: 11px 28px;
// //   cursor: pointer;
// //   transition: background 0.15s, box-shadow 0.13s, transform 0.10s;
// //   box-shadow: 0 1.5px 0 0 #e3e6ed;
// //   &:active {
// //     transform: scale(0.98);
// //     box-shadow: 0 0.5px 0 0 #e3e6ed;
// //   }
// // `;

// // const ListButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   border: 2px solid #4c5cff;
// //   box-shadow: 0 2px 0 0 #4c5cff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const EditButton = styled(Link)`
// //   ${buttonBase}
// //   background: #fff;
// //   color: #4662e4;
// //   border: 2px solid #4662e4;
// //   &:hover {
// //     background: #eaf0ff;
// //     color: #222;
// //     text-decoration: underline;
// //   }
// // `;

// // const DeleteButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // // 제목
// // const Title = styled.h2`
// //   font-size: 2.1rem;
// //   font-weight: 700;
// //   margin: 0 0 22px 0;
// //   color: #23272f;
// //   letter-spacing: -0.5px;
// // `;

// // // 정보 구획 박스
// // const InfoBox = styled.div`
// //   background: #fff;
// //   border-radius: 10px;
// //   padding: 18px 20px 12px 20px;
// //   margin-bottom: 26px;
// //   box-shadow: 0 1px 4px rgba(76,92,255,0.06);
// //   display: flex;
// //   flex-direction: column;
// //   gap: 10px;
// // `;

// // // 메타 정보
// // const Meta = styled.div`
// //   font-size: 1.13rem;
// //   color: #4e5562;
// //   display: flex;
// //   gap: 18px;
// //   align-items: center;
// //   & span {
// //     font-weight: 600;
// //     color: #23272f;
// //   }
// // `;

// // // 날짜
// // const DateText = styled.div`
// //   font-size: 1.08rem;
// //   color: #6d7582;
// // `;

// // // 본문
// // const Content = styled.div`
// //   font-size: 1.18rem;
// //   color: #23272f;
// //   white-space: pre-line;
// //   line-height: 1.7;
// //   background: #fff;
// //   border-radius: 10px;
// //   padding: 24px 20px;
// //   box-shadow: 0 1px 4px rgba(76,92,255,0.04);
// // `;

// // const PostDetailPage: React.FC = React.memo(() => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <ListButton onClick={() => navigate(-1)}>← 목록</ListButton>
// //         <EditButton to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditButton>
// //         <DeleteButton onClick={onDelete}>삭제</DeleteButton>
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <InfoBox>
// //         <Meta>
// //           <span>작성자</span>: {post.postAuthor}
// //           <span>조회수</span>: {post.hit}
// //         </Meta>
// //         <DateText>
// //           <span>작성날짜</span>: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
// //         </DateText>
// //       </InfoBox>
// //       <Content>{post.postContent}</Content>
// //     </Container>
// //   );
// // });

// // export default PostDetailPage;


// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled, { css } from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // const Container = styled.div`
// //   max-width: 600px;
// //   margin: 48px auto 0 auto;
// //   padding: 40px 32px 32px 32px;
// //   background: #f7f8fa;
// //   border-radius: 16px;
// //   box-shadow: 0 2px 12px rgba(0,0,0,0.04);
// //   font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Segoe UI', Arial, sans-serif;
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   gap: 12px;
// //   margin-bottom: 32px;
// // `;

// // const buttonBase = css`
// //   border: none;
// //   outline: none;
// //   border-radius: 10px;
// //   font-weight: 600;
// //   font-size: 1.07rem;
// //   padding: 11px 28px;
// //   cursor: pointer;
// //   transition: background 0.15s, box-shadow 0.13s, transform 0.10s;
// //   box-shadow: 0 1.5px 0 0 #e3e6ed;
// //   &:active {
// //     transform: scale(0.98);
// //     box-shadow: 0 0.5px 0 0 #e3e6ed;
// //   }
// // `;

// // const ListButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   border: 2px solid #4c5cff;
// //   box-shadow: 0 2px 0 0 #4c5cff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const EditLink = styled(Link)`
// //   ${buttonBase}
// //   background: transparent;
// //   color: #4662e4;
// //   border: 2px solid transparent;
// //   &:hover {
// //     background: #eaf0ff;
// //     text-decoration: underline;
// //   }
// // `;

// // const DeleteButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const Title = styled.h2`
// //   font-size: 2.1rem;
// //   font-weight: 700;
// //   margin: 0 0 18px 0;
// //   color: #23272f;
// //   letter-spacing: -0.5px;
// // `;

// // const InfoBox = styled.div`
// //   background: #fff;
// //   border-radius: 10px;
// //   padding: 18px 20px 12px 20px;
// //   margin-bottom: 20px;
// //   box-shadow: 0 1px 4px rgba(76,92,255,0.06);
// //   display: flex;
// //   flex-direction: column;
// //   gap: 8px;
// // `;

// // const Meta = styled.div`
// //   font-size: 1.13rem;
// //   color: #4e5562;
// //   display: flex;
// //   gap: 14px;
// //   align-items: center;
// //   & span {
// //     font-weight: 500;
// //     color: #23272f;
// //   }
// // `;

// // const DateText = styled.div`
// //   font-size: 1.08rem;
// //   color: #6d7582;
// // `;

// // const Content = styled.div`
// //   font-size: 1.18rem;
// //   color: #23272f;
// //   white-space: pre-line;
// //   line-height: 1.7;
// //   background: #fff;
// //   border-radius: 10px;
// //   padding: 24px 20px;
// //   box-shadow: 0 1px 4px rgba(76,92,255,0.04);
// // `;

// // const PostDetailPage: React.FC = React.memo(() => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <ListButton onClick={() => navigate(-1)}>← 목록</ListButton>
// //         <EditLink to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditLink>
// //         <DeleteButton onClick={onDelete}>삭제</DeleteButton>
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <InfoBox>
// //         <Meta>
// //           <span>작성자:</span> {post.postAuthor}
// //           <span>조회수:</span> {post.hit}
// //         </Meta>
// //         <DateText>
// //           <span>작성날짜:</span> {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
// //         </DateText>
// //       </InfoBox>
// //       <Content>{post.postContent}</Content>
// //     </Container>
// //   );
// // });

// // export default PostDetailPage;


// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled, { css } from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // // 토스/애플 스타일 기본값
// // const Container = styled.div`
// //   max-width: 520px;
// //   margin: 56px auto 0 auto;
// //   padding: 40px 24px 36px 24px;
// //   background: #f7f8fa;
// //   border-radius: 18px;
// //   box-shadow: 0 2px 16px rgba(0,0,0,0.06);
// //   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   gap: 14px;
// //   margin-bottom: 32px;
// // `;

// // const buttonBase = css`
// //   border: none;
// //   outline: none;
// //   border-radius: 12px;
// //   font-weight: 600;
// //   font-size: 1.08rem;
// //   padding: 12px 30px;
// //   cursor: pointer;
// //   transition: background 0.15s, box-shadow 0.13s, transform 0.10s;
// //   box-shadow: 0 1.5px 0 0 #e3e6ed;
// //   &:active {
// //     transform: scale(0.98);
// //     box-shadow: 0 0.5px 0 0 #e3e6ed;
// //   }
// // `;

// // const ListButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   border: 2px solid #4c5cff;
// //   box-shadow: 0 2px 0 0 #4c5cff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const EditLink = styled(Link)`
// //   ${buttonBase}
// //   background: transparent;
// //   color: #4662e4;
// //   border: 2px solid transparent;
// //   &:hover {
// //     background: #eaf0ff;
// //     text-decoration: underline;
// //   }
// // `;

// // const DeleteButton = styled.button`
// //   ${buttonBase}
// //   background: #111;
// //   color: #fff;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const Title = styled.h2`
// //   font-size: 2.1rem;
// //   font-weight: 700;
// //   margin: 0 0 18px 0;
// //   color: #23272f;
// //   letter-spacing: -0.5px;
// // `;

// // const Meta = styled.div`
// //   font-size: 1.13rem;
// //   color: #4e5562;
// //   margin-bottom: 8px;
// //   letter-spacing: -0.2px;
// // `;

// // const DateText = styled.div`
// //   font-size: 1.08rem;
// //   color: #6d7582;
// //   margin-bottom: 22px;
// // `;

// // const Content = styled.div`
// //   font-size: 1.18rem;
// //   color: #23272f;
// //   white-space: pre-line;
// //   line-height: 1.7;
// // `;

// // const PostDetailPage: React.FC = React.memo(() => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);
// //   const isAuthor = Boolean(user && post && user.id === post.userIdx);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <ListButton onClick={() => navigate(-1)}>← 목록</ListButton>
// //         <EditLink to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditLink>
// //         <DeleteButton onClick={onDelete}>삭제</DeleteButton>
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <Meta>
// //         작성자: {post.postAuthor} | 조회수: {post.hit}
// //       </Meta>
// //       <DateText>
// //         작성날짜: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
// //       </DateText>
// //       <Content>{post.postContent}</Content>
// //     </Container>
// //   );
// // });

// // export default PostDetailPage;


// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // // 레이아웃 및 스타일 정의
// // const Container = styled.div`
// //   background: #f7f8fa;
// //   padding: 48px 32px;
// //   border-radius: 16px;
// //   max-width: 600px;
// //   margin: 48px auto 0 auto;
// //   box-shadow: 0 2px 8px rgba(0,0,0,0.04);
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   gap: 12px;
// //   margin-bottom: 32px;
// // `;

// // const ListButton = styled.button`
// //   background: #111;
// //   color: #fff;
// //   font-size: 18px;
// //   font-weight: 600;
// //   border: none;
// //   border-radius: 8px;
// //   padding: 10px 28px;
// //   cursor: pointer;
// //   box-shadow: 0 0 0 2px #4c5cff;
// //   transition: background 0.15s;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const EditLink = styled(Link)`
// //   color: #4c5cff;
// //   font-size: 18px;
// //   font-weight: 600;
// //   background: transparent;
// //   border: none;
// //   padding: 10px 28px;
// //   border-radius: 8px;
// //   text-decoration: none;
// //   display: inline-flex;
// //   align-items: center;
// //   justify-content: center;
// //   transition: background 0.15s;
// //   &:hover {
// //     background: #e7eaff;
// //   }
// // `;

// // const DeleteButton = styled.button`
// //   background: #111;
// //   color: #fff;
// //   font-size: 18px;
// //   font-weight: 600;
// //   border: none;
// //   border-radius: 8px;
// //   padding: 10px 28px;
// //   cursor: pointer;
// //   transition: background 0.15s;
// //   &:hover {
// //     background: #222;
// //   }
// // `;

// // const Title = styled.h2`
// //   margin: 0 0 20px 0;
// //   font-size: 2.2rem;
// //   font-weight: bold;
// //   color: #222;
// // `;

// // const Meta = styled.div`
// //   font-size: 1.15rem;
// //   color: #444;
// //   margin-bottom: 8px;
// // `;

// // const DateText = styled.div`
// //   font-size: 1.1rem;
// //   color: #555;
// //   margin-bottom: 22px;
// // `;

// // const Content = styled.div`
// //   font-size: 1.18rem;
// //   color: #222;
// //   white-space: pre-line;
// //   line-height: 1.7;
// // `;

// // const PostDetailPage: React.FC = React.memo(() => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);
// //   const isAuthor = Boolean(user && post && user.id === post.userIdx);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <ListButton onClick={() => navigate(-1)}>← 목록</ListButton>
// //         <EditLink to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditLink>
// //         <DeleteButton onClick={onDelete}>삭제</DeleteButton>
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <Meta>
// //         작성자: {post.postAuthor} | 조회수: {post.hit}
// //       </Meta>
// //       <DateText>
// //         작성날짜: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
// //       </DateText>
// //       <Content>{post.postContent}</Content>
// //     </Container>
// //   );
// // });

// // export default PostDetailPage;


// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // const Container = styled.div`
// //   padding: ${({ theme }) => theme.spacing.lg};
// // `;
// // const Title = styled.h2`
// //   margin-bottom: ${({ theme }) => theme.spacing.sm};
// // `;
// // const Meta = styled.p`
// //   color: ${({ theme }) => theme.colors.text};
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// // `;
// // const Content = styled.div`
// //   white-space: pre-line;
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// // `;
// // const Controls = styled.div`
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// //   & > * {
// //     margin-right: ${({ theme }) => theme.spacing.sm};
// //   }
// // `;

// // const PostDetailPage: React.FC = React.memo(() => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);
// //   const isAuthor = Boolean(user && post && user.id === post.userIdx);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <button onClick={() => navigate(-1)}>← 목록</button>
// //         {true && (
// //           <>
// //             <Link to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</Link>
// //             <button onClick={onDelete}>삭제</button>
// //           </>
// //         )}
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <Meta>
// //         작성자: {post.postAuthor} | 조회수: {post.hit}
// //       </Meta>
// //       <Content>작성날짜: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}</Content>
// //       <Content>{post.postContent}</Content>
// //     </Container>
// //   );
// // });

// // export default PostDetailPage;

// // import React, { useCallback } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import styled from 'styled-components';
// // import { useGetPostQuery, useDeletePostMutation } from '../api/apiSlice';
// // import { useSelector } from 'react-redux';
// // import type { RootState } from '../app/store';

// // const Container = styled.div`
// //   padding: ${({ theme }) => theme.spacing.lg};
// // `;
// // const Title = styled.h2`
// //   margin-bottom: ${({ theme }) => theme.spacing.sm};
// // `;
// // const Meta = styled.p`
// //   color: ${({ theme }) => theme.colors.text};
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// // `;
// // const Content = styled.div`
// //   white-space: pre-line;
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// // `;
// // const Controls = styled.div`
// //   margin-bottom: ${({ theme }) => theme.spacing.md};
// //   & > * {
// //     margin-right: ${({ theme }) => theme.spacing.sm};
// //   }
// // `;

// // const PostDetailPage: React.FC = () => {
// //   const { slug, id } = useParams<{ slug: string; id: string }>();
// //   const postIdx = Number(id);
// //   const navigate = useNavigate();
// //   const { data: post, isLoading, error } = useGetPostQuery({ slug: slug || 'free', postIdx });
// //   const [deletePost] = useDeletePostMutation();
// //   const user = useSelector((s: RootState) => s.auth.user);
// //   const isAuthor = Boolean(user && post && user.id === post.userIdx);

// //   const onDelete = useCallback(async () => {
// //     if (window.confirm('정말 삭제하시겠습니까?')) {
// //       await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
// //       navigate('/boards');
// //     }
// //   }, [deletePost, navigate, postIdx, slug]);

// //   if (isLoading) return <Container>로딩 중...</Container>;
// //   if (error || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

// //   return (
// //     <Container>
// //       <Controls>
// //         <button onClick={() => navigate(-1)}>← 목록</button>
// //         {/* {isAuthor && (
// //           <>
// //             <Link to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</Link>
// //             <button onClick={onDelete}>삭제</button>
// //           </>
// //         )} */}
// //         {true && (
// //           <>
// //             <Link to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</Link>
// //             <button onClick={onDelete}>삭제</button>
// //           </>
// //         )}
// //       </Controls>
// //       <Title>{post.postTitle}</Title>
// //       <Meta>
// //         작성자: {post.postAuthor} | 조회수: {post.hit}
// //       </Meta>
// //       <Content>작성자: {post.postAuthor} | 조회수: {post.hit}</Content>
// //       <Content>작성날짜: {post.updateDate ? post.updateDate+"(수정)" : post.regDate}</Content>
      


// //       <Content>{post.postContent}</Content>
      
      
      
// //     </Container>
// //   );
// // };

// // export default PostDetailPage;
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { 
  useGetPostQuery, 
  useDeletePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} from '../api/apiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import CommentList from '../components/comments/CommentList';
import { useToast } from '../components/common/Toast';

// --- 기존 스타일 정의 유지 ---
const Container = styled.div`
  max-width: 600px;
  margin: 48px auto 0 auto;
  padding: 40px 32px 32px 32px;
  background: #f7f8fa;
  border-radius: 16px;
  font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Segoe UI', Arial, sans-serif;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 36px;
`;

const buttonBase = css`
  border: none;
  outline: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.07rem;
  padding: 11px 28px;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.13s, transform 0.10s;
  box-shadow: 0 1.5px 0 0 #e3e6ed;
  &:active {
    transform: scale(0.98);
    box-shadow: 0 0.5px 0 0 #e3e6ed;
  }
`;

const ListButton = styled.button`
  ${buttonBase}
  background: #111;
  color: #fff;
  &:hover {
    background: #222;
  }
`;

const EditButton = styled(Link)`
  ${buttonBase}
  background: transparent;
  color: #4662e4;
  border: none;
  box-shadow: none;
  padding: 11px 16px;
  &:hover {
    text-decoration: underline;
    background: #eaf0ff;
  }
`;

const DeleteButton = styled.button`
  ${buttonBase}
  background: #111;
  color: #fff;
  border: none;
  box-shadow: none;
  &:hover {
    background: #222;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 22px 0;
  color: #23272f;
  letter-spacing: -0.5px;
`;

const InfoBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 18px 20px 12px 20px;
  margin-bottom: 26px;
  box-shadow: 0 1px 4px rgba(76,92,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Meta = styled.div`
  font-size: 1.13rem;
  color: #4e5562;
  display: flex;
  gap: 18px;
  align-items: center;
  & span {
    font-weight: 600;
    color: #23272f;
  }
`;

const DateText = styled.div`
  font-size: 1.08rem;
  color: #6d7582;
`;

const Content = styled.div`
  font-size: 1.18rem;
  color: #23272f;
  white-space: pre-line;
  line-height: 1.7;
  background: #fff;
  border-radius: 10px;
  padding: 24px 20px;
  box-shadow: 0 1px 4px rgba(76,92,255,0.04);
`;

// --- 맨 위로 스크롤 버튼 (단일 버튼으로 수정) ---
const ScrollTopButton = styled.button`
  position: fixed;
  right: 32px;
  bottom: 40px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #111;
  color: #fff;
  font-size: 1.13rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 2.5px solid #4662e4;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

// --- 댓글 섹션 분리선 ---
const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

// --- 맨 위로 스크롤 버튼 컴포넌트 (로직 단순화) ---
const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 120);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;
  
  return (
    <ScrollTopButton onClick={handleClick} aria-label="맨 위로 스크롤">
      ↑
    </ScrollTopButton>
  );
};

// --- 게시글 상세 페이지 ---
const PostDetailPage: React.FC = React.memo(() => {
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const postIdx = Number(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // 게시글 관련 쿼리와 뮤테이션
  const { data: post, isLoading: postLoading, error: postError } = useGetPostQuery({ slug: slug || 'free', postIdx });
  const [deletePost] = useDeletePostMutation();
  
  // 댓글 관련 쿼리와 뮤테이션
  const { data: comments = [], isLoading: commentsLoading } = useGetCommentsQuery({ slug: slug || 'free', postIdx });
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  
  const user = useSelector((s: RootState) => s.auth.user);
  const isAuthor = Boolean(user && post && user.id === post.userIdx);

  // 게시글 삭제 핸들러
  const onDeletePost = useCallback(async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deletePost({ slug: slug || 'free', postIdx: postIdx }).unwrap();
        navigate(-1);
        showToast('게시글이 삭제되었습니다.', 'success');
      } catch (err) {
        showToast('게시글 삭제에 실패했습니다.', 'error');
      }
    }
  }, [deletePost, navigate, postIdx, showToast, slug]);
  
  // 댓글 추가 핸들러
  const handleAddComment = async (content: string) => {
    try {
      await addComment({ 
        slug: slug || 'free', 
        postIdx, 
        content 
      }).unwrap();
      showToast('댓글이 작성되었습니다.', 'success');
    } catch (err) {
      showToast('댓글 작성에 실패했습니다.', 'error');
    }
  };
  
  // 댓글 수정 핸들러
  const handleUpdateComment = async (commentIdx: number, content: string) => {
    try {
      await updateComment({ 
        slug: slug || 'free', 
        postIdx, 
        commentIdx, 
        content 
      }).unwrap();
      showToast('댓글이 수정되었습니다.', 'success');
    } catch (err) {
      showToast('댓글 수정에 실패했습니다.', 'error');
    }
  };
  
  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentIdx: number) => {
    try {
      await deleteComment({ 
        slug: slug || 'free', 
        postIdx, 
        commentIdx 
      }).unwrap();
      showToast('댓글이 삭제되었습니다.', 'success');
    } catch (err) {
      showToast('댓글 삭제에 실패했습니다.', 'error');
    }
  };

  if (postLoading) return <Container>로딩 중...</Container>;
  if (postError || !post) return <Container>게시글을 불러올 수 없습니다.</Container>;

  return (
    <>
      <Container>
        <Controls>
          <ListButton onClick={() => navigate(-1)}>← 뒤로가기</ListButton>
          {(isAuthor || true) && (
            <>
              <EditButton to={`/boards/${slug}/posts/${postIdx}/edit`}>수정</EditButton>
              <DeleteButton onClick={onDeletePost}>삭제</DeleteButton>
            </>
          )}
          <ListButton onClick={() => navigate(`/boards/${"free"}/posts`)}>← 목록</ListButton>

        </Controls>
        <Title>{post.postTitle}</Title>
        <InfoBox>
          <Meta>
            <span>작성자</span>: {post.postAuthor}
            <span>조회수</span>: {post.hit}
          </Meta>
          <DateText>
            <span>작성날짜</span>: {post.updateDate ? `${post.updateDate}(수정)` : post.regDate}
          </DateText>
        </InfoBox>
        <Content>{post.postContent}</Content>
        
        <Divider />
        
        {/* 댓글 섹션 */}
        {commentsLoading ? (
          <div>댓글 로딩 중...</div>
        ) : (
          <CommentList
            comments={comments}
            postIdx={postIdx}
            slug={slug || 'free'}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
          />
        )}
      </Container>
      <ScrollToTop />
    </>
  );
});

export default PostDetailPage;
