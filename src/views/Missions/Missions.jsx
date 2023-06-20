/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import useSWR from 'swr';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setMissions, joinMission, leaveMission } from '../../redux/missions/missionsSlice';
import fetchMissions from '../../redux/missions/missionsAPI';
import './Missions.scss';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);

  const handleJoinMission = (missionId) => {
    dispatch(joinMission(missionId));
  };

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
  };

  const { data: fetchedMissions, error } = useSWR('missions', fetchMissions);

  useEffect(() => {
    if (fetchedMissions) {
      dispatch(setMissions(fetchedMissions));
    }
  }, [dispatch, fetchedMissions]);

  if (error) {
    return <div>Error fetching missions data.</div>;
  }

  if (!fetchedMissions) {
    return (
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
    );
  }

  return (
    <div className="missions">
      <table>
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {missions.map((mission, index) => (
            <tr key={mission.mission_id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#eee' }}>
              <td className="mission-name">{mission.mission_name}</td>
              <td className="mission-description">{mission.description}</td>
              <td className="status-col">
                <span
                  className={`member-status-badge ${mission.reserved ? 'active-member' : 'not-member'}`}
                >
                  {mission.reserved ? 'Active Member' : 'Not a Member'}
                </span>
              </td>
              <td className="mission-status">
                {mission.reserved ? (
                  <button
                    className="leave-mission"
                    onClick={() => handleLeaveMission(mission.mission_id)}
                    type="button"
                  >
                    Leave Mission
                  </button>
                ) : (
                  <button
                    className="join-mission"
                    onClick={() => handleJoinMission(mission.mission_id)}
                    type="button"
                  >
                    Join Mission
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Missions;
