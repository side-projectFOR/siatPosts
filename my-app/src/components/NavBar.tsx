// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import styled from 'styled-components';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { RootState } from '../app/store';
// // import { logout } from '../features/auth/authSlice';
// // import HamburgerMenu from './HamburgerMenu';

// // const HeaderContainer = styled.header<{ scrolled: boolean }>`
// //   background-color: ${({ theme, scrolled }) => 
// //     scrolled ? theme.colors.white : 'rgba(255, 255, 255, 0.95)'};
// //   backdrop-filter: ${({ scrolled }) => 
// //     scrolled ? 'blur(10px)' : 'none'};
// //   box-shadow: ${({ theme, scrolled }) => 
// //     scrolled ? theme.shadows.sm : 'none'};
// //   padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
// //   position: sticky;
// //   top: 0;
// //   z-index: 100;
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   transition: all 0.3s ease;
// // `;

// // const Logo = styled(Link)`
// //   font-size: 1.25rem;
// //   font-weight: bold;
// //   color: ${({ theme }) => theme.colors.primary};
// //   display: flex;
// //   align-items: center;
  
// //   &:hover {
// //     text-decoration: none;
// //     color: ${({ theme }) => theme.colors.primary};
// //   }
// // `;

// // const Nav = styled.nav`
// //   display: flex;
// //   align-items: center;
// //   gap: ${({ theme }) => theme.spacing.md};
  
// //   @media (max-width: 768px) {
// //     display: none;
// //   }
// // `;

// // const NavLink = styled(Link)`
// //   color: ${({ theme }) => theme.colors.text};
// //   padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
// //   border-radius: ${({ theme }) => theme.radius.sm};
// //   font-size: 0.95rem;
  
// //   &:hover {
// //     background-color: ${({ theme }) => theme.colors.background};
// //   }
// // `;

// // const Button = styled.button`
// //   background-color: ${({ theme }) => theme.colors.primary};
// //   color: white;
// //   border: none;
// //   border-radius: ${({ theme }) => theme.radius.sm};
// //   padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
// //   font-weight: 500;
// //   font-size: 0.95rem;
  
// //   &:hover {
// //     background-color: ${({ theme }) => theme.colors.secondary};
// //   }
// // `;

// // const Header: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useSelector((state: RootState) => state.auth);
// //   const [scrolled, setScrolled] = useState(false);
  
// //   // 스크롤 이벤트 감지
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const offset = window.scrollY;
// //       if (offset > 10) {
// //         setScrolled(true);
// //       } else {
// //         setScrolled(false);
// //       }
// //     };
    
// //     window.addEventListener('scroll', handleScroll);
    
// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, []);
  
// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/');
// //   };
  
// //   // 데스크탑 네비게이션
// //   const desktopNav = (
// //     <Nav>
// //       <NavLink to="/">홈</NavLink>
// //       <NavLink to="/boards/free/posts">자유게시판</NavLink>
// //       <NavLink to="/boards/devStorage/posts">개발 이야기</NavLink>
// //       {(user&&null) ? (
// //         <>
// //           <NavLink to="/profile">{user.username}</NavLink>
// //           <Button onClick={handleLogout}>로그아웃</Button>
// //         </>
// //       ) : (
// //         <>
// //           <NavLink to="/login">로그인</NavLink>
// //           <NavLink to="/register">회원가입</NavLink>
// //         </>
// //       )}
// //     </Nav>
// //   );
  
// //   return (
// //     <HeaderContainer scrolled={scrolled}>
// //       <Logo to="/">게시판</Logo>
// //       <HamburgerMenu desktopNav={desktopNav} />
// //     </HeaderContainer>
// //   );
// // };

// // export default Header;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../app/store';
// import { logout } from '../features/auth/authSlice';
// import HamburgerMenu from './HamburgerMenu';

