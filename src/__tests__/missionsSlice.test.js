import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import missionsSlice, {
  joinMission,
  leaveMission,
  setJoinedMissions,
  updateMissionReservation,
} from '../redux/missions/missionsSlice';

jest.mock('../redux/missions/missionsAPI', () => jest.fn(() => Promise.resolve([])));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('missionsSlice', () => {
  describe('reducers', () => {
    it('should handle setJoinedMissions', () => {
      const initialState = { joinedMissions: [] };
      const action = setJoinedMissions([1, 2, 3]);
      const state = missionsSlice(initialState, action);
      expect(state.joinedMissions).toEqual([1, 2, 3]);
    });
  });

  describe('thunks', () => {
    it('should dispatch correct actions when joinMission is called', () => {
      const missions = [
        { mission_id: 1, reserved: false },
        { mission_id: 2, reserved: true },
        { mission_id: 3, reserved: false },
      ];
      const joinedMissions = [2];
      const missionId = 1;

      const expectedActions = [
        updateMissionReservation({ missionId, reserved: true }),
        setJoinedMissions([2, 1]),
      ];

      const store = mockStore({ missions: { missions, joinedMissions } });

      store.dispatch(joinMission(missionId));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch correct actions when leaveMission is called', () => {
      const missions = [
        { mission_id: 1, reserved: false },
        { mission_id: 2, reserved: true },
        { mission_id: 3, reserved: false },
      ];
      const joinedMissions = [1, 2, 3];
      const missionId = 2;

      const expectedActions = [
        updateMissionReservation({ missionId, reserved: false }),
        setJoinedMissions([1, 3]),
      ];

      const store = mockStore({ missions: { missions, joinedMissions } });

      store.dispatch(leaveMission(missionId));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
