import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      enum: ["small", "medium", "major"],
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 0,
    },
    // Which ambassador this task is assigned to
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ambassador", // name of your ambassador model
      required: true,
    },
    // false = pending, true = completed
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);
export default Task;
