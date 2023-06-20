/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  joinMission,
  leaveMission,
  setFetchedMissions,
  setMissions,
} from '../../redux/missions/missionsSlice';
import './Missions.scss';
import fetchMissions from '../../redux/missions/missionsAPI';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const error = useSelector((state) => state.missions.error);
  const fetchedMissions = useSelector((state) => state.missions.fetchedMissions);
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);

  const handleJoinMission = (missionId) => {
    dispatch(joinMission(missionId));
  };

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
  };

  useEffect(() => {
    const fetchMissionData = async () => {
      const missions = await fetchMissions();
      dispatch(setMissions(missions));
      dispatch(setFetchedMissions());
    };
    fetchMissionData();
  }, [dispatch]);

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
            <th className="status">Status</th>
            <th className="join-leave" />
          </tr>
        </thead>
        <tbody>
          {missions.map((mission, index) => (
            <tr key={mission.mission_id} style={{ backgroundColor: index % 2 === 0 ? '#eee' : '#fff' }}>
              <td className="mission-name">{mission.mission_name}</td>
              <td className="mission-description">{mission.description}</td>
              <td className="status-col">
                <span
                  className={`member-status-badge ${joinedMissions.includes(mission.mission_id) ? 'active-member' : 'not-member'}`}
                >
                  {joinedMissions.includes(mission.mission_id) ? 'Active Member' : 'Not a Member'}
                </span>
              </td>
              <td className="mission-status">
                {joinedMissions.includes(mission.mission_id) ? (
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
