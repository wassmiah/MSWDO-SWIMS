import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'; // Correct import
import alertReducer from './features/alertSlice'; // Correct import

export default configureStore({
    reducer: {
        alerts: alertReducer,
        user: userReducer,
    }
});
