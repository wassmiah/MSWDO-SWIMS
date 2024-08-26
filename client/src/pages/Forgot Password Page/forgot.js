import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './forgot.css';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('/api/forgot-password', { email });
      if (response.data.success) {
        setMessage('Password reset link sent to your email.');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="forgotmain">
      <div className="forgotwhole">
        <img src="/Pic/logo.png" alt="Hello"/>
        <h1>Welcome to MSDWO-SWIMS</h1>
      </div>

      <div className="forgotpassboxContainer">
        <form onSubmit={handleSubmit}>
          <div className="loginhead">
            <h1>Forgot Password?</h1>
          </div>

          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}

          <div className="user">
            <label>Enter Email Address</label>
          </div>
          <input
            placeholder="Email Address"
            name="email"
            type="email"
            className="userbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="forgotbuttons">
            <button type="submit" className='butt'>Reset Password</button>
          </div>

          <div className="forgotbuttons">
            <Link to="/login">
              <button type="button" className='butt'>Back To Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
