import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentsSlice,
  },
});

export default store;
