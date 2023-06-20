import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketApi = 'https://api.spacexdata.com/v4/rockets';

const initialState = {
  rockets: [],
  addedRockets: [],
  loading: false,
  error: 'Cant Load Rockets',
};
export const fetchRockets = createAsyncThunk('rocket/fetchRockets', async () => {
  const response = await axios.get(rocketApi);
  const rocketArr = [];
  const datax = response.data;
  for (let i = 0; i < datax.length; i += 1) {
    rocketArr.push({
      reserved: false,
      name: datax[i].name,
      description: datax[i].description,
      flickr_images: datax[i].flickr_images,
      id: datax[i].id,
    });
  }
  return rocketArr;
});
export const rocketSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    setAddedRockets: (state, action) => {
      state.addedRockets = action.payload;
    },
    joinRocket: (state, action) => {
      const rockId = action.payload;
      if (!state.addedRockets.includes(rockId)) {
        state.addedRockets.push(rockId);
      }
    },
    leaveRocket: (state, action) => {
      const rockId = action.payload;
      state.addedRockets = state.addedRockets.filter((id) => id !== rockId);
    },
  },
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

export const { setAddedRockets, joinRocket, leaveRocket } = rocketSlice.actions;
export const addRocket = (rockId) => (dispatch, getState) => {
  const { rockets, addedRockets } = getState().rocket;
  const rocket = rockets.find((r) => r.id === rockId);
  if (rocket && !addedRockets.includes(rockId)) {
    dispatch(joinRocket(rockId));
  }
};
export const removeRocket = (rockId) => (dispatch) => {
  dispatch(leaveRocket(rockId));
};
export default rocketSlice.reducer;
