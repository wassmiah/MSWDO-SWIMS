import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import Home from './pages/Home Page/home';
import Login from './pages/Login Page/login';
import Register from './pages/Registration Page/register';
import Forgot from './pages/Forgot Password Page/forgot';

import SessionModal from './components/SessionModal';

// User
import Dashboard from './pages/Dashboard Page/dashboard';
import UserProfile from './pages/Userprofile Page/userprofile';
import CaseCategories from './pages/Case Categories Page/casecategories';
import Add from './pages/Case Form Page/add';
import Progress from './pages/Progress Page/progress';
import Schedule from './pages/Schedule Page/schedule';
import AddTask from './pages/Schedule Page/addtask';
import ClientTable from './pages/Client Page/clienttable';

// Admin
import AdminDashboard from './pages/Admin/AdminDashboard';
import Notification from './pages/Admin/Notification';
import Reports from './pages/Admin/Reports';
import UserManagement from './pages/Admin/UserManagement';

// Components
import Sidebar from './components/sidebar';
import UserHeader from './components/userheader';

import { TaskProvider } from './pages/Schedule Page/TaskContext';

function App() {
    return (
        <BrowserRouter>
            <TaskProvider>
                <MainApp />
            </TaskProvider>
        </BrowserRouter>
    );
}

function MainApp() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [caseData, setCaseData] = useState([]);
    const [clientData, setClientData] = useState([]); // New state for client data
    const [showModal, setShowModal] = useState(false);
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleUserActivity = useCallback(() => {
        setLastActivityTime(Date.now());
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setLastActivityTime(Date.now());
            setIsSidebarVisible(false);
        }
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;

        const activityEvents = ['click', 'mousemove', 'keypress'];
        activityEvents.forEach((event) => window.addEventListener(event, handleUserActivity));

        const checkInactivity = setInterval(() => {
            const excludedPaths = ['/', '/login', '/register', '/forgot'];
            if (Date.now() - lastActivityTime > 10 * 60 * 1000 && !excludedPaths.includes(location.pathname)) {
                setShowModal(true);
            }
        }, 1000);

        return () => {
            activityEvents.forEach((event) => window.removeEventListener(event, handleUserActivity));
            clearInterval(checkInactivity);
        };
    }, [lastActivityTime, handleUserActivity, isLoggedIn, location.pathname]);

    useEffect(() => {
        if (isLoggedIn) {
            setIsSidebarVisible(false);
        }
    }, [isLoggedIn]);

    // Fetch client data
    useEffect(() => {
        const fetchClientData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/api/v1/clients', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setClientData(data.data);
                } else {
                    console.error('Failed to fetch client data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        if (isLoggedIn) {
            fetchClientData();
        }
    }, [isLoggedIn]);

    const handleStayLoggedIn = () => {
        setLastActivityTime(Date.now());
        setShowModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleLogin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setLastActivityTime(Date.now());
            setShowModal(false);
            setIsSidebarVisible(false);
        }
    };

    const addCase = (newCase) => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:5000/api/v1/cases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newCase),
        })
        .then(response => response.json())
        .then(data => {
            setCaseData(prevCaseData => [...prevCaseData, data]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <>
            {isLoggedIn && user?.role === 'user' && (
                <>
                    <UserHeader toggleSidebar={toggleSidebar} />
                    <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                </>
            )}
            <Routes>
                <Route path="/" element={<PublicRoute><Home onLogin={handleLogin} /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login onLogin={handleLogin} /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register onLogin={handleLogin} /></PublicRoute>} />
                <Route path="/forgot" element={<PublicRoute><Forgot /></PublicRoute>} />

                <Route path="/dashboard" element={<ProtectedRoute role="user"><Dashboard /></ProtectedRoute>} />
                <Route path="/userprofile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
                <Route path="/casecategories" element={<ProtectedRoute role="user"><CaseCategories /></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute role="user"><Add addCase={addCase} /></ProtectedRoute>} />
                <Route path="/progress" element={<ProtectedRoute role="user"><Progress caseData={caseData} /></ProtectedRoute>} />
                <Route path="/schedule" element={<ProtectedRoute role="user"><Schedule /></ProtectedRoute>} />
                <Route path="/addtask" element={<ProtectedRoute role="user"><AddTask /></ProtectedRoute>} />
                <Route path="/clienttable" element={<ProtectedRoute role="user"><ClientTable clientData={clientData} /></ProtectedRoute>} />

                <Route path="/admin/admindashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/notification" element={<ProtectedRoute role="admin"><Notification /></ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>} />
                <Route path="/admin/usermanagement" element={<ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>} />
            </Routes>
            {isLoggedIn && showModal && !['/', '/login', '/register', '/forgot'].includes(location.pathname) && (
                <SessionModal
                    onStayLoggedIn={handleStayLoggedIn}
                    onLogout={handleLogout}
                />
            )}
        </>
    );
}

export default App;
