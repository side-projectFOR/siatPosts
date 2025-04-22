// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';  
import authReducer from '../features/auth/authSlice';  
import { api } from '../api/apiSlice';  

export const store = configureStore({  
  reducer: {  
    auth: authReducer,  
    [api.reducerPath]: api.reducer  
  },  
  middleware: (getDefaultMiddleware) =>  
    getDefaultMiddleware().concat(api.middleware)  
});  
