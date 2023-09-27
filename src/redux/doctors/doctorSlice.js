import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios';

export const doctorsFetchData = createAsyncThunk('doctors', async () => {
    const response = await axios.get('api/v1/doctors');
    return response.data; 
});


const initialState = {
    allDoctors: [],
    loading: false,
    error: null,
};

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
     builder 
     .addCase(doctorsFetchData.pending, (state) => ({
        ...state,
        loading: true,
     }))
     .addCase(doctorsFetchData.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        allDoctors: action.payload
     }))
     .addCase(doctorsFetchData.rejected, (state) => ({
        ...state,
        loading: false,
     }))
    },
});

export default doctorSlice.reducer;