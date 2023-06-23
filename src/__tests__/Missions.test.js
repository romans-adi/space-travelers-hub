import React from 'react';
import thunk from 'redux-thunk';
import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Missions from '../views/Missions/Missions';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([thunk]);

describe('Missions', () => {
  it('should render LoadingSpinner when missions are not fetched', async () => {
    const store = mockStore({ missions: { fetchedMissions: null, error: null } });

    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should render MissionsTable when missions are fetched', async () => {
    const store = mockStore({ missions: { fetchedMissions: true, error: null } });

    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    await waitFor(() => {
      const missionsTable = screen.getByTestId('missions-table');
      expect(missionsTable).toBeInTheDocument();
    });
  });

  it('should render error message when there is an error', async () => {
    const errorMessage = 'Apologies for the inconvenience. There was a problem retrieving the missions data.';
    const store = mockStore({ missions: { fetchedMissions: null, error: errorMessage } });

    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    await waitFor(() => {
      const errorElement = screen.getByText(errorMessage);
      expect(errorElement).toBeInTheDocument();
    });
  });

  expect.extend({
    toContainDispatchedAction(received, expectedActionType) {
      const passed = received.some((action) => action.type === expectedActionType);
      if (passed) {
        return {
          message: () => `Expected received actions not to contain an action with type ${expectedActionType}`,
          pass: true,
        };
      }
      return {
        message: () => `Expected received actions to contain an action with type ${expectedActionType}`,
        pass: false,
      };
    },
  });

  describe('Missions', () => {
    it('should dispatch fetchMissionsData action on mount', () => {
      const store = mockStore({ missions: { fetchedMissions: null, error: null } });

      render(
        <Provider store={store}>
          <Missions />
        </Provider>,
      );

      expect(store.getActions()).toContainDispatchedAction('missions/fetchMissionsData/pending');
    });
  });
});
