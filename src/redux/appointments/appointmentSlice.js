import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

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
      // eslint-disable-next-line no-param-reassign
      state.appointments = action.payload;
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

export const { setAppointments, setLoading, setError } = appointmentsSlice.actions;

export const createAppointment = (newAppointment) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('http://localhost:3000/api/v1/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    });

    if (!response.ok) {
      throw new Error('Failed to create an appointment');
    }
    const data = await response.json();
    dispatch(setAppointments([...useSelector((state) => state.appointments), data]));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

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
