import jwt from "jsonwebtoken";
import ambassadorTask from "../Models/task.model.js";

const ambassadorStep1Day1Data = async (req, res) => {
  try {
    
    // 1️⃣ Token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token found" });
    }

    // 2️⃣ Decode Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const ambassadorId = decoded.ambassadorId;

    // 3️⃣ Body + Files validation
    const { day1Confirmed } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded"
      });
    }

    const uploadedImages = req.files.map(f => f.filename);

    // 4️⃣ Check if Task Exists
    let task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      console.log("🆕 No record found — creating new task");

      task = new ambassadorTask({
        ambassadorId,
        promotion: {
          screenshots: { day1: uploadedImages, day2: [] },
          day1Confirmed: day1Confirmed || false,
          submittedAt: new Date(),
          status: "pending"
        },
        currentStep: 1
      });

      await task.save();
    } else {
      console.log("♻ Updating existing task");

      // push images instead of replacing
      const existingImages = task.promotion?.screenshots?.day1 || [];
      const updatedImages = [...existingImages, ...uploadedImages];

      task.promotion.screenshots.day1 = updatedImages;
      task.promotion.day1Confirmed = Boolean(day1Confirmed);
      task.promotion.submittedAt = new Date();
      task.promotion.status = "pending"; // admin will review

      // Save update
      await task.save();
    }

    return res.status(200).json({
      success: true,
      message: "Step 1 proof uploaded successfully",
      data: {
        ambassadorId,
        day1Confirmed,
        uploadedFiles: uploadedImages
      }
    });

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while uploading"
    });
  }
};


// GET IMAGES FOR A PARTICULAR AMBASSADOR (ADMIN)

const admin = async (req, res) => {
  try {
    const { ambassadorId } = req.params;

    const task = await ambassadorTask.findOne({ ambassadorId })
      .select("ambassadorId promotion")
      .populate("ambassadorId", "fullName email");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No uploads found for this ambassador",
      });
    }

    return res.status(200).json({
      // success: true,
      data: task.promotion.screenshots.day1,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export default {ambassadorStep1Day1Data, admin};
