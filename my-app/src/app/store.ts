import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../api/apiSlice';
import authReducer from '../features/auth/authSlice';
import { rtkQueryErrorMiddleware } from '../api/rtkQueryErrorMiddleware';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(rtkQueryErrorMiddleware),
});

// RTK Query의 refetchOnFocus/refetchOnReconnect 기능 활성화
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
