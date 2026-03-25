const Submission = require("../models/Submission");
const User = require("../models/User");
const Task = require("../models/Task");

// USER SUBMIT
exports.submitTask = async (req, res) => {
  const { taskId, proof } = req.body;

  const submission = await Submission.create({
    user: req.user.id,
    task: taskId,
    proof
  });

  res.json(submission);
};

// ADMIN: GET ALL SUBMISSIONS
exports.getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find()
    .populate("user", "name")
    .populate("task", "title points");

  res.json(submissions);
};

// ADMIN: APPROVE
exports.approveSubmission = async (req, res) => {
  const submission = await Submission.findById(req.params.id)
    .populate("task");

  if (!submission) return res.status(404).json({ message: "Not found" });

  submission.status = "approved";
  await submission.save();

  // ADD POINTS
  await User.findByIdAndUpdate(submission.user, {
    $inc: { ecoPoints: submission.task.points }
  });

  res.json({ message: "Approved & points added" });
};

// ADMIN: REJECT
exports.rejectSubmission = async (req, res) => {
  const submission = await Submission.findById(req.params.id);

  submission.status = "rejected";
  await submission.save();

  res.json({ message: "Rejected" });
};
