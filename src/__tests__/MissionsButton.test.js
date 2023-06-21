import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import MissionsButton from '../components/Missions/MissionsButton';
import { joinMission, leaveMission } from '../redux/missions/missionsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../redux/missions/missionsSlice', () => ({
  joinMission: jest.fn(),
  leaveMission: jest.fn(),
}));

describe('MissionsButton', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Join Mission button when not joined', () => {
    const missionId = 'mission1';
    const joinedMissions = [];

    const { getByText } = render(
      <MissionsButton missionId={missionId} joinedMissions={joinedMissions} />,
    );

    const joinButton = getByText('Join Mission');
    expect(joinButton).toBeInTheDocument();

    fireEvent.click(joinButton);
    expect(joinMission).toHaveBeenCalledWith(missionId);
  });

  it('should render Leave Mission button when joined', () => {
    const missionId = 'mission1';
    const joinedMissions = ['mission1'];

    const { getByText } = render(
      <MissionsButton missionId={missionId} joinedMissions={joinedMissions} />,
    );

    const leaveButton = getByText('Leave Mission');
    expect(leaveButton).toBeInTheDocument();

    fireEvent.click(leaveButton);
    expect(leaveMission).toHaveBeenCalledWith(missionId);
  });
});
