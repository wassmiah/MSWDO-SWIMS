import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';
import './schedule.css';
import axios from 'axios';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { tasks, setTasks } = useTasks();
  const navigate = useNavigate();

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDayOfWeek = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const navigateToAddTask = () => {
    navigate('/addtask');
  };

  const hasTask = (date) => {
    return tasks.some(task => new Date(task.date).toDateString() === date.toDateString());
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayHasTask = hasTask(dayDate);
      days.push(
        <div
          key={day}
          className={`calendar-day ${dayHasTask ? 'has-task' : ''} ${selectedDate && dayDate.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
          onClick={() => setSelectedDate(dayDate)}
        >
          {day}
          {dayHasTask && <span className="task-indicator"></span>}
        </div>
      );
    }
    return days;
  };

  const filteredTasks = selectedDate
    ? tasks.filter(task => new Date(task.date).toDateString() === selectedDate.toDateString())
    : tasks;

  const parseDateTime = (date, time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const parsedDate = new Date(date);
    parsedDate.setHours(hours, minutes);
    return parsedDate;
  };

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateTimeA = parseDateTime(a.date, a.time);
    const dateTimeB = parseDateTime(b.date, b.time);
    return dateTimeA - dateTimeB;
  });

  const deleteTask = async (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/schedule/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className='schedwhole'>
      <div className='calendar-container'>
        <div className="calendar">
          <div className="calendar-header">
            <button onClick={prevMonth}>{'<'}</button>
            <span className="calendar-month">
              {currentDate.toLocaleDateString('default', { month: 'long' })} {currentDate.getFullYear()}
            </span>
            <button onClick={nextMonth}>{'>'}</button>
            <button className="add-task-button" onClick={navigateToAddTask}>ADD TASK</button>
          </div>
          <div className="calendar-days-of-week">
            {daysOfWeek.map(day => (
              <div key={day} className="calendar-day-of-week">{day}</div>
            ))}
          </div>
          <div className="calendar-days">
            {renderDays()}
          </div>
          <div className="task-list">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Case Type</th>
                  <th>Case Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task, index) => (
                  <tr key={task._id || index}>
                    <td>{index + 1}</td>
                    <td>{task.date ? new Date(task.date).toLocaleDateString() : ''}</td>
                    <td>{task.time || ''}</td>
                    <td>{task.status || ''}</td>
                    <td>{task.category || ''}</td>
                    <td>{task.description || ''}</td>
                    <td>
                      <button className="edit-button">✏️</button>
                      <button className="delete-button" onClick={() => deleteTask(task._id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
                {sortedTasks.length === 0 && (
                  <tr>
                    <td colSpan="7">No tasks for this date</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
