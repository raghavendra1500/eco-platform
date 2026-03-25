const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { register, login, getMe, getLeaderboard } = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/leaderboard", authController.getLeaderboard);
router.get("/leaderboard/school", authController.getSchoolLeaderboard);
router.get("/me", protect, getMe);


module.exports = router;
