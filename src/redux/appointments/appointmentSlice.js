import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  appointments: [],
  isLoading: false,
  error: null,
};

const URL = process.env.REACT_APP_RAILS_BASE_URL + process.env.REACT_APP_RAILS_APPOINTMENT_ENDPOINT;

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

export const {
  setAppointments, setLoading, setError,
} = appointmentsSlice.actions;

export const createAppointment = (newAppointment) => async (dispatch) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem('token');

    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setAppointments(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem('token');
    const newURL = `${URL}/${id}`;
    await fetch(newURL, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchResponse = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await fetchResponse.json();
    dispatch(setAppointments(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default appointmentsSlice.reducer;
