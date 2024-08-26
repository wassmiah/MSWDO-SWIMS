const Task = require('../models/ScheduleModel');

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.body.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new task for the logged-in user
exports.addTask = async (req, res) => {
  const { userId, date, time, title, category, description, status } = req.body;
  const newTask = new Task({
    userId,
    date,
    time,
    title,
    category,
    description,
    status
  });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task for the logged-in user
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.body.userId });
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found or you are not authorized to delete it' });
    }
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
