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
  extraReducers: (builder) => {
    builder
      .addCase(getSpecializations.pending, (state) => {
        const newState = { ...state };
        newState.loading = true;
        newState.error = null;
        return newState;
      })
      .addCase(getSpecializations.fulfilled, (state, action) => {
        const newState = { ...state };
        newState.loading = false;
        newState.specializations = action.payload;
        return newState;
      })
      .addCase(getSpecializations.rejected, (state, action) => {
        const newState = { ...state };
        newState.loading = false;
        newState.error = action.payload;
        return newState;
      });
  },
});

export default specializationSlice.reducer;
