import { createSlice } from '@reduxjs/toolkit';
import { useQuery } from 'react-query';

// Define the initial state for the appointments slice
const initialState = {
  appointments: [],
  isLoading: false,
  error: null,
};

// Create a Redux slice
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

// Export actions
export const { setAppointments, setLoading, setError } = appointmentsSlice.actions;

// Define a function to fetch appointments using react-query
export function useAppointments() {
  return useQuery('appointments', async () => {
    const response = await fetch('http://localhost:3000/api/v1/appointments'); // Adjust the endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    return response.json();
  });
}

export default appointmentsSlice.reducer;
