import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/home">Internships</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/job-board">Job Board</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
    