import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Profile from '../views/Profile/Profile';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Profile component', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selectorFn) => selectorFn({
      missions: {
        joinedMissions: [1, 2, 3],
        missions: [
          { mission_id: 1, mission_name: 'Mission 1' },
          { mission_id: 2, mission_name: 'Mission 2' },
          { mission_id: 3, mission_name: 'Mission 3' },
        ],
      },
      rocket: {
        addedRockets: [1, 2],
        rockets: [
          { id: 1, name: 'Rocket 1' },
          { id: 2, name: 'Rocket 2' },
          { id: 3, name: 'Rocket 3' },
        ],
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the joined missions correctly', () => {
    const { getByText } = render(<Profile />);

    expect(getByText('My Missions')).toBeInTheDocument();
    expect(getByText('Mission 1')).toBeInTheDocument();
    expect(getByText('Mission 2')).toBeInTheDocument();
    expect(getByText('Mission 3')).toBeInTheDocument();
  });

  it('renders the booked rockets correctly', () => {
    const { getByText } = render(<Profile />);

    expect(getByText('My Rockets')).toBeInTheDocument();
    expect(getByText('Rocket 1')).toBeInTheDocument();
    expect(getByText('Rocket 2')).toBeInTheDocument();
  });
});
