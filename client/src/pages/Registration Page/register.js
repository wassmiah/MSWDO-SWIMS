import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    username: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "contact" && value.length > 11) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onFinishHandler = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@mswdo-swims\.com$/;
    const passwordPattern = /^[A-Z][a-zA-Z0-9]*$/;
    const namePattern = /^[A-Z][a-zA-Z]*$/;

    if (formData.contact.length !== 11) {
      message.error('Contact number must be exactly 11 digits');
      return;
    }
    if (!emailPattern.test(formData.email)) {
      message.error('Email must be in the format @mswdo-swims.com');
      return;
    }
    if (!passwordPattern.test(formData.password)) {
      message.error('Password must be alphanumeric with the first letter capitalized');
      return;
    }
    if (!namePattern.test(formData.firstname)) {
      message.error('First name must start with a capital letter');
      return;
    }
    if (!namePattern.test(formData.lastname)) {
      message.error('Last name must start with a capital letter');
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", formData);
      dispatch(hideLoading());
      console.log("Response data:", res.data);
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error during registration request:", error.response ? error.response.data : error.message);
      message.error('User Already Exist');
    }
  };

  return (
    <div className="regimain">
      <div className="regileftpara">
        <h1>MSWDO-SWIMS</h1>
        <h5>Go through the registration form with us easily</h5>
        <img src="/Pic/logo.png" alt="Hello" />
      </div>
      <div className="regiright">
        <div className="regirightpara">
          <h1>Registration Form</h1>
        </div>
        <div className="regiboxes">
          <form onSubmit={onFinishHandler}>
            <div className="reginames">
              <div className="regifirstlast">
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="regifirstlast">
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="single">
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
                className="regibox"
                required
              />
            </div>
            <div className="single">
              <input
                placeholder="Contact Number"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={onChangeHandler}
                className="regibox"
                required
              />
            </div>
            <div className="single">
              <input
                placeholder="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={onChangeHandler}
                className="regibox"
                required
              />
            </div>
            <div className="single">
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
                className="regibox"
                required
              />
            </div>
            <div className="registerButton">
              <button type="submit" className='butto'>Register</button>
            </div>
            <div className="backtologButton">
              <Link to="/login">
                <button className='butto'>Back To Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
