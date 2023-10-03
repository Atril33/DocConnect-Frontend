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
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecializations.fulfilled, (state, action) => {
        state.loading = false;
        state.specializations = action.payload;
      })
      .addCase(getSpecializations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default specializationSlice.reducer;
