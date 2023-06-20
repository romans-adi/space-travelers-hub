import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchMissions from './missionsAPI';

const initialState = {
  missions: [],
  joinedMissions: [],
  isLoading: false,
  error: null,
  fetchedMissions: false,
};

const fetchMissionsData = createAsyncThunk('missions/fetchMissionsData', async () => {
  const missions = await fetchMissions();
  return missions;
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setJoinedMissions: (state, action) => {
      state.joinedMissions = action.payload;
    },
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
    setFetchedMissions: (state) => {
      state.fetchedMissions = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissionsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMissionsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload;
        state.fetchedMissions = true;
      })
      .addCase(fetchMissionsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setJoinedMissions, setMissions, setFetchedMissions } = missionsSlice.actions;

export const joinMission = (missionId) => (dispatch, getState) => {
  const { missions } = getState().missions;
  const updatedMissions = missions.map((mission) => {
    if (mission.mission_id === missionId) {
      return { ...mission, reserved: true };
    }
    return mission;
  });
  dispatch(setJoinedMissions([...getState().missions.joinedMissions, missionId]));
  dispatch(setMissions(updatedMissions));
};

export const leaveMission = (missionId) => (dispatch, getState) => {
  const { missions } = getState().missions;
  const updatedMissions = missions.map((mission) => {
    if (mission.mission_id === missionId) {
      return { ...mission, reserved: false };
    }
    return mission;
  });
  dispatch(setJoinedMissions(getState().missions.joinedMissions.filter((id) => id !== missionId)));
  dispatch(setMissions(updatedMissions));
};

export default missionsSlice.reducer;
