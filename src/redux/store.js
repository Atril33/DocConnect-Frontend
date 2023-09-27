import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    appointments: appointmentsSlice,
    doctors: doctorSlice,  
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
