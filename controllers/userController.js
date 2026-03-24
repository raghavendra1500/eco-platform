const Submission = require("../models/Submission");
const User = require("../models/User");
const Task = require("../models/Task");

// SUBMIT TASK
exports.submitTask = async (req, res) => {
  try {
    const { userId, taskId, image } = req.body;

    const submission = new Submission({
      userId,
      taskId,
      image
    });

    await submission.save();

    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// APPROVE TASK
exports.approveTask = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    submission.status = "approved";
    await submission.save();

    const task = await Task.findById(submission.taskId);
    const user = await User.findById(submission.userId);

    user.ecoPoints += task.points;
    await user.save();

    res.json({ message: "Task approved & points added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
