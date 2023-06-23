import mockAxios from '../__mocks__/axios';
import fetchMissions from '../redux/missions/missionsAPI';

afterEach(() => {
  mockAxios.reset();
});

describe('fetchMissions', () => {
  it('should fetch missions successfully', async () => {
    const mockResponse = [
      { mission_id: 'mission-123', name: 'Mission 1', status: 'upcoming' },
      { mission_id: 'mission-456', name: 'Mission 2', status: 'upcoming' },
    ];

    mockAxios.get.mockResolvedValueOnce({ data: mockResponse });
    const missions = await fetchMissions();
    expect(mockAxios.get).toHaveBeenCalledWith('https://api.spacexdata.com/v3/missions');
    expect(missions).toEqual(mockResponse);
  });

  it('should handle fetch error and return null', async () => {
    mockAxios.get.mockRejectedValueOnce(new Error('Fetch failed'));
    const missions = await fetchMissions();
    expect(missions).toBeNull();
  });
});
