/* eslint-disable jsx-a11y/control-has-associated-label */
import useSWR from 'swr';
import { Vortex } from 'react-loader-spinner';
import fetchMissions from '../../redux/missions/missionsAPI';
import './Missions.scss';

const Missions = () => {
  const { data: missions, error } = useSWR('missions', fetchMissions);

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
      <h1>Missions</h1>
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
            <tr key={mission.mission_id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#ccc' }}>
              <td>{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>{mission.status}</td>
              <td>
                {mission.status === 'upcoming' ? (
                  <button type="button">Join</button>
                ) : (
                  <button type="button">Cancel</button>
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
