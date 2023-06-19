import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => (
  <nav>
    <span className="logo">
      Space Travelers' Hub
    </span>
    <ul>
      <li>
        <NavLink to="/" exact activeClassName="active-link">
          Rockets
        </NavLink>
      </li>
      <li>
        <NavLink to="/missions" activeClassName="active-link">
          Missions
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" activeClassName="active-link">
          Profile
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
