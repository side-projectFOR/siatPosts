// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';  
import type { LoginResponse } from '../../types';  

/** 인증 상태의 타입 정의 */  
interface AuthState {  
  user: LoginResponse['user'] | null;  
  token: string | null;  
}  

/** 초기 상태 설정 */  
const initialState: AuthState = {  
  user: null,  
  token: null  
};  

/** Slice 생성 */  
const authSlice = createSlice({  
  name: 'auth',  
  initialState,  
  reducers: {  
    /** 로그인 성공 시 사용자 정보와 토큰 저장 */  
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {  
      state.user = action.payload.user;  
      state.token = action.payload.token;  
      localStorage.setItem('token', action.payload.token);  
    },  
    /** 로그아웃 시 상태 초기화 */  
    logout: (state) => {  
      state.user = null;  
      state.token = null;  
      localStorage.removeItem('token');  
    }  
  }  
});  

export const { setCredentials, logout } = authSlice.actions;  
export default authSlice.reducer;  
