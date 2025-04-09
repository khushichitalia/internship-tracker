import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login'; 
import RegisterPage from './Register';
import InternshipTracker from './InternshipTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<InternshipTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
