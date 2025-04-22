// src/App.tsx
import React from 'react';  
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';  
import NavBar from './components/NavBar';  
import BoardListPage from './pages/BoardListPage';  // ./pages/BoardListPage
import PostDetailPage from './pages/PostDetailPage';  
import PostEditPage from './pages/PostEditPage';  
import LoginPage from './pages/LoginPage';  
import RegisterPage from './pages/RegisterPage';  

const App: React.FC = () => (  
  <BrowserRouter>  
    <NavBar />  
    <Routes>  
      <Route path="/" element={<Navigate to="/boards" replace />} />  
      <Route path="/boards" element={<BoardListPage />} />  
      <Route path="/boards/:slug/posts/:id" element={<PostDetailPage />} />  
      <Route path="/boards/:slug/posts/:id/edit" element={<PostEditPage />} />  
      <Route path="/login" element={<LoginPage />} />  
      <Route path="/register" element={<RegisterPage />} />  
    </Routes>  
  </BrowserRouter>  
);  

export default App;  
