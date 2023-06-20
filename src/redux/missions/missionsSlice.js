import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  missions: [],
  joinedMissions: [],
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
    setJoinedMissions: (state) => {
      const joinedMissionIds = state.missions
        .filter((mission) => mission.reserved)
        .map((mission) => mission.mission_id);
      state.joinedMissions = joinedMissionIds;
    },
    joinMission: (state, action) => {
      const missionId = action.payload;
      const mission = state.missions.find((mission) => mission.mission_id === missionId);
      if (mission) {
        mission.reserved = true;
        state.joinedMissions = [...state.joinedMissions, missionId];
      }
    },
    leaveMission: (state, action) => {
      const missionId = action.payload;
      const mission = state.missions.find((mission) => mission.mission_id === missionId);
      if (mission) {
        mission.reserved = false;
        state.joinedMissions = state.joinedMissions.filter((id) => id !== missionId);
      }
    },
  },
});

export const {
  setMissions, joinMission, leaveMission, setJoinedMissions,
} = missionsSlice.actions;
export default missionsSlice.reducer;
