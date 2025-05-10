import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/theme';
import Header from './components/NavBar';
import LoadingSpinner from './components/common/LoadingSpinner';
import ScrollToTop from './components/common/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

// 토스티파이 커스텀 스타일
const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'toast-body',
  progressClassName: 'toast-progress',
})`
  /* 토스트 컨테이너 스타일 */
  .Toastify__toast {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: 16px;
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  /* 성공 토스트 */
  .Toastify__toast--success {
    background-color: ${({ theme }) => theme.colors.success};
  }

  /* 에러 토스트 */
  .Toastify__toast--error {
    background-color: ${({ theme }) => theme.colors.danger};
  }

  /* 정보 토스트 */
  .Toastify__toast--info {
    background-color: ${({ theme }) => theme.colors.info};
  }

  /* 경고 토스트 */
  .Toastify__toast--warning {
    background-color: ${({ theme }) => theme.colors.warning};
  }

  /* 프로그레스 바 */
  .Toastify__progress-bar {
    height: 4px;
  }
  
  /* 닫기 버튼 */
  .Toastify__close-button {
    opacity: 0.7;
    transition: ${({ theme }) => theme.transition.normal};
    
    &:hover, &:focus {
      opacity: 1;
    }
  }
  
  /* 모바일 최적화 */
  @media (max-width: 480px) {
    .Toastify__toast-container {
      width: 100%;
      padding: 0;
      bottom: 0;
      left: 0;
      
      .Toastify__toast {
        margin-bottom: 0;
        border-radius: 0;
      }
    }
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppContainer>
          <Header />
          <MainContent>
            <Suspense fallback={<LoadingSpinner size="large" />}>
              <Routes>
                {/* 메인 페이지 (게시판 선택) */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                
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
          <ScrollToTop />
          <StyledToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AppContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
