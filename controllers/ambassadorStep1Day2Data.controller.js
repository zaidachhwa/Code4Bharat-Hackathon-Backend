import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";

const ambassadorStep1Day2Data = async (req, res) => {
  try {

    // 1️⃣ Validate Login Token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token found",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const ambassadorId = decoded.ambassadorId;

    // 2️⃣ Extract Body Data
    const { day2Confirmed } = req.body;

    console.log("Body:", req.body);
    console.log("Files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const uploadedFiles = req.files.map((file) => file.filename);

    // 3️⃣ Find Existing Task
    let task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task record not found",
      });
    }

    // 4️⃣ Append Day-2 Screenshots (not replace)
    const existingDay2Files = task.promotion?.screenshots?.day2 || [];
    task.promotion.screenshots.day2 = [...existingDay2Files, ...uploadedFiles];

    // 5️⃣ Update Confirmation + Status
    task.promotion.day2Confirmed = Boolean(day2Confirmed);
    task.promotion.status = "pending"; // Admin review

    // 6️⃣ Mark Step-1 Completed & Unlock Step-2
    task.currentStep = 2;
    task.seminar.status = "pending";

    await task.save();

    console.log("📁 Day2 Updated in DB:", task.promotion);

    return res.status(200).json({
      success: true,
      message: "Day 2 proof submitted successfully",
      data: {
        ambassadorId,
        uploadedFiles,
        nextStep: "Step 2 (Seminar) unlocked",
      },
    });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving Day 2 data",
    });
  }
};

export default ambassadorStep1Day2Data;