// // 헤더가 가로 전체를 채우도록 width: 100vw, box-sizing: border-box 적용
// const HeaderContainer = styled.header<{ scrolled: boolean }>`
//   width: 100vw;
//   left: 0;
//   right: 0;
//   background-color: ${({ theme, scrolled }) => 
//     scrolled ? theme.colors.white : 'rgba(255, 255, 255, 0.95)'};
//   backdrop-filter: ${({ scrolled }) => 
//     scrolled ? 'blur(10px)' : 'none'};
//   box-shadow: ${({ theme, scrolled }) => 
//     scrolled ? theme.shadows.sm : 'none'};
//   padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
//   position: sticky;
//   top: 0;
//   z-index: 100;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   transition: all 0.3s ease;
//   box-sizing: border-box;
// `;

// // 내부 컨텐츠를 중앙에 제한하고 싶다면 아래처럼 max-width 활용 가능
// const Inner = styled.div`
//   width: 100%;
//   max-width: 1440px;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `

// const Logo = styled(Link)`
//   font-size: 1.25rem;
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.primary};
//   display: flex;
//   align-items: center;
  
//   &:hover {
//     text-decoration: none;
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const Nav = styled.nav`
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing.md};
  
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const NavLink = styled(Link)`
//   color: ${({ theme }) => theme.colors.text};
//   padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
//   border-radius: ${({ theme }) => theme.radius.sm};
//   font-size: 0.95rem;
  
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.background};
//   }
// `;

// const Button = styled.button`
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   border-radius: ${({ theme }) => theme.radius.sm};
//   padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
//   font-weight: 500;
//   font-size: 0.95rem;
  
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondary};
//   }
// `;

// // 햄버거 버튼은 모바일에서만 보이도록 처리
// const HamburgerWrapper = styled.div`
//   display: none;
//   @media (max-width: 768px) {
//     display: block;
//   }
// `;

// const Header: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   // 데스크탑 네비게이션
//   const desktopNav = (
//     <Nav>
//       <NavLink to="/">홈</NavLink>
//       <NavLink to="/boards/free/posts">자유게시판</NavLink>
//       <NavLink to="/boards/devStorage/posts">개발 이야기</NavLink>
//       |
//       {user ? (
//         <>
//           <NavLink to="/profile">{user.username}</NavLink>
//           <Button onClick={handleLogout}>로그아웃</Button>
//         </>
//       ) : (
//         <>
//           <NavLink to="/login">로그인</NavLink>
//           <NavLink to="/register">회원가입</NavLink>
//         </>
//       )}
//     </Nav>
//   );

//   return (
//     <HeaderContainer scrolled={scrolled}>
//       <Inner>
//         <Logo to="/">게시판</Logo>
//         {desktopNav} {/** 이를 <Nav></Nav>로 처리하기. */}
//         <Nav>
//           <NavLink to={"/"} about='...'/>
//           <NavLink to={"/"} about='...'/>
//           <NavLink to={"/"} about='...'/>
//         </Nav>
//         <HamburgerWrapper>
//           <HamburgerMenu desktopNav={desktopNav} />
//         </HamburgerWrapper>
//       </Inner>
//     </HeaderContainer>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import HamburgerMenu from './HamburgerMenu';

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  width: 100vw;
  left: 0;
  right: 0;
  background-color: ${({ theme, scrolled }) =>
    scrolled ? theme.colors.white : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: ${({ scrolled }) =>
    scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ theme, scrolled }) =>
    scrolled ? theme.shadows.sm : 'none'};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  box-sizing: border-box;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.95rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-weight: 500;
  font-size: 0.95rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HamburgerWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <Inner>
        <Logo to="/">게시판</Logo>
        {/* 데스크탑 네비게이션 */}
        <Nav>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/boards/free/posts">자유게시판</NavLink>
          <NavLink to="/boards/devStorage/posts">개발 이야기</NavLink>
          {user ? (
            <>
              <NavLink to="/profile">{user.username}</NavLink>
              <Button onClick={handleLogout}>로그아웃</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">로그인</NavLink>
              <NavLink to="/register">회원가입</NavLink>
            </>
          )}
        </Nav>
        {/* 모바일 햄버거 메뉴 */}
        <HamburgerWrapper>
          <HamburgerMenu />
        </HamburgerWrapper>
      </Inner>
    </HeaderContainer>
  );
};

export default Header;
