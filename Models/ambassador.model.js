import mongoose from "mongoose";

const CampusAmbassadorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    college: { type: String, required: true },
    courseYear: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "prefer-not-to-say"], required: true },
    password: { type: String, required: true,  },

    // Social Presence
    instagram: { type: String, required: true },
    linkedin: { type: String, default: "" },
    instagramFollowers: { type: String, required: true },
    postActivity: { type: String, required: true },

    // Experience
    motivation: { type: String, required: true },
    previousExperience: { type: String, enum: ["yes", "no"], required: true },
    experienceDescription: { type: String },

    // Arrays
    skills: { type: [String], required: true },
    responsibilities: { type: [String], required: true },

    // Commitment
    hoursPerWeek: { type: String, required: true },
    availability: { type: String, required: true },

    // File Uploads (Store URL or file name if using Cloudinary later)
    studentIdCard: { type: String, default: null },
    profilePhoto: { type: String, default: null },

    additionalInfo: { type: String, default: "" },

    agreement: { type: Boolean, required: true },


    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev
export default mongoose.models.CampusAmbassador ||
  mongoose.model("ambassador", CampusAmbassadorSchema);
