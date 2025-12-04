import User from "../Models/user.model.js";

const userRegister = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    // Extract real form data
    const userData = req.body.data;

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "No registration data provided",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Check username availability
    const existsUsername = await User.findOne({ username: userData.username });
    if (existsUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    // Save in DB
    const newUser = await User.create(userData);

    console.log("✔ User Saved:", newUser);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default userRegister;
