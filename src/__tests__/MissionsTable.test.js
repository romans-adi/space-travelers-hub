import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import MissionsTable from '../components/Missions/MissionsTable';

const mockStore = configureStore([]);

describe('MissionsTable', () => {
  let store;
  const missions = [
    {
      mission_id: 'mission-1',
      mission_name: 'Mission 1',
      description: 'Mission 1 description',
    },
    {
      mission_id: 'mission-2',
      mission_name: 'Mission 2',
      description: 'Mission 2 description',
    },
  ];
  const joinedMissions = ['mission-1'];

  beforeEach(() => {
    store = mockStore({
      missions: {
        missions,
        joinedMissions,
      },
    });
  });

  it('renders missions table with correct data', () => {
    render(
      <Provider store={store}>
        <MissionsTable />
      </Provider>,
    );

    const missionRows = screen.getAllByRole('row');
    expect(missionRows).toHaveLength(missions.length + 1);
    missions.forEach((mission) => {
      const missionName = screen.getByText(mission.mission_name);
      const missionDescription = screen.getByText(mission.description);
      const missionStatus = screen.getByText(
        joinedMissions.includes(mission.mission_id)
          ? 'Active Member'
          : 'Not a Member',
      );

      expect(missionName).toBeInTheDocument();
      expect(missionDescription).toBeInTheDocument();
      expect(missionStatus).toBeInTheDocument();
    });
  });
});
