const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeadlineSchema = new Schema({
  type: { type: String },
  description: { type: String },
  deadline: { type: Date, required: true },
  program_id: { type: mongoose.Types.ObjectId, ref: "Program" },
  creationDate: { type: Date, defualt: Date.now },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Deadline", DeadlineSchema);
