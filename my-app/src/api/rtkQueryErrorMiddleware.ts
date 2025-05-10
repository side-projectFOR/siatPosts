import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// RTK Query 에러 처리 미들웨어
export const rtkQueryErrorMiddleware: Middleware =
  () => (next) => (action: any) => {
    // RTK Query 요청 실패 시 토스트 표시
    if (isRejectedWithValue(action)) {
      // 액션 페이로드에서 에러 메시지 추출
      let errorMessage = '요청 처리 중 오류가 발생했습니다';
      
      // API 응답 에러 메시지 처리
      if (action.payload?.data?.message) {
        errorMessage = action.payload.data.message;
      } else if (action.error?.message) {
        errorMessage = action.error.message;
      }
      
      // 네트워크 오류와 서버 오류 구분
      if (action.payload?.status === 'FETCH_ERROR') {
        errorMessage = '서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요.';
      } else if (action.payload?.status >= 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    
    // 특정 성공 액션에 대한 토스트 표시
    if (action.type?.endsWith('/executeQuery/fulfilled')) {
      if (action.meta?.arg?.endpointName === 'deletePost' && !action.payload?.error) {
        toast.success('게시글이 삭제되었습니다', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
      
      if (action.meta?.arg?.endpointName === 'addComment' && !action.payload?.error) {
        toast.success('댓글이 등록되었습니다', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    }
    
    return next(action);
  };
