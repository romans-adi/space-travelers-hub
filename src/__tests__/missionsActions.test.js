import {
  joinMission, leaveMission, JOIN_MISSION, LEAVE_MISSION,
} from '../redux/missions/missionsActions';

describe('missionsSlice actions', () => {
  describe('joinMission', () => {
    it('creates an action to join a mission', () => {
      const missionId = 'mission-123';
      const expectedAction = {
        type: JOIN_MISSION,
        payload: missionId,
      };
      const action = joinMission(missionId);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('leaveMission', () => {
    it('creates an action to leave a mission', () => {
      const missionId = 'mission-123';
      const expectedAction = {
        type: LEAVE_MISSION,
        payload: missionId,
      };
      const action = leaveMission(missionId);
      expect(action).toEqual(expectedAction);
    });
  });
});
