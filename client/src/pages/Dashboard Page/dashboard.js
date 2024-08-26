import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import SummaryBoxes from './SummaryBoxes'; // Import SummaryBoxes
import './dashboard.css';

export default function Dashboard() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [caseData, setCaseData] = useState([]);

    useEffect(() => {
        // Fetch case data when Dashboard mounts
        fetchCases();
    }, []);

    const fetchCases = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/api/v1/cases', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setCaseData(data.cases || []);
            } else {
                console.error('Failed to fetch cases:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching cases:', error);
        });
    };

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getStartingDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setCurrentDate(newDate);
    };

    const generateDays = () => {
        const days = [];
        const numDays = getDaysInMonth(currentDate);
        const startingDay = getStartingDayOfMonth(currentDate);

        for (let i = 0; i < startingDay; i++) {
            days.push(<div key={`empty${i}`} className="empty"></div>);
        }

        for (let i = 1; i <= numDays; i++) {
            days.push(
                <div
                    key={i}
                    className={`day ${currentDate.getDate() === i ? 'selected' : ''}`}
                    onClick={() => handleDateClick(i)}
                >
                    <div className="day-number">{i}</div>
                </div>
            );
        }
        return days;
    };

    const goToPreviousMonth = () => {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(previousMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(nextMonth);
    };

    return (
        <div className="main-content">
            <div className="dashboard">
                <h1>Hello, User!</h1>
            </div>
            <div className="notif">
                <div className="team">
                    <h5>Welcome to Dashboard.</h5>
                </div>
            </div>
            <div className="summary-and-piechart">
                <div className="summary-with-calendar">
                    <SummaryBoxes caseData={caseData} /> {/* Pass caseData to SummaryBoxes */}
                    <div className="scheduler">
                        <div className="header">
                            <button onClick={goToPreviousMonth}>&lt;</button>
                            <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
                            <button onClick={goToNextMonth}>&gt;</button>
                        </div>
                        <div className="weekdays">
                            {weekdays.map(day => (
                                <div key={day} className="weekday">{day}</div>
                            ))}
                        </div>
                        <div className="days">
                            {generateDays()}
                        </div>
                    </div>
                </div>
                <PieChart />
            </div>
        </div>
    );
}
