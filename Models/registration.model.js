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
      enum: ["DSA", "Web Development", "MySQL"],
    },

    // ⭐ NOT REQUIRED ANYMORE
    github: {
      type: String,
      trim: true,
      default: "",
    },

    // ⭐ NOT REQUIRED ANYMORE
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },

    // ⭐ Already optional
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
