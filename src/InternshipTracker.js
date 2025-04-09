import React from 'react';
import './InternshipTracker.css';

function InternshipTracker(){
  return (
    <div className = "home-wrapper">
      <div className = "home-card">
        <h1>Internship Tracker</h1>
        <p>Welcome back! Here you can manage your internships, deadlines, and progress.</p>

        <div className = "button-group">
          <button className='home-btn'>Add New Internship</button>
          <button className='home-btn'>View All</button>
          <button className='home-btn'>Settings</button>
        </div>
      </div>
    </div>
  )
}

export default InternshipTracker;