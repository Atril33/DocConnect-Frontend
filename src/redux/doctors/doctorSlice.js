import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
  isLoading: false,
  error: null,
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setdoctors: (state, action) => {
      state.doctors = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setdoctors, setLoading, setError } = doctorsSlice.actions;

export const fetchdoctors = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('http://localhost:3000/api/v1/doctors');
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data = await response.json();
    dispatch(setdoctors(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default doctorsSlice.reducer;
