import React, { useState, useEffect } from "react";
import './userprofile.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/features/userSlice';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

function UserProfile() {
  const user = useSelector((state) => state.user.user); 
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFile(user.avatar);
    }
  }, [user]);

  const handleFinish = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('userId', user._id);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@mswdo-swims\.com$/;
    const namePattern = /^[A-Z][a-zA-Z]*$/;
    const contact = formData.get('contact');

    if (contact.length !== 11) {
      message.error('Contact number must be exactly 11 digits');
      return;
    }
    if (!emailPattern.test(formData.get('email'))) {
      message.error('Email must be in the format @mswdo-swims.com');
      return;
    }
    if (!namePattern.test(formData.get('firstname'))) {
      message.error('First name must start with a capital letter');
      return;
    }
    if (!namePattern.test(formData.get('lastname'))) {
      message.error('Last name must start with a capital letter');
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.patch(
        "/api/v1/user/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(updateUser(res.data.data)); 
        message.success("User Update Successfully");
        dispatch(showLoading());
        window.location.reload();
        navigate('/userprofile');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Went Wrong');
      dispatch(showLoading());
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <div className='userwhole'>
        <div className='userpage'>
          <form onSubmit={handleFinish}>
            <div className="userprofile">
              <h1>User Profile</h1>
            </div>

            <div className="useravatar">
              <label htmlFor="avatarUpload">
                <img src={file || "/Pic/kids2.jpg"} alt="User Avatar" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('avatarUpload').click()} />
              </label>
              <input id="avatarUpload" name="avatar" type="file" style={{ display: 'none' }} onChange={handleChange} />
            </div>

            <div className='names'>
              <div className="double">
                <label>First Name:</label>
                <input name="firstname" placeholder="First Name" type="text" className="doublebox" defaultValue={user?.firstname} required/>
              </div>

              <div className="double">
                <label>Last Name:</label>
                <input name="lastname" placeholder="Last Name" type="text" className="doublebox" defaultValue={user?.lastname} required/>
              </div>
            </div>

            <div className="labels">
              <label>Email Address:</label>
              <input name="email" placeholder="Email" type="text" className="boxes" defaultValue={user?.email} required/>
            </div>

            <div className="labels">
              <label>Contact Number:</label>
              <input name="contact" placeholder="Contact Number" type="text" className="boxes" defaultValue={user?.contact} required/>
            </div>

            <div className="labels">
              <label>Address:</label>
              <input name="address" placeholder="Address" type="text" className="boxes" defaultValue={user?.address} required/>
            </div>

            <div className='names'>
              <div className="double">
                <label>Zip Code:</label>
                <input name="zip" placeholder="Zip Code" type="text" className="doublebox" defaultValue={user?.zip} required/>
              </div>

              <div className="double">
                <label>City/Town:</label>
                <input name="city" placeholder="City" type="text" className="doublebox" defaultValue={user?.city} required/>
              </div>
            </div>

            <div className='names'>
              <div className="double">
                <label>State:</label>
                <input name="state" placeholder="State" type="text" className="doublebox" defaultValue={user?.state} required/>
              </div>

              <div className="double">
                <label>Country:</label>
                <input name="country" placeholder="Country" type="text" className="doublebox" defaultValue={user?.country} required/>
              </div>
            </div>

            <div className="savebutton">
              <button type="submit" className='savebut'>Save Profile</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
