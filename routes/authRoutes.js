const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// DEBUG (REMOVE LATER)
console.log("Controller:", authController);
console.log("Middleware:", authMiddleware);

// ROUTES
router.post("/register", authController.register);
router.post("/login", authController.login);

// ⚠️ IMPORTANT: use correct middleware reference
router.get("/me", authMiddleware.protect, authController.getMe);

// ⚠️ IMPORTANT: this must exist
router.get("/leaderboard", authController.getLeaderboard);

module.exports = router;
