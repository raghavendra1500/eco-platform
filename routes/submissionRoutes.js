const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const authMiddleware = require("../middleware/authMiddleware");

// SUBMIT TASK (protected)
router.post("/", authMiddleware, submissionController.submitTask);

// APPROVE TASK
router.put("/:id", submissionController.approveTask);

// GET USER SUBMISSIONS
router.get("/my", authMiddleware, submissionController.getUserSubmissions);

module.exports = router;
