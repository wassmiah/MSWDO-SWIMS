import React from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './Reports.css';
import './Reports.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/features/userSlice';
import AdminSidebar from '../../components/Admin/adminsidebar';

const Reports = () => {
    const reports = [
        { title: "Report 1", details: "Details of report 1..." },
        { title: "Report 2", details: "Details of report 2..." }
    ];

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
                    Reports
                </Typography>
                {reports.map((report, index) => (
                    <Paper elevation={3} className='paper' key={index}>
                        <Typography variant="h6">{report.title}</Typography>
                        <Typography>{report.details}</Typography>
                    </Paper>
                ))}
            </Container>
        </Box>
    );
};

export default Reports;
