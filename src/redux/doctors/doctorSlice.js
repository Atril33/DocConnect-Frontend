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
      // eslint-disable-next-line no-param-reassign
      state.doctors = action.payload;
    },

    setLoading: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { setdoctors, setLoading, setError } = doctorsSlice.actions;

export const fetchdoctors = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('https://docconnect-afnq.onrender.com/api/v1/doctors');
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
