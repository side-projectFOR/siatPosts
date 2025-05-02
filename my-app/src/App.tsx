// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import BoardListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostEditPage from './pages/PostEditPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostCreatePage from './pages/PostCreatePage';

const App: React.FC = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="/boards" element={<BoardListPage />} />
      <Route path="/boards/:slug/posts/:id" element={<PostDetailPage />} /> {/*/boards/:slug/posts/:id/detail로 변경할가 고민중*/}
      <Route path="/boards/:slug/posts/:id/edit" element={<PostEditPage />} />
      <Route path="/boards/:slug/posts/create" element={<PostCreatePage />} />
      {/* <Route path="/boards/:slug/posts/:id/edit" element={<PostEditPage />} /> */}
      {/* <Route path="/boards/:slug/posts/:id/delete" element={<PostDeletePage />} /> */}

      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
