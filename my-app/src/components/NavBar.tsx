// src/components/NavBar.tsx
import React from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';  
import { useSelector, useDispatch } from 'react-redux';  
import type { RootState } from '../app/store';  
import { logout } from '../features/auth/authSlice';  

/** 스타일드 컴포넌트 */  
const Nav = styled.nav`  
  display: flex;  
  justify-content: space-between;  
  padding: 16px;  
  background-color: ${({ theme }) => theme.colors.primary};  
  color: #fff;  
`;  

const NavGroup = styled.div`  
  display: flex;  
  gap: 12px;  
`;  

/** NavBar 컴포넌트 */  
const NavBar: React.FC = () => {  
  const navigate = useNavigate();  
  const dispatch = useDispatch();  
  const { user } = useSelector((state: RootState) => state.auth);  

  const handleLogout = () => {  
    dispatch(logout());  
    navigate('/login');  
  };  

  return (  
    <Nav>  
      <Link to="/boards" style={{ color: 'inherit', textDecoration: 'none' }}>  
        게시판  
      </Link>  
      <NavGroup>  
        {user ? (  
          <>  
            <span>{user.username} 님</span>  
            <button onClick={handleLogout}>로그아웃</button>  
          </>  
        ) : (  
          <>  
            <Link to="/login" style={{ color: 'inherit' }}>로그인</Link>  
            <Link to="/register" style={{ color: 'inherit' }}>회원가입</Link>  
          </>  
        )}  
      </NavGroup>  
    </Nav>  
  );  
};  

export default NavBar;  
