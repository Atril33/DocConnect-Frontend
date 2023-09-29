import { createSlice } from '@reduxjs/toolkit';
import getSpecializations from './specializationAction';

const initialState = {
  loading: false,
  specializations: [],
  error: null,
};

const specializationSlice = createSlice({
  name: 'specializations',
  initialState,
  reducers: {},
  extraReducers: {
    // get specialization
    [getSpecializations.pending]: (state) => {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    },
    [getSpecializations.fulfilled]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.specializations = payload;
      return newState;
    },
    [getSpecializations.rejected]: (state, { payload }) => {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    },
  },
});

export default specializationSlice.reducer;
