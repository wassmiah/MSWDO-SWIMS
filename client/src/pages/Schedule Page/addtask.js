import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';
import './addtask.css';

const AddTask = () => {
  const [task, setTask] = useState({
    date: '',
    time: '',
    title: '',
    category: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!task.date) newErrors.date = 'Date is required';
    if (!task.time) newErrors.time = 'Time is required';
    if (!task.title) newErrors.title = 'Case Title is required';
    if (!task.category) newErrors.category = 'Case Category is required';
    if (!task.description) newErrors.description = 'Case Description is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Clear the error message for the specific field
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask = {
      ...task,
      status: 'Upcoming',
    };

    try {
      await addTask(newTask);
      setTask({
        date: '',
        time: '',
        title: '',
        category: '',
        description: '',
      });
      setErrors({});
      navigate('/schedule');
    } catch (error) {
      setErrors({ form: 'Failed to add task. Please try again.' });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="add-task-content">
          <div className="add-task-container">
            <h2>Add a new schedule</h2>
            <p>Fill up this form to create a new schedule for cases</p>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>
                  Date
                  <input 
                    type="date" 
                    name="date" 
                    value={task.date} 
                    onChange={handleChange} 
                    required
                  />
                  {errors.date && <p className="error">{errors.date}</p>}
                </label>
                <label>
                  Time
                  <input 
                    type="time" 
                    name="time" 
                    value={task.time} 
                    onChange={handleChange} 
                    required
                  />
                  {errors.time && <p className="error">{errors.time}</p>}
                </label>
              </div>
              <div className="form-group">
                <label>
                  Case Title
                  <input 
                    type="text" 
                    name="title" 
                    value={task.title} 
                    onChange={handleChange} 
                    required
                  />
                  {errors.title && <p className="error">{errors.title}</p>}
                </label>
                <label>
                  Case Category
                  <select 
                    name="category" 
                    value={task.category} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Victim Survivor">Victim Survivor</option>
                    <option value="Children In Conflict">Children In Conflict</option>
                    <option value="Person Who Used Drugs">Person Who Used Drugs</option>
                    <option value="Special Cases">Special Cases</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && <p className="error">{errors.category}</p>}
                </label>
              </div>
              <label>
                Case Description
                <textarea 
                  name="description" 
                  value={task.description} 
                  onChange={handleChange} 
                  required
                />
                {errors.description && <p className="error">{errors.description}</p>}
              </label>
              {errors.form && <p className="error">{errors.form}</p>}
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
