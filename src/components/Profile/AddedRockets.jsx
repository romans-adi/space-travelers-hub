import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeRocket } from '../../redux/rockects/rocketSlice';
import RocketButtons from '../Rockets/RocketsButton';

const AddedRockets = () => {
  const addedRockets = useSelector((state) => state.rocket.addedRockets);
  const allRockets = useSelector((state) => state.rocket.rockets);
  const dispatch = useDispatch();
  const addedRocketsNames = allRockets
    .filter((rocket) => addedRockets.includes(rocket.id));
  const handleRevome = (rocketId) => {
    dispatch(removeRocket(rocketId));
  };

  const openWikipediaPage = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="booked-rockets">
      <h2>My Rockets</h2>
      {addedRocketsNames.length === 0 ? (
        <p>No rockets reserved yet.</p>
      ) : (
        <ul>
          {addedRocketsNames.map((rocket) => (
            <li className="added-rockets" key={rocket.id}>
              <div className="rocket-name">{rocket.name}</div>
              <div className="buttons">
                <RocketButtons
                  rocketId={rocket.id}
                  addedRockets={addedRockets}
                  onClick={handleRevome}
                />
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
