const Submission = require("../models/Submission");
const Task = require("../models/Task");
const User = require("../models/User");

// task submission
exports.createSubmission = async (req, res) => {
  const { taskId, image } = req.body;

  const task = await Task.findById(taskId);
  const user = await User.findById(req.user.id);

  const submission = new Submission({
    user: req.user.id,
    task: taskId,
    image
  });

  await submission.save();

  // ADD POINTS 🔥
  user.ecoPoints += task.points;
  await user.save();

  res.status(201).json({ message: "Task submitted" });
};

//submit task
exports.submitTask = async (req, res) => {
  try {
    // logic here
    res.json({ message: "Task submitted" });
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
