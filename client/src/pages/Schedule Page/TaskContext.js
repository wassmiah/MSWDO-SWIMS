import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchTasks = async () => {
      if (!authToken) {
        console.log('No auth token found');
        return;
      }
      console.log('Fetching tasks with token:', authToken);
      try {
        const response = await axios.get('http://localhost:5000/api/v1/schedule/tasks', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [authToken]);

  const addTask = async (newTask) => {
    try {
      console.log('Adding task with token:', authToken);
      const response = await axios.post('http://localhost:5000/api/v1/schedule/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, setAuthToken }}>
      {children}
    </TaskContext.Provider>
  );
};
