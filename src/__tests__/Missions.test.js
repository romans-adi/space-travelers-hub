import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Missions from '../views/Missions/Missions';
import fetchMissions from '../redux/missions/missionsAPI';
import {
  setFetchedMissions,
  setMissions,
} from '../redux/missions/missionsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/missions/missionsAPI', () => jest.fn());

describe('Missions', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render LoadingSpinner when missions are not fetched', async () => {
    const { queryByTestId } = render(<Missions />);
    await waitFor(() => {
      expect(queryByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  it('should render MissionsTable when missions are fetched', async () => {
    const { findByTestId } = render(<Missions />);
    const missionsTable = await findByTestId('missions-table');
    expect(missionsTable).toBeInTheDocument();
  });

  it('should render error message when there is an error', () => {
    const { getByText } = render(<Missions />);
    expect(getByText(/Apologies for the inconvenience/)).toBeInTheDocument();
    expect(getByText(/There was a problem retrieving the missions data/)).toBeInTheDocument();
  });

  it('should dispatch setMissions and setFetchedMissions actions when missions are fetched', async () => {
    useSelector.mockReturnValue({ fetchedMissions: false });

    const missionsData = [/* mocked missions data */];
    fetchMissions.mockResolvedValue(missionsData);

    render(<Missions />);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(setMissions(missionsData));
      expect(dispatchMock).toHaveBeenCalledWith(setFetchedMissions());
    });
  });
});
