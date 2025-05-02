import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostsQuery } from '../api/apiSlice';
import type { Post } from '../types';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;
const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const Item = styled.li`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const BoardListPage: React.FC = () => {
  // 그냥 지금 만들까..?
  const { slug } = useParams(); // /:slug 경로에서 slug 추출
  const { data, isLoading, error } = useGetPostsQuery(slug || 'free');
  // useEffect(() => {
  //   if (error) {
  //     console.error('Error fetching posts:', error);
  //   }
    
  // }, []);

  if (isLoading) return <Container>로딩 중...</Container>;
  if (error || !data) return <Container>게시글을 불러올 수 없습니다.</Container>;

  return (
    <Container>
      
      {/*일단 지금은 free로 고정, 나중에 slug로 바꿔야함 -> 그렇게 페이지를 하나로 관리할 수 있다.*/}
      {/* <Link to={`/boards/${slug || 'free'}/posts/create`}>작성</Link> */}
      <Link to={`/boards/${"free"}/posts/create`}>작성</Link>
      <Title><small>{`[${slug || '자유게시판'}]의`}</small> 게시글 목록</Title>
      {/* <Title>게시글 목록</Title> */}
      <List>
        {data.map((post: any) => (
          <Item key={post.postIdx}>
            {/** free를 제거하고 board로 부터 받아올 수 있어야한다. */}
            <Link to={`/boards/${slug || 'free'}/posts/${post.postIdx}`}>
              {post.postTitle}
            </Link>
          </Item>
        ))}
      </List>

    </Container>
  );
};

export default BoardListPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import instance from '../api/axios';

// const Container = styled.div`
//   padding: ${({ theme }) => theme.spacing.lg};
// `;
// const Title = styled.h2`
//   margin-bottom: ${({ theme }) => theme.spacing.md};
// `;
// const List = styled.ul`
//   list-style: none;
//   padding: 0;
// `;
// const Item = styled.li`
//   padding: ${({ theme }) => theme.spacing.sm} 0;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.border};
// `;

// const BoardListPage: React.FC = () => {
//   const { slug } = useParams(); // /:slug 경로에서 slug 추출
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     instance
//       .get(`/${"free"}/posts`) // slug가 있으면 `/localhost/${slug}/posts`
//       .then((res) => {
//         setPosts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('게시글을 불러올 수 없습니다.');
//         setLoading(false);
//       });
//   }, [slug]);

//   if (loading) return <Container>로딩 중...</Container>;
//   if (error) return <Container>{error}</Container>;

//   return (
//     <Container>
//       <Title>게시글 목록</Title>
//       <List>
//         {posts.map((post: any) => (
//           <Item key={post.postId}>
//             <Link to={`/boards/${post.boardId}/posts/${post.postId}`}>
//               {post.postTitle}
//             </Link>
//           </Item>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default BoardListPage;
