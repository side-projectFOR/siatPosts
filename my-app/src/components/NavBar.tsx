// src/components/NavBar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const NavGroup = styled.div`
  & > * {
    margin-left: 12px;
    color: white;
    text-decoration: none;
  }
`;

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s: RootState) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Nav>
      <Link to="/boards">게시판</Link>
      <NavGroup>
        {user ? (
          <>
            <span>{user.username} 님</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        )}
      </NavGroup>
    </Nav>
  );
};

export default NavBar;
