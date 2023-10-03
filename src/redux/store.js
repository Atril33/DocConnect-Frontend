import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointmentSlice';
import doctorsSlice from './doctors/doctorSlice';
import authReducer from './auth/authSlice';
import specializationsReducer from './specializations/specializationSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentsSlice,
    doctors: doctorsSlice,
    auth: authReducer,
    specializations: specializationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const selectAuth = (store) => store.auth;
const selectSpecializations = (store) => store.specializations;

export {
  selectAuth,
  selectSpecializations,
};

export default store;
