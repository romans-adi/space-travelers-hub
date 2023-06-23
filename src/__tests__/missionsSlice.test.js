import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import missionsReducer, {
  fetchMissionsData,
  setJoinedMissions,
  joinMission,
  leaveMission,
} from '../redux/missions/missionsSlice';
import fetchMissions from '../redux/missions/missionsAPI';

jest.mock('../redux/missions/missionsAPI');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('missionsSlice', () => {
  describe('fetchMissionsData', () => {
    it('should fetch missions data and fulfill the promise', async () => {
      const mockMissions = [{ id: 1, name: 'Mission 1' }];
      fetchMissions.mockResolvedValue(mockMissions);

      const store = mockStore();

      await store.dispatch(fetchMissionsData());

      const actions = store.getActions();

      expect(actions[0].type).toEqual(fetchMissionsData.pending.type);
      expect(actions[1].type).toEqual(fetchMissionsData.fulfilled.type);
      expect(actions[1].payload).toEqual(mockMissions);
    });

    it('should handle fetch missions data error and reject the promise', async () => {
      fetchMissions.mockRejectedValue({ error: 'Fetch missions error' });

      const store = mockStore();
      await store.dispatch(fetchMissionsData());

      const actions = store.getActions();
      expect(actions[0].type).toEqual(fetchMissionsData.pending.type);
      expect(actions[1].type).toEqual(fetchMissionsData.rejected.type);
    });

    it('should handle setJoinedMissions', () => {
      const initialState = {
        missions: [],
        joinedMissions: [],
        isLoading: false,
        error: null,
        fetchedMissions: false,
      };
      const joinedMissions = [1, 2, 3];
      const action = setJoinedMissions(joinedMissions);
      const state = missionsReducer(initialState, action);

      expect(state.joinedMissions).toEqual(joinedMissions);
    });

    it('should handle joinMission', () => {
      const initialState = {
        missions: [{ id: 1, reserved: false }, { id: 2, reserved: false }],
        joinedMissions: [],
        isLoading: false,
        error: null,
        fetchedMissions: false,
      };
      const missionId = 2;
      const action = joinMission(missionId);
      const state = missionsReducer(initialState, action);

      expect(state.missions[1].reserved).toBe(true);
      expect(state.joinedMissions).toContain(missionId);
    });

    it('should handle leaveMission', () => {
      const initialState = {
        missions: [{ id: 1, reserved: true }, { id: 2, reserved: true }],
        joinedMissions: [1, 2],
        isLoading: false,
        error: null,
        fetchedMissions: false,
      };
      const missionId = 1;
      const action = leaveMission(missionId);
      const state = missionsReducer(initialState, action);

      expect(state.missions[0].reserved).toBe(false);
      expect(state.joinedMissions).not.toContain(missionId);
    });
  });
});
