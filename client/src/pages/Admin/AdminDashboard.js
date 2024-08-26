import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/features/userSlice';
import AdminSidebar from '../../components/Admin/adminsidebar';

const AdminDashboard = () => {
    const [totalUsers, setTotalUsers] = useState(21);
    const [activeUsers, setActiveUsers] = useState(21);
    const [inactiveUsers, setInactiveUsers] = useState(21);
    const [totalCases, setTotalCases] = useState(21);
    const [activeCases, setActiveCases] = useState(21);
    const [completedCases, setCompletedCases] = useState(21);

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
            <Box className="mainContent">
                <Typography variant="h4" gutterBottom>
                    Hello Admin,
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to Dashboard. Here is what's going on today:
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} className="stat">
                            <Typography variant="h2">{totalUsers}</Typography>
                            <Typography variant="body1">Total Users</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} className="stat">
                            <Typography variant="h2">{activeUsers}</Typography>
                            <Typography variant="body1">Active Users</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} className="stat">
                            <Typography variant="h2">{inactiveUsers}</Typography>
                            <Typography variant="body1">Inactive Users</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} className="stat">
                            <Typography variant="h2">{totalCases}</Typography>
                            <Typography variant="body1">Total Cases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} className="stat">
                            <Typography variant="h2">{activeCases}</Typography>
                            <Typography variant="body1">Active Cases</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} className="stat">
                            <Typography variant="h2">{completedCases}</Typography>
                            <Typography variant="body1">Completed Cases</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
