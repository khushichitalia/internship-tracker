import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login'; 
import RegisterPage from './Register';
import InternshipTracker from './InternshipTracker';
import JobBoard from './JobBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<InternshipTracker />} />
        <Route path="/job-board" element={<JobBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
