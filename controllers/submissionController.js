const Submission = require("../models/Submission");
const Task = require("../models/Task");
const User = require("../models/User");

// SUBMIT TASK
exports.submitTask = async (req, res) => {
  try {
    const { taskId, image } = req.body;

    const submission = new Submission({
      userId: req.user.id, // from auth middleware
      taskId,
      image
    });

    await submission.save();

    res.status(201).json({
      message: "Task submitted for review",
      submission
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// APPROVE TASK (Teacher/Admin)
exports.approveTask = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.status = "approved";
    await submission.save();

    // Get task + user
    const task = await Task.findById(submission.taskId);
    const user = await User.findById(submission.userId);

    // Add eco points
    user.ecoPoints += task.points;
    await user.save();

    res.json({
      message: "Task approved & points added"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER SUBMISSIONS
exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id })
      .populate("taskId");

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
