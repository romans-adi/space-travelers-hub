/* eslint-disable jsx-a11y/control-has-associated-label */
import useSWR from 'swr';
import { Vortex } from 'react-loader-spinner';
import fetchMissions from '../../redux/missions/missionsAPI';
import './Missions.scss';

const Missions = () => {
  const { data: missions, error } = useSWR('missions', fetchMissions);
  const member = {
    status: 'Not A Member',
  };

  if (error) {
    return <div>Error fetching missions data.</div>;
  }

  if (!missions) {
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
                <span className={`member-status-badge ${member.status === 'Active Member' ? 'active-member' : 'not-member'}`}>
                  {member.status === 'Active Member' ? 'Active Member' : 'Not a Member'}
                </span>
              </td>
              <td className="mission-status">
                {mission.status === 'upcoming' ? (
                  <button className="join-mission" type="button">Join Mission</button>
                ) : (
                  <button className="leave-mission" type="button">Leave Mission</button>
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
