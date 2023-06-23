import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { joinRocket, leaveRocket } from '../../redux/rockets/rocketSlice';

const RocketButtons = ({ rocketId }) => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rocket.rockets);

  const handleJoinRocket = () => {
    dispatch(joinRocket(rocketId));
  };

  const handleLeaveRocket = () => {
    dispatch(leaveRocket(rocketId));
  };

  const rocket = rockets.find((rocket) => rocket.id === rocketId);
  const isReserved = rocket && rocket.reserved;

  if (isReserved) {
    return (
      <button className="cancel-btn" type="button" onClick={handleLeaveRocket}>
        Cancel
      </button>
    );
  }

  return (
    <button className="reserve-btn" type="button" onClick={handleJoinRocket}>
      Reserve
    </button>
  );
};

RocketButtons.propTypes = {
  rocketId: PropTypes.string.isRequired,
};

export default RocketButtons;
