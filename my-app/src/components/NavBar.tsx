import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.md};
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
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
  
  ${({ theme }) => theme.mediaQueries.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-weight: 500;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  
  ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: 0.9rem;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <HeaderContainer>
      <Logo to="/">게시판</Logo>
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
            <Button as={Link} to="/register">회원가입</Button>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
