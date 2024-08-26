import React, { useState } from 'react';
import './adminsidebar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/features/userSlice';

function App() {
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

    React.useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    const handleItemClick = (path) => {
        setActiveItem(path);
    };

    return (
        <div className="adminsidebar">
            <div className="logo-container">
                <img src="/Pic/logo.png" alt="MSWDO-SWIMS Logo" className="logo" />
            </div>
            <Link to="/Admin/admindashboard" className={`menu-item ${activeItem === '/Admin/admindashboard' ? 'active' : ''}`} onClick={() => handleItemClick('/Admin/admindashboard')}>
                <span className="menu-link">
                    Dashboard
                </span>
            </Link>
            <Link to="/Admin/usermanagement" className={`menu-item ${activeItem === '/Admin/usermanagement' ? 'active' : ''}`} onClick={() => handleItemClick('/Admin/usermanagement')}>
                <span className="menu-link">
                    Users
                </span>
            </Link>
            <Link to="/Admin/reports" className={`menu-item ${activeItem === '/Admin/reports' ? 'active' : ''}`} onClick={() => handleItemClick('/Admin/reports')}>
                <span className="menu-link">
                    Reports
                </span>
            </Link>
            <Link to="/Admin/notification" className={`menu-item ${activeItem === '/Admin/notification' ? 'active' : ''}`} onClick={() => handleItemClick('/Admin/notification')}>
                <span className="menu-link">
                    Notification
                </span>
            </Link>
            <div className="menu-item" onClick={handleLogout}>
                <span className="text">Logout</span>
            </div>
        </div>
    );
}

export default App;
