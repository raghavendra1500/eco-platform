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
  image: String, // proof (URL later)
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
