import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  isLoading: false,
  error: null,
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAppointments, setLoading, setError } = appointmentsSlice.actions;

export const fetchAppointments = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('http://localhost:3000/api/v1/appointments');
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    const data = await response.json();
    dispatch(setAppointments(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default appointmentsSlice.reducer;
