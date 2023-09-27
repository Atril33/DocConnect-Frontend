import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import doctorReducer from './doctors/doctorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
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
