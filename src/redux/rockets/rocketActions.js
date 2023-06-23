const ADD_ROCKET = 'rocket/addRocket';
const REMOVE_ROCKET = 'rockets/removeRocket';

const addRocket = (rocketId) => ({
  type: ADD_ROCKET,
  payload: rocketId,
});

const removeRocket = (rocketId) => ({
  type: REMOVE_ROCKET,
  payload: rocketId,
});

export {
  ADD_ROCKET, REMOVE_ROCKET, addRocket, removeRocket,
};
