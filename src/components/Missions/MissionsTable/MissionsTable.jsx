/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch, useSelector } from 'react-redux';
import {
  joinMission,
  leaveMission,
} from '../../../redux/missions/missionsSlice';
import './MissionsTable.scss';

const MissionsTable = () => {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);

  const handleJoinMission = (missionId) => {
    dispatch(joinMission(missionId));
  };

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
  };

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

export default MissionsTable;
