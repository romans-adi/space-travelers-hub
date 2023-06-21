/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSelector } from 'react-redux';
import MissionsButton from './MissionsButton';
import './MissionsTable.scss';

const MissionsTable = () => {
  const missions = useSelector((state) => state.missions.missions);
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);

  return (
    <div className="missions" data-testid="missions-table">
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
                <MissionsButton
                  missionId={mission.mission_id}
                  joinedMissions={joinedMissions}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionsTable;
