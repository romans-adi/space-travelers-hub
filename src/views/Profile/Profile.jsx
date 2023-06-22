import React from 'react';
import { useSelector } from 'react-redux';
import JoinedMissions from '../../components/Profile/JoinedMissions';
import './Profile.scss';

const Profile = () => {
  const addedRockets = useSelector((state) => state.rocket.addedRockets);
  const allRockets = useSelector((state) => state.rocket.rockets);

  const addedRocketsNames = allRockets
    .filter((rocket) => addedRockets.includes(rocket.id))
    .map((rocket) => rocket.name);

  const openWikipediaPage = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="profile">
      <JoinedMissions />
      <div className="booked-rockets">
        <h2>My Rockets</h2>
        {addedRocketsNames.length === 0 ? (
          <p>No rockets reserved yet.</p>
        ) : (
          <ul>
            {addedRocketsNames.map((rocket) => (
              <li key={rocket.id}>
                <span>{addedRockets.name}</span>
                <button
                  type="button"
                  className="read-more-button"
                  onClick={() => openWikipediaPage(rocket.wikipedia)}
                >
                  Read more
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
