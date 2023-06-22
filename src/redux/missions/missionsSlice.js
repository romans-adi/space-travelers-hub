import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchMissions from './missionsAPI';

export const fetchMissionsData = createAsyncThunk('missions/fetchMissionsData', async () => {
  const missions = await fetchMissions();
  return missions;
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState: {
    missions: [],
    joinedMissions: [],
    isLoading: false,
    error: null,
    fetchedMissions: false,
  },
  reducers: {
    setJoinedMissions: (state, action) => {
      state.joinedMissions = action.payload;
    },
    joinMission: (state, action) => {
      const missionId = action.payload;
      // eslint-disable-next-line max-len
      state.missions = state.missions.map((mission) => (mission.id !== missionId ? mission : { ...mission, reserved: true }));
      state.joinedMissions = [...state.joinedMissions, missionId];
    },
    leaveMission: (state, action) => {
      const missionId = action.payload;
      // eslint-disable-next-line max-len
      state.missions = state.missions.map((mission) => (mission.id !== missionId ? mission : { ...mission, reserved: false }));
      state.joinedMissions = state.joinedMissions.filter((id) => id !== missionId);
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

export const { setJoinedMissions, updateMissionReservation } = missionsSlice.actions;

export default missionsSlice.reducer;
