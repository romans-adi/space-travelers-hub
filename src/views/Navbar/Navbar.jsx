import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import logoImage from '../../assets/planeticon.png';

const Navbar = () => (
  <nav>
    <span className="logo">
      <img src={logoImage} alt="logo" className="logo-image" />
      Space Travelers&rsquo; Hub
    </span>
    <ul>
      <li>
        <NavLink to="/" className="rockets" activeClassName="active-link">
          Rockets
        </NavLink>
      </li>
      <li>
        <NavLink to="/missions" className="missions" activeClassName="active-link">
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
