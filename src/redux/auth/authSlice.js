import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';

const initialState = {
  loading: false,
  needsConfirmation: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [loginUser.pending]: (state) => {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.success = true;
      newState.userInfo = payload.data;
      return newState;
    },
    [loginUser.rejected]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    },
    // register user
    [registerUser.pending]: (state) => {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.userInfo = payload.data;
      newState.needsConfirmation = true;
      return newState;
    },
    [registerUser.rejected]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    },
  },
});

export default authSlice.reducer;
