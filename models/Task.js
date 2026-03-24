const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  points: {
    type: Number,
    required: true
  },
  category: String   // e.g., waste, water, energy
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
