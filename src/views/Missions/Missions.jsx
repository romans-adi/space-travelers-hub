import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import MissionsTable from '../../components/Missions/MissionsTable';
import { fetchMissionsData } from '../../redux/missions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.missions.error);
  const fetchedMissions = useSelector((state) => state.missions.fetchedMissions);

  useEffect(() => {
    dispatch(fetchMissionsData());
  }, [dispatch]);

  if (error) {
    return (
      <div>
        Apologies for the inconvenience.
        There was a problem retrieving the missions data.
      </div>
    );
  }

  if (!fetchedMissions) {
    return <LoadingSpinner />;
  }

  return <MissionsTable />;
};

export default Missions;
