import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/theme';
import Header from './components/NavBar'; // NavBar 컴포넌트 - 헤더 역할
// Header 컴포넌트는 styled-components로 스타일링된 헤더를 포함하고 있습니다.

import LoadingSpinner from './components/common/LoadingSpinner';

// 지연 로딩으로 성능 최적화
const Home = lazy(() => import('./pages/Home'));
const PostListPage = lazy(() => import('./pages/PostListPage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const PostEditPage = lazy(() => import('./pages/PostEditPage'));
const PostCreatePage = lazy(() => import('./pages/PostCreatePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppContainer>
          <Header />
          <MainContent>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* 메인 페이지 (게시판 선택) */}
                <Route path="/" element={<Home />} />
                <Route path="/boards" element={<Home />} />
                
                {/* 게시글 목록 */}
                <Route path="/boards/:slug/posts" element={<PostListPage />} />
                
                {/* 게시글 상세/수정/생성 */}
                <Route path="/boards/:slug/posts/:id" element={<PostDetailPage />} />
                <Route path="/boards/:slug/posts/:id/edit" element={<PostEditPage />} />
                <Route path="/boards/:slug/posts/create" element={<PostCreatePage />} />
                
                {/* 인증 페이지 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* 기본 리디렉션 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </MainContent>
        </AppContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
