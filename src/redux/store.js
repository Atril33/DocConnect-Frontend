import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointmentSlice';
import doctorsSlice from './doctors/doctorSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentsSlice,
    doctors: doctorsSlice,
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
