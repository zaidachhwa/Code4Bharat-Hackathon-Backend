import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";

const ambassadorCurrentStep = async (req, res) => {
  console.log("📌 Ambassador Current Step Controller Running...");

  try {
    // 1️⃣ Check Token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized — No token found",
      });
    }

    // 2️⃣ Decode Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ambassadorId = decoded?.ambassadorId || decoded?.id;

    if (!ambassadorId) {
      return res.status(400).json({
        success: false,
        message: "Invalid token — Missing ambassadorId",
      });
    }

    // 3️⃣ Fetch Only Current Step From DB
    const task = await ambassadorTask.findOne(
      { ambassadorId }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task record not found",
      });
    }

    // 4️⃣ Respond With Step Number
    return res.status(200).json({
      success: true,
      message: "Current step fetched successfully",
      currentStep: task.currentStep,
    });

  } catch (error) {
    console.error("❌ Error fetching current step:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching current step",
    });
  }
};

export default ambassadorCurrentStep;
