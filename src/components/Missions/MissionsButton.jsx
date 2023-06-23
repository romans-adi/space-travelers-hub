import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { joinMission, leaveMission } from '../../redux/missions/missionsActions';

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
        className="mission-button leave-mission"
        onClick={handleLeaveMission}
        type="button"
      >
        Leave Mission
      </button>
    );
  }

  return (
    <button
      className="mission-button join-mission"
      onClick={handleJoinMission}
      type="button"
    >
      Join Mission
    </button>
  );
};

MissionsButton.propTypes = {
  missionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // eslint-disable-next-line max-len
  joinedMissions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
};

export default MissionsButton;
