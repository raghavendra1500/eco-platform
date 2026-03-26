const Submission = require("../models/Submission");
const cloudinary = require("../config/cloudinary");

// ✅ SUBMIT TASK (ONLY ONCE)
exports.submitTask = async (req, res) => {
  try {
    const { taskId, image } = req.body;

    // 1. Validate input
    if (!taskId || !image) {
      return res.status(400).json({ message: "Task ID and image required" });
    }

    // 2. Prevent duplicate submission
    const existing = await Submission.findOne({
      user: req.user.id,
      task: taskId
    });

    if (existing) {
      return res.status(400).json({
        message: "You already submitted this task"
      });
    }

    // 3. Upload image
    const upload = await cloudinary.uploader.upload(image, {
      folder: "eco-platform"
    });

    // 4. Save submission
    const submission = await Submission.create({
      user: req.user.id,
      task: taskId,
      proof: upload.secure_url,
      status: "pending"
    });

    res.json(submission);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Submission failed" });
  }
};

// ✅ EDIT SUBMISSION (ONLY IF NOT APPROVED)
exports.updateSubmission = async (req, res) => {
  try {
    const { image } = req.body;

    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // ❌ Do not allow edit after approval
    if (submission.status === "approved") {
      return res.status(400).json({
        message: "Cannot edit approved submission"
      });
    }

    // Upload new image
    const upload = await cloudinary.uploader.upload(image, {
      folder: "eco-platform"
    });

    submission.proof = upload.secure_url;
    submission.status = "pending"; // reset status
    await submission.save();

    res.json(submission);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET USER SUBMISSIONS (IMPORTANT)
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user.id })
      .populate("task"); // 🔥 CRITICAL

    res.json(submissions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
