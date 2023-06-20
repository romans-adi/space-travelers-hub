const fetchMissions = async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/missions');
    const data = await response.json();

    const missions = data.map((mission) => ({
      ...mission,
      status: 'upcoming',
    }));

    return missions;
  } catch (error) {
    return null;
  }
};

export default fetchMissions;
