import Ambassador from "../Models/ambassador.model.js";
import bcrypt from "bcrypt";

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

    const parsedData = {
      ...req.body,
      skills: safeParse(req.body.skills),
      responsibilities: safeParse(req.body.responsibilities),
      profilePhoto: req.files?.profilePhoto?.[0]
        ? req.files.profilePhoto[0].path.replace(/\\/g, "/")
        : null,

      studentIdCard: req.files?.studentIdCard?.[0]
        ? req.files.studentIdCard[0].path.replace(/\\/g, "/")
        : null,

      agreement: req.body.agreement === "true" || req.body.agreement === true,
    };

    console.log("📌 FINAL DATA FOR DB:", parsedData);

    // Check duplicate email
    const existingUser = await Ambassador.findOne({ email: parsedData.email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 👇 HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(parsedData.password, salt);
    parsedData.password = hashedPassword;

    // Save to DB
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
