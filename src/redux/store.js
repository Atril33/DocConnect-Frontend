import { configureStore } from '@reduxjs/toolkit';
import appointmentsSlice from './appointments/appointmentSlice';
import doctorSlice from './doctors/doctorSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentsSlice,
    doctors: doctorSlice,
  },
});

export default store;
