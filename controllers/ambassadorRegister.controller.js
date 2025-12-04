import Ambassador from "../Models/ambassador.model.js";  // <-- Make sure path is correct

const ambassadorRegister = async (req, res) => {
  try {
    console.log("📦 FORM DATA:", req.body);
    console.log("📁 UPLOADED FILES:", req.files);

    // Parse arrays safely
    const safeParse = (val) => {
      try {
        return JSON.parse(val);
      } catch {
        return val ? [val] : [];
      }
    };

    // Prepare formatted data
    const parsedData = {
      ...req.body,
      skills: safeParse(req.body.skills),
      responsibilities: safeParse(req.body.responsibilities),

      // Files
      profilePhoto: req.files?.profilePhoto?.[0]?.filename || null,
      studentIdCard: req.files?.studentIdCard?.[0]?.filename || null,

      // Convert string "true" to boolean
      agreement: req.body.agreement === "true" || req.body.agreement === true,
    };

    console.log("📌 FINAL DATA FOR DB:", parsedData);

    // Check if email already exists (optional but recommended)
    const existingUser = await Ambassador.findOne({ email: parsedData.email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Save into MongoDB
    const newUser = await Ambassador.create(parsedData);

    return res.status(201).json({
      success: true,
      message: "Ambassador registered successfully",
      data: newUser,
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default ambassadorRegister;
