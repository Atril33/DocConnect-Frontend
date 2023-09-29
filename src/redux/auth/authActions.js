import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const extractToken = (authHeader) => {
  const headers = authHeader.split(' ');
  return headers[1];
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        process.env.REACT_APP_RAILS_LOGIN,
        { user: { email, password } },
      );
      localStorage.setItem('token', extractToken(resp.headers.get('Authorization')));
      localStorage.setItem('token_time', String(Date.now()));
      return resp.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({
    name, email, password, passwordConfirmation,
  }, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        process.env.REACT_APP_RAILS_SIGNUP,
        {
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        },
      );
      return resp.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/current_user',
  async (args, { rejectWithValue }) => {
    try {
      const resp = await axios.get(process.env.REACT_APP_RAILS_CURRENT_USER);
      return resp.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);
