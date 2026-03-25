const express = require("express");
const router = express.Router();

// Import controller
const authController = require("../controllers/authController");

// Import middleware
const { protect } = require("../middleware/authMiddleware");

// ROUTES
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.getMe);
router.get("/leaderboard", authController.getLeaderboard);

module.exports = router;
