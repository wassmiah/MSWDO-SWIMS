import React, { useEffect, useState } from 'react';
import './SessionModal.css';

const SessionModal = ({ onStayLoggedIn, onLogout }) => {
    const [countdown, setCountdown] = useState(300); // 30 seconds countdown

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    onLogout();
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onLogout]);

    const handleStayLoggedIn = () => {
        setCountdown(30);
        onStayLoggedIn();
    };

    return (
        <div className="session-modal">
            <div className="session-modal-content">
                <p>You will be logged out in {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60} due to inactivity.</p>
                <button onClick={handleStayLoggedIn}>I'm here</button>
            </div>
        </div>
    );
};

export default SessionModal;
