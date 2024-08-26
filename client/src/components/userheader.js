import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { FaBell, FaBars } from "react-icons/fa";
import './userheader.css';

function UserHeader({ userAvatar, toggleSidebar }) {
  const [timer, setTimer] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const handleUserActivity = useCallback(() => {
    setLastActivityTime(Date.now());
    setTimer(0); // Reset the header timer
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activityEvents = ['click', 'mousemove', 'keypress'];

    activityEvents.forEach((event) =>
      window.addEventListener(event, handleUserActivity)
    );

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleUserActivity)
      );
    };
  }, [handleUserActivity]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="userhead">
      <div className="burger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className="logo-text">
        <img src="/Pic/logo.png" alt="MSWDO-SWIMS Logo" />
        <span>MSWDO-SWIMS</span>
      </div>
      <div className="userheadfeat">
        <div className="timer">
          {formatTime(timer)}
        </div>
        <div className="bell">
          <a href="/dashboard"><FaBell /></a>
        </div>
        <div className="userheaderavatar">
          <Link to="/UserProfile">
            {userAvatar ? (
              <img src={userAvatar} alt="User Avatar" />
            ) : (
              <img src="/Pic/kids2.jpg" alt="Placeholder" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
