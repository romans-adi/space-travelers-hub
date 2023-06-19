import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './redux/rockects/rockectSlice';
import missionReducer from './redux/missions/missionSlice';

const store = configureStore({
  reducer: {
    rockets: rocketReducer,
    missions: missionReducer,
  },
});

export default store;