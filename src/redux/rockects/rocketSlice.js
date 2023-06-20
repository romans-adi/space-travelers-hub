import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketApi = 'https://api.spacexdata.com/v4/rockets';

const initialState = {
  rockets: [],
  loading: false,
  error: 'Cant Load Rockets',
};
export const fetchRockets = createAsyncThunk('rocket/fetchRockets', async () => {
  const response = await axios.get(rocketApi);
  return response.data;
});
export const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchRockets.pending, (state) => {
      state.loading = true;
    });
    build.addCase(fetchRockets.fulfilled, (state, action) => {
      state.loading = false;
      state.rockets = action.payload;
      state.error = '';
    });
    build.addCase(fetchRockets.rejected, (state, action) => {
      state.loading = false;
      state.rockets = [];
      state.error = action.error.message;
    });
  },
});

export default rocketSlice.reducer;
