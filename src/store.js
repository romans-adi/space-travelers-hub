import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import rocketReducer from './redux/rockects/rocketSlice';
import missionReducer from './redux/missions/missionsSlice';

const loggerMiddleware = createLogger();

const store = configureStore({
  reducer: {
    rocket: rocketReducer,
    missions: missionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
