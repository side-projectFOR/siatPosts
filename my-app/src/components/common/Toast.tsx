import React, { createContext, useContext, useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  pointer-events: none;
`;

const ToastItem = styled.div<{ type: ToastType; isLeaving: boolean }>`
  width: 90%;
  max-width: 500px;
  min-height: 50px;
  margin-top: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  pointer-events: all;
  animation: ${({ isLeaving }) =>
    isLeaving
      ? css`${slideOut} 0.3s forwards`
      : css`${slideIn} 0.3s forwards`};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return `background-color: ${theme.colors.success};`;
      case 'error':
        return `background-color: ${theme.colors.error};`;
      case 'info':
      default:
        return `background-color: ${theme.colors.primary};`;
    }
  }}
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(Toast & { isLeaving: boolean })[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, type, message, isLeaving: false }]);

    // 자동으로 3초 후 제거
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((t) => (t.id === id ? { ...t, isLeaving: true } : t))
      );
      
      // 애니메이션 후 실제 제거
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
      }, 300);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} type={toast.type} isLeaving={toast.isLeaving}>
            {toast.message}
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};
