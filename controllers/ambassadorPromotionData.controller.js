import jwt from "jsonwebtoken";
import AmbassadorTaskModel from "../Models/task.model.js";

const getPromotionData = async (req, res) => {
  try {
    console.log("📌 Get Promotion Data Controller Running...");

    // 1 Check Token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token Missing",
      });
    }

    // 2️ Verify & Decode Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const ambassadorId = decoded.ambassadorId;

    // 3️⃣ Find Task in DB
    const task = await AmbassadorTaskModel.findOne({ ambassadorId });

    // 4️⃣ If No Task Exists
    if (!task) {
      return res.status(200).json({
        success: true,
        message: "No task found yet. Showing default structure.",
        data: {
          ambassadorId,
          promotion: {
            screenshots: { day1: [], day2: [] },
            day1Confirmed: false,
            day2Confirmed: false,
            submittedAt: null,
            status: "not-submitted",
            assignedContent: "",
            assignedImages: [],
            adminRemarks: "",
          },
          currentStep: 1,
        },
      });
    }

    // 5️⃣ Send DB Data to Frontend
    return res.status(200).json({
      success: true,
      message: "Promotion Data Fetched Successfully",
      data: {
        ambassadorId,
        promotion: task.promotion,
        currentStep: task.currentStep,
      },
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching data",
    });
  }
};

export default getPromotionData;
