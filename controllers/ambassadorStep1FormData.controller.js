import jwt from "jsonwebtoken";
import ambassador from "../Models/task.model.js";



const ambassadorStep1FormData = async(req, res) => {
  try {
    console.log("📩 STEP 1 DATA RECEIVED");

    // 1️⃣ Get token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token found"
      });
    }

    // 2️⃣ Decode jwt token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const ambassadorId = decoded.ambassadorId; // secure source

    // 3️⃣ Extract form data
    const { day1Confirmed } = req.body;

    console.log("Body:", req.body);
    console.log("Files:", req.files);
    console.log("Decoded AmbassadorId:", ambassadorId);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded"
      });
    }

    // 4️⃣ Response (later will insert DB)




    return res.status(200).json({
      success: true,
      message: "Step 1 proof uploaded successfully",
      data: {
        ambassadorId,
        day1Confirmed,
        uploadedFiles: req.files.map(f => f.filename)
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

export default ambassadorStep1FormData;
