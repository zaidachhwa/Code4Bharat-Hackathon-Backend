import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";

const ambassadorGetSeminarData = async (req, res) => {
  try {
    console.log("📌 Fetching Seminar Step Data...");

    // 1️⃣ Check token in cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized — Token missing",
      });
    }

    // 2️⃣ Validate & decode token
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
        message: "Invalid token payload — ambassadorId missing",
      });
    }

    // 3️⃣ Get Ambassador Task + Populate full ambassador profile
    const task = await ambassadorTask
      .findOne({ ambassadorId })
      .populate("ambassadorId", "fullName email phone collegeName profileImage");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No seminar record found",
      });
    }

    // 4️⃣ Send response
    return res.status(200).json({
      success: true,
      message: "Seminar Data Fetched Successfully",
      ambassadorId,
      ambassador: task.ambassadorId, // populated ambassador user
      data: {
        seminar: task.seminar,
        currentStep: task.currentStep,
        isFullyCompleted: task.isFullyCompleted,
      },
    });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching seminar data",
    });
  }
};

export default ambassadorGetSeminarData;
