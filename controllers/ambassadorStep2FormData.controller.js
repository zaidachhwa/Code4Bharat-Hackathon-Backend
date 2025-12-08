import ambassadorTask from "../Models/task.model.js";
import jwt from "jsonwebtoken";

const ambassadorStep2FormData = async (req, res) => {
  console.log("📌 Step 2 Form Data Controller Running...");
  console.log("Body:", req.body);
  console.log("Files:", req.files);

  try {
    // 1️⃣ Get and verify JWT from cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized — No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ⛔ FIXED: correct field from JWT
    const ambassadorId = decoded.ambassadorId;

    // 2️⃣ Find user in Task DB
    let task = await ambassadorTask.findOne({ ambassadorId });

    if (!task) {
      task = await ambassadorTask.create({ ambassadorId });
    }

    // 3️⃣ Extract form fields
    const { college, seminarTitle, seminarDate, participants, couponCode } = req.body;

    // 4️⃣ Uploaded file paths
    const filePaths = req.files?.map((file) => file.path) || [];

    // 5️⃣ Update seminar data
    task.seminar = {
      ...task.seminar,
      college,
      seminarTitle,
      seminarDate: seminarDate ? new Date(seminarDate) : null, // ⛔ FIXED
      participants,
      couponCode,
      uploadedProof: [...(task.seminar?.uploadedProof || []), ...filePaths],
      submittedAt: new Date(),
      status: "pending", // ⛔ FIXED
    };

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Step 2 data stored successfully",
      data: task.seminar,
    });

  } catch (error) {
    console.error("❌ Error saving Step 2 data:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while storing Step 2 data",
    });
  }
};

export default ambassadorStep2FormData;
