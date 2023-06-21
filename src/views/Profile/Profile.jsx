import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MissionsButton from '../../components/Missions/MissionsButton';
import { leaveMission } from '../../redux/missions/missionsSlice';
import './Profile.scss';

const Profile = () => {
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);
  const allMissions = useSelector((state) => state.missions.missions);
  const addedRockets = useSelector((state) => state.rocket.addedRockets);
  const allRockets = useSelector((state) => state.rocket.rockets);
  const dispatch = useDispatch();

  const joinedMissionNames = allMissions
    .filter((mission) => joinedMissions.includes(mission.mission_id));

  const addedRocketsNames = allRockets
    .filter((rocket) => addedRockets.includes(rocket.id))
    .map((rocket) => rocket.name);

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
  };

  return (
    <div className="profile">
      <div className="joined-missions">
        <h2>My Missions</h2>
        {joinedMissionNames.length === 0 ? (
          <p>No missions joined yet.</p>
        ) : (
          <ul>
            {joinedMissionNames.map((mission) => (
              <li className="profile-missions-list" key={mission.mission_id}>
                {mission.mission_name}
                <MissionsButton
                  missionId={mission.mission_id}
                  joinedMissions={joinedMissions}
                  onLeaveMission={handleLeaveMission}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="booked-rockets">
        <h2>My Rockets</h2>
        {addedRocketsNames.length === 0 ? (
          <p>No rockets reserved yet.</p>
        ) : (
          <ul>
            {addedRocketsNames.map((rocketName) => (
              <li key={rocketName}>{rocketName}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
