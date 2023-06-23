import axios from 'axios';

const fetchMissions = async () => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v3/missions');
    const missions = response.data.map((mission) => ({
      ...mission,
      status: 'upcoming',
    }));
    return missions;
  } catch (error) {
    return null;
  }
};

export default fetchMissions;
