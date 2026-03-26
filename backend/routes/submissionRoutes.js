const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  submitTask,
  updateSubmission,
  getMySubmissions
} = require("../controllers/submissionController");

// USER
router.post("/", protect, submitTask);
router.put("/edit/:id", protect, updateSubmission);
router.get("/my", protect, getMySubmissions);

module.exports = router;
