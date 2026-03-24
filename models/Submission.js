const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },
  image: String,
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Submission", submissionSchema);
