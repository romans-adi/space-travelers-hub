import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Missions from '../views/Missions/Missions';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('Missions', () => {
  it('should render LoadingSpinner when missions are not fetched', async () => {
    const store = mockStore({ missions: { fetchedMissions: null, error: null } });

    const { getByTestId } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    const loadingSpinner = getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should render MissionsTable when missions are fetched', async () => {
    const initialState = {
      missions: {
        missions: [
          {
            mission_id: '1', mission_name: 'Mission 1', description: 'Mission 1 description', reserved: false,
          },
          {
            mission_id: '2', mission_name: 'Mission 2', description: 'Mission 2 description', reserved: false,
          },
        ],
        joinedMissions: [],
        isLoading: false,
        error: null,
        fetchedMissions: true,
      },
    };
    const store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    const missionsTable = getByTestId('missions-table');
    expect(missionsTable).toBeInTheDocument();
  });

  it('should render error message when there is an error', async () => {
    const store = mockStore({ missions: { fetchedMissions: null, error: 'Error message' } });

    const { getByText } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    const errorMessage = getByText(
      'Apologies for the inconvenience. There was a problem retrieving the missions data.',
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
