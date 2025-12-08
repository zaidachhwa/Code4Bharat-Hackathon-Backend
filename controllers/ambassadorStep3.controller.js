import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";

const ambassadorStep3 = async (req, res) => {
  console.log("📩 STEP 3 DATA REQUEST RECEIVED");

  try {
    // 1️⃣ Get token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized — No token provided",
      });
    }

    // 2️⃣ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🛠 FIX → Ensure correct field (your JWT stores ambassadorId)
    const ambassadorId = decoded.ambassadorId;

    if (!ambassadorId) {
      return res.status(400).json({
        success: false,
        message: "Invalid token — ambassador ID missing",
      });
    }

    // 3️⃣ Fetch Task record linked to ambassador
    const task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Ambassador task record not found",
      });
    }

    // 4️⃣ Extract seminar coupon code
    const couponCode = task.seminar?.couponCode || null;

    return res.status(200).json({
      success: true,
      message: "Step 3 data retrieved successfully",
      data: {
        ambassadorId,
        couponCode,
        seminarDetails: task.seminar || {},
        currentStep: task.currentStep,
      },
    });

  } catch (error) {
    console.error("❌ STEP 3 controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in Step 3",
    });
  }
};

export default ambassadorStep3;
