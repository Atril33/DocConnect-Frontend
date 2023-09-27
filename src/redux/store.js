import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const selectAuth = (store) => store.auth;

export {
  selectAuth,
};

export default store;
