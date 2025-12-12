import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";

const ambassadorCurrentStep = async (req, res) => {
  console.log("📌 Ambassador Current Step Controller Running...");

  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized — No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ambassadorId = decoded?.ambassadorId;

    if (!ambassadorId) {
      return res.status(400).json({
        success: false,
        message: "Invalid token — Missing ambassadorId",
      });
    }

    // Check existing task
    let task = await ambassadorTask.findOne({ ambassadorId });

    // Create task if not exist
    if (!task) {
      task = await ambassadorTask.create({
        ambassadorId,
        currentStep: 1,
      });
    }

    return res.status(200).json({
      success: true,
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
