import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const getSpecializations = createAsyncThunk(
  'api/specializations',
  async (args, { rejectWithValue }) => {
    try {
      const resp = await axios.get('/api/v1/specializations');
      resp.data.unshift({ id: 0, name: 'None' });
      return resp.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);

export default getSpecializations;
