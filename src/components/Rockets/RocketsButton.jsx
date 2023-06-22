import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addRocket, removeRocket } from '../../redux/rockects/rocketSlice';

const RocketButtons = ({ rocketId, addedRockets }) => {
  const dispatch = useDispatch();

  const handleAddRocket = () => {
    dispatch(addRocket(rocketId));
  };

  const handleRemoveRocket = () => {
    dispatch(removeRocket(rocketId));
  };

  if (addedRockets.includes(rocketId)) {
    return (
      <button
        className="cancel-btn"
        type="button"
        onClick={handleRemoveRocket}
      >
        Cancel Reservation
      </button>
    );
  }
  return (
    <button
      className="reserve-btn"
      type="button"
      onClick={handleAddRocket}
    >
      Reserve Rocket
    </button>
  );
};

RocketButtons.propTypes = {
  rocketId: PropTypes.string.isRequired,
  addedRockets: PropTypes.string.isRequired,
};

export default RocketButtons;
