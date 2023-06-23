import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import JoinedMissions from '../components/Profile/JoinedMissions';

jest.mock('react-redux');

describe('JoinedMissions', () => {
  const joinedMissionsMock = [1, 2, 3];
  const allMissionsMock = [
    { mission_id: 1, mission_name: 'Mission 1', wikipedia: 'https://en.wikipedia.org/1' },
    { mission_id: 2, mission_name: 'Mission 2', wikipedia: 'https://en.wikipedia.org/2' },
    { mission_id: 3, mission_name: 'Mission 3', wikipedia: 'https://en.wikipedia.org/3' },
    { mission_id: 4, mission_name: 'Mission 4', wikipedia: 'https://en.wikipedia.org/4' },
  ];

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selector) => selector({
      missions: {
        joinedMissions: joinedMissionsMock,
        missions: allMissionsMock,
      },
    }));
  });

  afterEach(() => {
    useSelector.mockReset();
  });

  it('renders "No missions joined yet." when no missions are joined', () => {
    useSelector.mockImplementation((selector) => selector({
      missions: {
        joinedMissions: [],
        missions: allMissionsMock,
      },
    }));

    render(<JoinedMissions />);
    const message = screen.getByText('No missions joined yet.');

    expect(message).toBeInTheDocument();
  });

  it('renders joined missions correctly', () => {
    render(<JoinedMissions />);

    joinedMissionsMock.forEach((missionId) => {
      const mission = allMissionsMock.find((m) => m.mission_id === missionId);
      const missionName = screen.getByText(mission.mission_name);
      const missionsButton = screen.getByTestId(`missions-button-${mission.mission_id}`);
      const readMoreButtons = screen.getAllByTestId(`missions-button-${mission.mission_id}`);

      expect(missionName).toBeInTheDocument();
      expect(missionsButton).toBeInTheDocument();
      expect(readMoreButtons).toHaveLength(1);
    });
  });

  it('calls openWikipediaPage when "Read more" button is clicked', () => {
    const openWikipediaPageMock = jest.spyOn(window, 'open').mockImplementation();

    render(<JoinedMissions />);
    const readMoreButtons = screen.queryAllByText('Read more');

    readMoreButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(openWikipediaPageMock).toHaveBeenCalledTimes(readMoreButtons.length);
    readMoreButtons.forEach((button, index) => {
      expect(openWikipediaPageMock).toHaveBeenCalledWith(allMissionsMock[index].wikipedia, '_blank');
    });

    openWikipediaPageMock.mockRestore();
  });
});
