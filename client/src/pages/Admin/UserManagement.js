import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography, Paper, Button, TextField } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './UserManagement.css';
import './UserManagement.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/features/userSlice';
import AdminSidebar from '../../components/Admin/adminsidebar';

const UserManagement = () => {
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
                    Users Management
                </Typography>
                <Paper className='tableContainer'>
                    <TextField label="Name" variant="outlined" size="small" className='inputField' />
                    <TextField label="Email" variant="outlined" size="small" className='inputField' />
                    <Button variant="contained" color="primary" className='addButton'>ADD USER</Button>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Users ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Case Title</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>Aragon, Jan Louie</td>
                                <td>1.janlouiearagon@gmail.com</td>
                                <td>Case Title</td>
                                <td>
                                    <Button variant="contained" color="warning" className='detailsButton'>Details</Button>
                                    <Button variant="contained" color="error" className='deleteButton'>Delete</Button>
                                </td>
                            </tr>
                            {/* Repeat the above <tr> block for more rows */}
                        </tbody>
                    </table>
                </Paper>
            </Box>
        </Box>
    );
};

export default UserManagement;
