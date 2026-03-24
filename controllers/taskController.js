const Task = require("../models/Task");

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE TASK (Teacher/Admin)
exports.createTask = async (req, res) => {
  try {
    const { title, description, points, category } = req.body;

    const task = new Task({
      title,
      description,
      points,
      category
    });

    await task.save();

    res.status(201).json({
      message: "Task created",
      task
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
