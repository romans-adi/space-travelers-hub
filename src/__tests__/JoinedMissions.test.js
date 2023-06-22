import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import JoinedMissions from '../components/Profile/JoinedMissions';
import { leaveMission } from '../redux/missions/missionsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../redux/missions/missionsSlice', () => ({
  leaveMission: jest.fn(),
}));

describe('JoinedMissions', () => {
  const mockJoinedMissions = [/* joined */];
  const mockAllMissions = [/* all */];
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      missions: {
        joinedMissions: mockJoinedMissions,
        missions: mockAllMissions,
      },
    }));
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    leaveMission.mockClear();
    jest.restoreAllMocks();
  });

  it('renders "No missions joined yet." when no missions are joined', () => {
    render(<JoinedMissions />);
    expect(screen.getByText('No missions joined yet.')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('renders joined missions', () => {
    const mockMission = {
      mission_id: '1',
      mission_name: 'Some Mission',
      wikipedia: 'https://some-mission.wikipedia.org',
    };

    useSelector.mockImplementation((selector) => selector({
      missions: {
        joinedMissions: [mockMission.mission_id],
        missions: [mockMission],
      },
    }));

    const windowOpenMock = jest.spyOn(window, 'open').mockImplementation(() => {});

    render(<JoinedMissions />);

    expect(screen.queryByText('No missions joined yet.')).not.toBeInTheDocument();

    expect(screen.getByText(mockMission.mission_name)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Leave Mission' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Read more' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Leave Mission' }));
    expect(leaveMission).toHaveBeenCalledWith(mockMission.mission_id);

    fireEvent.click(screen.getByRole('button', { name: 'Read more' }));
    expect(windowOpenMock).toHaveBeenCalledWith(mockMission.wikipedia, '_blank');
  });
});
