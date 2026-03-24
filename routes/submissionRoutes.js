const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

router.post("/", submissionController.submitTask);
router.put("/:id", submissionController.approveTask);

module.exports = router;
