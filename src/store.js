import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './redux/rockects/rocketSlice';
import missionReducer from './redux/missions/missionSlice';

const store = configureStore({
  reducer: {
    rocket: rocketReducer,
    missions: missionReducer,
  },
});

export default store;
