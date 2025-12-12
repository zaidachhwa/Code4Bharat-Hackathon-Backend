import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    collegeYear: { type: String, required: true },
    domain: { type: String, required: true },

    // Optional fields
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    socialPresence: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Registration = mongoose.model("Registration", registrationSchema);
