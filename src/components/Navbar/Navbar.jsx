import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => (
  <nav>
    <span className="logo">
      Space Travelers&rsquo; Hub
    </span>
    <ul>
      <li>
        <Link to="/">Rockets</Link>
      </li>
      <li>
        <Link to="/about">Missions</Link>
      </li>
      <li>
        <Link to="/my-profile">Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
