import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import '@testing-library/jest-dom/extend-expect';

test('renders the navigation bar', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
  );

  const logoImage = screen.getByAltText('logo');
  expect(logoImage).toBeInTheDocument();

  const logoText = screen.getByText('Space Travelers’ Hub');
  expect(logoText).toBeInTheDocument();

  const rocketsLink = screen.getByText(/rockets/i);
  expect(rocketsLink).toBeInTheDocument();

  const missionsLink = screen.getByText(/missions/i);
  expect(missionsLink).toBeInTheDocument();

  const profileLink = screen.getByText(/profile/i);
  expect(profileLink).toBeInTheDocument();
});
