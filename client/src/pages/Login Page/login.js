import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { setUser } from '../../redux/features/userSlice';
import { message } from 'antd';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", formData);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        const userRes = await axios.post(
          "/api/v1/user/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`
            }
          }
        );
        if (userRes.data.success) {
          dispatch(setUser(userRes.data.data));
          localStorage.setItem('user', JSON.stringify(userRes.data.data));
          message.success('Login Successfully');
          if (res.data.role === 'admin') {
            navigate('/Admin/admindashboard');
          } else {
            navigate('/dashboard');
          }
          window.location.reload(); // Add this line to refresh the page
        } else {
          throw new Error('Fetching user data failed');
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error during login request:", error);
      message.error('Email or Password is invalid');
    }
  };

  return (
    <div className="loginmain">
      <div className="welc">
        <img src="/Pic/logo.png" alt="Hello" />
        <h1>Welcome to MSDWO-SWIMS</h1>
      </div>

      <div className="loginboxContainer">
        <form onSubmit={onSubmitHandler}>
          <div className="user">
            <label>Email:</label>
          </div>
          <input
            name="email"
            placeholder="Email Address"
            type="email"
            className="userbox"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />

          <div className="pass">
            <label>Password:</label>
          </div>
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="passbox"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />

          <div className="forgot">
            <Link to="/forgot">
              Forgot Password?
            </Link>
          </div>

          <div className="loginButton">
            <button type="submit" className='butt'>Login</button>
          </div>

          <div className="forgot">
            <Link to="/register">
              <button type="button" className='butt'>Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
