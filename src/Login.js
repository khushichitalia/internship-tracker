import React from 'react';
import LoginForm from './components/LoginForm'; 
import './Login.css'; 

function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <LoginForm />
        <div className="signup-link">
          <p>
            <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
