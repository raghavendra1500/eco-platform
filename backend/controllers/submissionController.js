const Submission = require("../models/Submission");

exports.submitTask = async (req, res) => {
  const { taskId, proof } = req.body;

  const submission = await Submission.create({
    user: req.user.id,
    task: taskId,
    proof
  });

  res.json(submission);
};
