import React from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import './Rockets.scss';
import RocketButtons from './RocketsButton';

const RocketTable = () => {
  const rocketList = useSelector((state) => state.rocket);
  const addedRockets = useSelector((state) => state.rocket.addedRockets);

  return (
    <div className="rocket-div">
      {rocketList.loading && (
      <LoadingSpinner />
      )}
      {!rocketList.loading && rocketList.error ? (
        <div>
          Error:
          {rocketList.error}
        </div>
      ) : null}
      {!rocketList.loading && rocketList.rockets.length ? (
        <ul className="rocket-list">
          {rocketList.rockets.map((rocket) => (
            <li className="rocket" key={rocket.id}>
              <img src={rocket.flickr_images[0]} alt="rocket" width="200px" />
              <div className="info">
                <p>{rocket.name}</p>
                {addedRockets.includes(rocket.id) ? (
                  <p>
                    <span>Reserved </span>
                    {rocket.description}
                  </p>
                ) : <p>{rocket.description}</p>}
                <RocketButtons
                  rocketId={rocket.id}
                  addedRockets={addedRockets}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default RocketTable;
