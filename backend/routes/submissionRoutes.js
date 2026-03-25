const express = require("express");
const router = express.Router();

const { submitTask } = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, submitTask);

module.exports = router;
