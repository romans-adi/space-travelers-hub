import {
  addRocket, removeRocket, ADD_ROCKET, REMOVE_ROCKET,
} from '../redux/rockects/rocketActions';

describe('rocketSlice actions', () => {
  describe('addRocket', () => {
    it('creates an action to add a rocket', () => {
      const rocketId = 'rocket-123';
      const expectedAction = {
        type: ADD_ROCKET,
        payload: rocketId,
      };
      const action = addRocket(rocketId);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('removeRocket', () => {
    it('creates an action to remove a Rocket', () => {
      const rocketId = 'rocket-123';
      const expectedAction = {
        type: REMOVE_ROCKET,
        payload: rocketId,
      };
      const action = removeRocket(rocketId);
      expect(action).toEqual(expectedAction);
    });
  });
});
