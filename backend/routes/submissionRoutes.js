const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const {
  submitTask,
  updateSubmission,
  getMySubmissions,
  getAllSubmissions
} = require("../controllers/submissionController");

// USER
router.post("/", protect, submitTask);
router.put("/edit/:id", protect, updateSubmission);
router.get("/my", protect, getMySubmissions);
router.get("/", protect, getAllSubmissions);

module.exports = router;
