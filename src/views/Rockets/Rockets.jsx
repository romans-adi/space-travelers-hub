import React, { useEffect } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAddedRockets,
  addRocket,
  fetchRockets,
  removeRocket,
} from '../../redux/rockects/rocketSlice';
import './Rockets.scss';

const Rockets = () => {
  const rocketList = useSelector((state) => state.rocket);
  const addedRockets = useSelector((state) => state.rocket.addedRockets);
  const dispatch = useDispatch();
  const handleSubmit = (rocketId) => {
    dispatch(addRocket(rocketId));
  };
  const handleRemove = (rocketId) => {
    dispatch(removeRocket(rocketId));
  };
  useEffect(() => {
    if (!addedRockets.length) {
      dispatch(fetchRockets());
      dispatch(setAddedRockets(rocketList.rockets));
    }
  }, [addedRockets.length, dispatch, rocketList.rockets]);
  return (
    <div className="rocket-div">
      {rocketList.loading && (
      <div className="loading-wrapper">
        <Vortex
          visible
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['blue', 'purple']}
        />
      </div>
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
                {addedRockets.includes(rocket.id) ? (
                  <button
                    className="cancel-btn"
                    type="button"
                    onClick={() => handleRemove(rocket.id)}
                  >
                    Cancel Reservation
                  </button>
                ) : (
                  <button
                    className="reserve-btn"
                    type="button"
                    onClick={() => handleSubmit(rocket.id)}
                  >
                    Reserve Rocket
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Rockets;
