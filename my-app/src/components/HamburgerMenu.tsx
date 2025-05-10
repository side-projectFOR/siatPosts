import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

// 햄버거 아이콘 버튼
const MenuButton = styled.button<{ isOpen: boolean }>`
  position: relative;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
      transform: ${({ isOpen }) => (isOpen ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

// 모바일 메뉴 패널
const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70%;
  max-width: 300px;
  padding-top: 5rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 150;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  padding: 1.5rem 2rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: background-color 0.2s;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s, visibility 0.3s;

  @media (min-width: 769px) {
    display: none;
  }
`;

interface HamburgerMenuProps {
  desktopNav: React.ReactNode;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ desktopNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 스크롤 방지 (메뉴 열린 상태에서)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* 데스크탑 네비게이션 */}
      {desktopNav}

      {/* 햄버거 버튼 */}
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </MenuButton>

      {/* 모바일 메뉴 */}
      <MobileMenuContainer ref={menuRef} isOpen={isOpen}>
        <MobileNavLink to="/" onClick={() => setIsOpen(false)}>홈</MobileNavLink>
        <MobileNavLink to="/boards/free/posts" onClick={() => setIsOpen(false)}>자유게시판</MobileNavLink>
        <MobileNavLink to="/boards/devStorage/posts" onClick={() => setIsOpen(false)}>개발 이야기</MobileNavLink>
        
        {user ? (
          <>
            <MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>
              {user.username}
            </MobileNavLink>
            <MobileNavLink to="/" onClick={handleLogout}>
              로그아웃
            </MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink to="/login" onClick={() => setIsOpen(false)}>
              로그인
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setIsOpen(false)}>
              회원가입
            </MobileNavLink>
          </>
        )}
      </MobileMenuContainer>

      {/* 배경 오버레이 */}
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default HamburgerMenu;
