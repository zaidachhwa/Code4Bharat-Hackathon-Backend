import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";
import User from "../Models/user.model.js";

const ambassadorCouponCodeUser = async (req, res) => {
  try {
    console.log("📌 Fetching users registered via ambassador coupon...");

    // 1️⃣ Get token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized — No token found",
      });
    }

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const ambassadorId = decoded.ambassadorId;
    if (!ambassadorId) {
      return res.status(400).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // 3️⃣ Find OR Create ambassador task (SAFE UPSERT)
    let task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      try {
        task = await ambassadorTask.create({ ambassadorId });
      } catch (err) {
        // If another parallel request created it → fetch again
        task = await ambassadorTask.findOne({ ambassadorId });
      }
    }

    // 4️⃣ Get coupon from seminar
    const couponCode = task?.seminar?.couponCode;

    if (!couponCode) {
      return res.status(200).json({
        success: true,
        message: "No coupon code generated yet",
        couponCode: null,
        totalUsers: 0,
        users: [],
      });
    }

    // 5️⃣ Get all users who used the coupon
    const users = await User.find({ couponCode }).select(
      "fullName email phone college course year createdAt"
    );

    return res.status(200).json({
      success: true,
      couponCode,
      totalUsers: users.length,
      users,
      message:
        users.length > 0
          ? "Users who used your coupon code"
          : "No users have used your coupon code yet",
    });
  } catch (error) {
    console.error("❌ ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default ambassadorCouponCodeUser;
