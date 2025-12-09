import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    address: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th"],
    },
    domain: {
      type: String,
    },
    skills: {
      type: String,
    },
    couponCode: {   // ✅ Added
  type: String,
  default: null,
  },
    agreeTerms: {
      type: Boolean,
      required: true,
    },
    confirmInfo: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
