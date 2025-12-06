import mongoose from "mongoose";

const ambassadorTaskSchema = new mongoose.Schema(
  {
    ambassadorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ambassador",
      required: true,
      unique: true, // 1 task flow per ambassador
    },

    /** ----------------------- STEP 1: PROMOTION ------------------------ **/
    promotion: {
      assignedContent: { type: String, default: "" }, // admin assigned text/post
      screenshots: [{ type: String }], // uploaded images
      day1Confirmed: { type: Boolean, default: false },
      day2Confirmed: { type: Boolean, default: false },
      submittedAt: { type: Date, default: null },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "not-submitted"],
        default: "not-submitted",
      },
      adminRemarks: { type: String, default: "" },
    },

    /** ----------------------- STEP 2: SEMINAR ------------------------- **/
    seminar: {
      college: { type: String, default: "" },
      seminarTitle: { type: String, default: "" },
      seminarDate: { type: Date, default: null },
      participants: { type: Number, default: 0 },
      uploadedProof: [{ type: String }], // images/pdf
      submittedAt: { type: Date, default: null },
      status: {
        type: String,
        enum: ["locked", "pending", "approved", "rejected", "not-submitted"],
        default: "locked", // locked until Step 1 approved
      },
      adminRemarks: { type: String, default: "" },

      // auto generated only after approval
      couponCode: { type: String, default: null },
      couponGeneratedAt: { type: Date, default: null },
      couponUsageCount: { type: Number, default: 0 },
    },

    /** ----------------------- STEP 3: ONBOARDING ----------------------- **/
    onboarding: {
      status: {
        type: String,
        enum: ["locked", "in-progress", "completed"],
        default: "locked",
      },
      completedAt: { type: Date, default: null },
      certificateIssued: { type: Boolean, default: false },
    },

    /** ----------------------- GLOBAL PROGRESS ------------------------- **/
    currentStep: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },

    isFullyCompleted: {
      type: Boolean,
      default: false,
    },

    // For admin tracking
    reviewedBy: { type: String, default: null },
  },

  { timestamps: true }
);

export default mongoose.model("ambassadorTask", ambassadorTaskSchema);
