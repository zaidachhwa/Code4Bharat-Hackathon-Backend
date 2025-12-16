import mongoose from "mongoose";

const adminImageSchema = new mongoose.Schema({
  images: [
    {
      type: String, // e.g. "uploads/admin/promotion/banner1.png"
      required: true,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AdminImages", adminImageSchema);
