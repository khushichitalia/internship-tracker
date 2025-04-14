import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../FireBase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css'; 

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!', {
        position: 'top-center',
        autoClose: 500,
        onClose: () => navigate('/home'),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email for password reset!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      toast.success("Password reset email sent!", {
        position: 'top-center',
        autoClose: 3000,
      });
      setShowForgot(false);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Username (Email)</label>
          <input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!showForgot) setForgotEmail(e.target.value);
            }}
            placeholder="Type your email" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Type your password" 
          />
        </div>
        <div className="forgot-row">
          <a href="#forgot" onClick={() => setShowForgot(true)}>Forgot password?</a>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="login-btn">LOGIN</button>
      </form>
      
      <ToastContainer />

      {showForgot && (
        <div className="forgot-modal">
          <div className="forgot-form">
            <h3>Reset Password</h3>
            <form onSubmit={handleForgotSubmit}>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="reset-btn">Send Reset Email</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForgot(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
