const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, points } = req.body;

  const task = await Task.create({ title, description, points });

  res.json(task);
};
