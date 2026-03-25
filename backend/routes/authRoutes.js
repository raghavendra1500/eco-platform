const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getLeaderboard
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
