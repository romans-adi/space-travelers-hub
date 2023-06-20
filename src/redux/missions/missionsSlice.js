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
    updateMissionReservation: (state, action) => {
      const { missionId, reserved } = action.payload;
      const missionIndex = state.missions.findIndex(
        (mission) => mission.mission_id === missionId,
      );
      if (missionIndex !== -1) {
        state.missions[missionIndex].reserved = reserved;
      }
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

export const {
  setJoinedMissions,
  setMissions,
  setFetchedMissions,
  updateMissionReservation,
} = missionsSlice.actions;

export const joinMission = (missionId) => (dispatch, getState) => {
  const { missions, joinedMissions } = getState().missions;
  const mission = missions.find((m) => m.mission_id === missionId);

  if (mission && !joinedMissions.includes(missionId)) {
    dispatch(updateMissionReservation({ missionId, reserved: true }));
    dispatch(setJoinedMissions([...joinedMissions, missionId]));
  }
};

export const leaveMission = (missionId) => (dispatch, getState) => {
  dispatch(updateMissionReservation({ missionId, reserved: false }));
  dispatch(
    setJoinedMissions(getState().missions.joinedMissions.filter((id) => id !== missionId)),
  );
};

export default missionsSlice.reducer;
