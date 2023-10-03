import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser, loginUser, logoutUser, registerUser,
} from './authActions';

const initialState = {
  loading: false,
  needsConfirmation: false,
  userInfo: {},
  error: null,
  loggedIn: false,
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
      newState.loggedIn = true;
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
    // current user
    [getCurrentUser.pending]: (state) => {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.userInfo = payload;
      return newState;
    },
    [getCurrentUser.rejected]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    },
    // logout user
    [logoutUser.pending]: (state) => {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    },
    [logoutUser.fulfilled]: () => ({ ...initialState }),
    [logoutUser.rejected]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    },
  },
});

export default authSlice.reducer;
