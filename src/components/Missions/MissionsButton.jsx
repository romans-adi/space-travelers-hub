import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { joinMission, leaveMission } from '../../redux/missions/missionsSlice';

const MissionsButton = ({ missionId, joinedMissions }) => {
  const dispatch = useDispatch();

  const handleJoinMission = () => {
    dispatch(joinMission(missionId));
  };

  const handleLeaveMission = () => {
    dispatch(leaveMission(missionId));
  };

  if (joinedMissions.includes(missionId)) {
    return (
      <button
        className="leave-mission"
        onClick={handleLeaveMission}
        type="button"
      >
        Leave Mission
      </button>
    );
  }
  return (
    <button
      className="join-mission"
      onClick={handleJoinMission}
      type="button"
    >
      Join Mission
    </button>
  );
};

MissionsButton.propTypes = {
  missionId: PropTypes.string.isRequired,
  joinedMissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MissionsButton;
