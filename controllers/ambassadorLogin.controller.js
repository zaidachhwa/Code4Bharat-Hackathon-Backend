import Ambassador from "../Models/ambassador.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const ambassadorLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log("===== Ambassador Login Request =====");
  console.log("Request body:", req.body);

  try {
    // 1️⃣ Find ambassador
    const ambassador = await Ambassador.findOne({ email });

    // ❗ FIX 1: If ambassador is null → return before accessing ambassador.password
    if (!ambassador) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Safe to log now (ambassador exists)
    console.log("Ambassador found:", ambassador.email);

    // ❗ FIX 2: Some DB users have password = null → handle safely
    if (!ambassador.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Stored hashed password:", ambassador.password);

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, ambassador.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Check approval
    if (!ambassador.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Your application is under review. Admin approval required.",
      });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      {
        ambassadorId: ambassador._id,
        ambassadorEmail: ambassador.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Login successful");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ambassador,
      token,
    });

  } catch (error) {
    console.log("===== Error in Ambassador Login =====");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default ambassadorLogin;
