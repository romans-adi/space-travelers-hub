import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRockets } from '../../redux/rockects/rocketSlice';
import './Rockets.scss';

const Rockets = () => {
  const rocketList = useSelector((state) => state.rocket);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);
  return (
    <div className="rocket-div">
      {rocketList.loading && <div> ... Loading</div>}
      {!rocketList.loading && rocketList.error ? (
        <div>
          Error:
          {rocketList.error}
        </div>
      ) : null}
      {!rocketList.loading && rocketList.rockets.length ? (
        <ul className="rocket-list">
          {
            rocketList.rockets.map((rock) => (
              <li className="rocket" key={rock.id}>
                <img src={rock.flickr_images[0]} alt="rocket" width="200px" />
                <div className="info">
                  <p>{rock.name}</p>
                  <p>{rock.description}</p>
                  <button className="reserve-btn" type="button">Reserve Rocket</button>
                </div>
              </li>
            ))
          }
        </ul>
      ) : null}
    </div>
  );
};

export default Rockets;
