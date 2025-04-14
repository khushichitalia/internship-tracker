import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FireBase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    }
    catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email" 
          />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          onChange={(e)=> setPassword(e.target.value)}
          placeholder="Type your password" />
      </div>
      <div className="forgot-row">
        <a href="#forgot">Forgot password?</a>
      </div>
      {error && <p style={{ color: 'red'}}>{error}</p>}
      <button type="submit" className="login-btn">LOGIN</button>
    </form>
    <ToastContainer />
    </>
  );
}

export default LoginForm;
