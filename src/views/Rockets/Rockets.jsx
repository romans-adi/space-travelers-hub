import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAddedRockets,
  fetchRockets,
} from '../../redux/rockets/rocketSlice';
import RocketTable from '../../components/Rockets/RocketsTable';

const Rockets = () => {
  const rocketList = useSelector((state) => state.rocket);
  const addedRockets = useSelector((state) => state.rocket.addedRockets);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!addedRockets.length) {
      dispatch(fetchRockets());
      dispatch(setAddedRockets(rocketList.rockets));
    }
  }, [addedRockets.length, dispatch, rocketList.rockets]);
  return (
    <RocketTable />
  );
};
export default Rockets;
