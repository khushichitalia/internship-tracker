import React, { use, useState } from 'react';
import {signOut } from 'firebase/auth';
import { auth } from '../FireBase';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    }
    catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Internship Tracker</div>
      <div className="navbar-links">
        <a href="#view">Internships</a>
        <div className="settings-dropdown">
          <a href="#settings" onClick={toggleDropdown}>Settings</a>
          {showDropdown && (
            <div className="dropdown-menu">
              <a href="#account">Account</a>
              <a href="#logout" onClick={handleLogout}>Log Out</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
