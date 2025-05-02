// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';

const BoardListPage = React.lazy(() => import('./pages/PostListPage'));
const PostDetailPage = React.lazy(() => import('./pages/PostDetailPage'));
const PostEditPage = React.lazy(() => import('./pages/PostEditPage'));
const PostCreatePage = React.lazy(() => import('./pages/PostCreatePage'));

const App: React.FC = () => (
  <BrowserRouter>
    <NavBar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<BoardListPage />} />
        <Route path="/boards/:slug/posts/:id" element={<PostDetailPage />} />
        <Route path="/boards/:slug/posts/:id/edit" element={<PostEditPage />} />
        <Route path="/boards/:slug/posts/create" element={<PostCreatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
