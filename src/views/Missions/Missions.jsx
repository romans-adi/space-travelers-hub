import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import MissionsTable from '../../components/Missions/MissionsTable/MissionsTable';
import {
  setFetchedMissions,
  setMissions,
} from '../../redux/missions/missionsSlice';
import fetchMissions from '../../redux/missions/missionsAPI';

const Missions = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.missions.error);
  const fetchedMissions = useSelector((state) => state.missions.fetchedMissions);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const missions = await fetchMissions();
        dispatch(setMissions(missions));
        dispatch(setFetchedMissions());
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMissionData();
  }, [dispatch]);

  if (error) {
    return <div>Error fetching missions data.</div>;
  }

  if (!fetchedMissions) {
    return <LoadingSpinner />;
  }

  return <MissionsTable />;
};

export default Missions;
