import React, { useState } from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, TextField, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './Notification.css';
import './Notification.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/features/userSlice';
import AdminSidebar from '../../components/Admin/adminsidebar';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { title: "Notification 1", details: "Details of notification 1..." },
        { title: "Notification 2", details: "Details of notification 2..." }
    ]);

    const [newTitle, setNewTitle] = useState('');
    const [newDetails, setNewDetails] = useState('');

    const addNotification = () => {
        const newNotification = { title: newTitle, details: newDetails };
        setNotifications([...notifications, newNotification]);
        setNewTitle('');
        setNewDetails('');
    };

    const deleteNotification = (index) => {
        const updatedNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(updatedNotifications);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      if (window.confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        dispatch(clearUser());
        navigate('/');
      }
    };

    return (
        <Box display="flex" height="100vh">
            <AdminSidebar />
            <Container className="mainContent">
                <Typography variant="h4" gutterBottom>
                    Notifications
                </Typography>
                <Paper elevation={3} className='paper'>
                    <Typography variant="h6">Add New Notification</Typography>
                    <TextField
                        label="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Details"
                        value={newDetails}
                        onChange={(e) => setNewDetails(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={addNotification}>
                        Add Notification
                    </Button>
                </Paper>
                {notifications.map((notification, index) => (
                    <Paper elevation={3} className='paper' key={index}>
                        <Typography variant="h6">{notification.title}</Typography>
                        <Typography>{notification.details}</Typography>
                        <Button variant="contained" color="secondary" onClick={() => deleteNotification(index)} style={{ marginTop: '10px' }}>
                            Delete
                        </Button>
                    </Paper>
                ))}
            </Container>
        </Box>
    );
};

export default Notifications;
