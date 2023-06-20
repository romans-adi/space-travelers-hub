const JOIN_MISSION = 'missions/joinMission';
const LEAVE_MISSION = 'missions/leaveMission';

const joinMission = (missionId) => ({
  type: JOIN_MISSION,
  payload: missionId,
});

const leaveMission = (missionId) => ({
  type: LEAVE_MISSION,
  payload: missionId,
});

export {
  joinMission, leaveMission, JOIN_MISSION, LEAVE_MISSION,
};
