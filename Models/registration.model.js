import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },

    collegeYear: {
      type: String,
      required: true,
      trim: true,
    },

    domain: {
      type: String,
      required: true,
      enum: ["DSA", "Web Development", "MySQL"], // Same as your dropdown
    },

    github: {
      type: String,
      required: true,
      trim: true,
    },

    linkedin: {
      type: String,
      required: true,
      trim: true,
    },

    socialPresence: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
