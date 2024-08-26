import React, { useState, useEffect } from 'react';
import { MdDashboard } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';
import { IoMdTime } from "react-icons/io";
import { PiHandHeartFill } from 'react-icons/pi';
import { FaRegShareSquare, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';
import './sidebar.css';

const Sidebar = ({ isSidebarVisible, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      dispatch(clearUser());
      navigate('/');
    }
  };

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
    toggleSidebar(); // Close the sidebar after navigation
  };

  return (
    <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isSidebarVisible ? '←' : '☰'}
      </div>
      {isSidebarVisible && (
        <>
          <div className="reporthead">
            <img src="/Pic/logo.png" alt="Logo" />
          </div>
          <div className="menu-buttons">
            <div 
              className={`reportbuttons ${activeItem === '/dashboard' ? 'active' : ''}`} 
              onClick={() => handleItemClick('/dashboard')}
            >
              <MdDashboard /> Dashboard
            </div>
            <div 
              className={`reportbuttons ${activeItem === '/casecategories' ? 'active' : ''}`} 
              onClick={() => handleItemClick('/casecategories')}
            >
              <GoGraph /> Cases
            </div>
            <div 
              className={`reportbuttons ${activeItem === '/schedule' ? 'active' : ''}`} 
              onClick={() => handleItemClick('/schedule')}
            >
              <IoMdTime /> Scheduling
            </div>
            <div 
              className={`reportbuttons ${activeItem === '/clienttable' ? 'active' : ''}`} 
              onClick={() => handleItemClick('/clienttable')}
            >
              <PiHandHeartFill /> Clientele
            </div>
            <div 
              className={`reportbuttons ${activeItem === '/userprofile' ? 'active' : ''}`} 
              onClick={() => handleItemClick('/userprofile')}
            >
              <FaUser /> Profile
            </div>
            <div className="reportbuttons" onClick={handleLogout}>
              <FaRegShareSquare /> Log out
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
