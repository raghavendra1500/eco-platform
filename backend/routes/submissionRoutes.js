const express = require("express");
const router = express.Router();

const {
  submitTask,
  getAllSubmissions,
  approveSubmission,
  rejectSubmission
} = require("../controllers/submissionController");

const { protect } = require("../middleware/authMiddleware");

// USER
router.post("/", protect, submitTask);

// ADMIN
router.get("/", getAllSubmissions);
router.put("/approve/:id", approveSubmission);
router.put("/reject/:id", rejectSubmission);

module.exports = router;
