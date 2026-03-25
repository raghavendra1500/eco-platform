const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, school } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      school
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      ecoPoints: user.ecoPoints
    }
  });
};

// GET LEADERBOARD
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ ecoPoints: -1 }) // descending
      .select("-password");    // hide passwords

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SCHOOL LEADERBOARD
exports.getSchoolLeaderboard = async (req, res) => {
  try {
    const { school } = req.query;

    const users = await User.find({ school })
      .sort({ ecoPoints: -1 })
      .select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// dashboard for real data
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
