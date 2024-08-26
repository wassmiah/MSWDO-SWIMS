import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

const getUser = async (dispatch) => {
    try {
        dispatch(showLoading());
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found in localStorage');
        }

        const res = await axios.post(
            "/api/v1/user/getUserData",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        dispatch(hideLoading());
        if (res.data.success) {
            dispatch(setUser(res.data.data));
        } else {
            throw new Error('User data retrieval failed');
        }
    } catch (error) {
        dispatch(hideLoading());
        localStorage.clear();
        throw error;
    }
};

const ProtectedRoute = ({ children, role }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user && localStorage.getItem("token")) {
            getUser(dispatch).then(() => setLoading(false)).catch(error => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [user, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (user) {
        if (role && user.role !== role) {
            return <Navigate to={user.role === 'admin' ? "/admin/admindashboard" : "/dashboard"} />;
        }
        return children;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
