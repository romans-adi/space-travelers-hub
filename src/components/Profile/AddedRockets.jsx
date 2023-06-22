import React from 'react';
import { useSelector } from 'react-redux';
import RocketButtons from '../Rockets/RocketsButton';

const AddedRockets = () => {
  // eslint-disable-next-line max-len
  const addedRockets = useSelector((state) => state.rocket.rockets.filter((rocket) => rocket.reserved));

  const openWikipediaPage = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="booked-rockets">
      <h2>My Rockets</h2>
      {addedRockets.length === 0 ? (
        <p>No rockets reserved yet.</p>
      ) : (
        <ul>
          {addedRockets.map((rocket) => (
            <li className="added-rockets" key={rocket.id}>
              <div className="rocket-name">{rocket.name}</div>
              <div className="buttons">
                <RocketButtons rocketId={rocket.id} addedRockets={addedRockets} />
                <button
                  type="button"
                  className="read-more-button"
                  onClick={() => openWikipediaPage(rocket.wikipedia)}
                >
                  Read more
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddedRockets;
