import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './redux/rockects/rocketSlice';
import missionReducer from './redux/missions/missionsSlice';

const store = configureStore({
  reducer: {
    rockets: rocketReducer,
    missions: missionReducer,
  },
});

export default store;
