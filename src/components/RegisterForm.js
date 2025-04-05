import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../FireBase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      toast.success("User registered successfully!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => navigate('/'),
      });      
    }
    catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label>Username</label>
        <input 
          id="username" 
          type="text" 
          value = {username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="Type your username" 
          />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input 
          id="email" 
          type="email" 
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example_user@anymail.com" 
          />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          id="password" 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose your password" />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="login-btn">CREATE ACCOUNT</button>
    </form>
    <ToastContainer />
    </>
  );
}

export default RegisterForm;
