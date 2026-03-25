const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
