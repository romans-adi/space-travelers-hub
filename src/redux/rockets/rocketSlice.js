import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketApi = 'https://api.spacexdata.com/v4/rockets';

export const fetchRockets = createAsyncThunk('rocket/fetchRockets', async () => {
  const response = await axios.get(rocketApi);
  return response.data.map((rocket) => ({
    id: rocket.id,
    name: rocket.name,
    description: rocket.description,
    flickr_images: rocket.flickr_images,
    wikipedia: rocket.wikipedia,
    reserved: false,
  }));
});

const rocketSlice = createSlice({
  name: 'rocket',
  initialState: {
    rockets: [],
    addedRockets: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAddedRockets: (state, action) => {
      state.addedRockets = action.payload;
    },
    joinRocket: (state, action) => {
      const rocketId = action.payload;
      const rocket = state.rockets.find((r) => r.id === rocketId);
      if (rocket) {
        rocket.reserved = true;
      }
    },
    leaveRocket: (state, action) => {
      const rocketId = action.payload;
      const rocket = state.rockets.find((r) => r.id === rocketId);
      if (rocket) {
        rocket.reserved = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.loading = false;
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAddedRockets, joinRocket, leaveRocket } = rocketSlice.actions;

export default rocketSlice.reducer;
