import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";

const ambassadorCreatedTime = async (req, res) => {
  console.log("📌 Fetching Seminar Created Time...");

  try {
    // 1️⃣ Check token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized — No token found",
      });
    }

    // 2️⃣ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ambassadorId = decoded.ambassadorId;

    // 3️⃣ Fetch Task data
    const task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task record not found",
      });
    }

    // 4️⃣ Extract seminar submit time (fallback if null)
    const seminarCreatedTime = task.seminar?.submittedAt || task.createdAt;

    return res.status(200).json({
      success: true,
      message: "Seminar creation time fetched",
      createdTime: seminarCreatedTime,
    });

  } catch (error) {
    console.error("❌ Error fetching creation time:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching creation time",
    });
  }
};

export default ambassadorCreatedTime;
