import React from 'react';
import { useSelector } from 'react-redux';
import MissionsButton from '../Missions/MissionsButton';

const JoinedMissions = () => {
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);
  const allMissions = useSelector((state) => state.missions.missions);

  // eslint-disable-next-line max-len
  const joinedMissionNames = allMissions.filter((mission) => joinedMissions.includes(mission.mission_id));

  const openWikipediaPage = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="joined-missions">
      <h2>My Missions</h2>
      {joinedMissionNames.length === 0 ? (
        <p>No missions joined yet.</p>
      ) : (
        <ul>
          {joinedMissionNames.map((mission) => (
            <li className="profile-missions-list" key={mission.mission_id}>
              <div className="mission-name">{mission.mission_name}</div>
              <MissionsButton
                missionId={mission.mission_id}
                joinedMissions={joinedMissions}
              />
              <button
                type="button"
                data-testid={`missions-button-${mission.mission_id}`}
                className="read-more-button"
                onClick={() => openWikipediaPage(mission.wikipedia)}
              >
                Read more
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JoinedMissions;
