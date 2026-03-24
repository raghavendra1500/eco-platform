const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// GET ALL TASKS
router.get("/", taskController.getTasks);

// CREATE TASK
router.post("/", taskController.createTask);

module.exports = router;
