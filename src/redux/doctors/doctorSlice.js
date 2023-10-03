import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const URL = process.env.REACT_APP_RAILS_BASE_URL + process.env.REACT_APP_RAILS_DOCTOR_ENDPOINT;

export const fetchdoctors = createAsyncThunk('doctors/fetch', async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const deleteDoctor = createAsyncThunk('doctors/delete', async (doctorId) => {
  const response = await axios.delete(`${URL}/${doctorId}`);
  return response.data;
});

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdoctors.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchdoctors.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        doctors: action.payload,
      }))
      .addCase(fetchdoctors.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(deleteDoctor.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        const updatedDoctors = state.doctors.filter((doctor) => doctor.id !== action.payload);
        return {
          ...state,
          loading: false,
          doctors: updatedDoctors,
        };
      })
      .addCase(deleteDoctor.rejected, (state) => ({
        ...state,
        loading: false,
      }));
  },
});

export default doctorSlice.reducer;
