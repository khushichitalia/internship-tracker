import React from 'react';
import RegisterForm from './components/RegisterForm'; 
import './Login.css'; 

function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Register</h2>
        <RegisterForm />
        <div className="signup-link">
          <p>
            <a href="/">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
