import ambassadorTask from "../Models/task.model.js";
import User from "../Models/user.model.js";

const ambassadorCouponCodeUsers = async (req, res) => {
  try {
    console.log("📩 Fetching users registered using ambassador coupon code...");

    const {ambassador} = req.params;

    console.log("Ambassador ID from params:", ambassador);

    const ambassadorId = ambassador;

    

    // 2️⃣ Find ambassador task record
    const task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No ambassador task record found",
      });
    }

    // 3️⃣ Get Ambassador's Coupon Code
    const couponCode = task?.seminar?.couponCode;

    if (!couponCode) {
      return res.status(200).json({
        success: true,
        message: "No coupon code generated yet.",
        users: [],
        couponCode: null,
      });
    }

    // 4️⃣ Find users who used this coupon
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
          ? "Users who registered using your coupon code."
          : "No users registered using your coupon code yet.",
    });

  } catch (error) {
    console.error("❌ ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default ambassadorCouponCodeUsers;
