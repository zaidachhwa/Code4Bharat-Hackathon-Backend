import Ambassador from "../Models/ambassador.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const ambassadorLogin = async (req, res) => {
  const { email, password } = req.body;

  const domain = process.env.DOMAIN;

  console.log("===== Ambassador Login Request =====");
  console.log("Request body:", req.body);

  try {
    // 1️⃣ Check email exists
    const ambassador = await Ambassador.findOne({ email });

    console.log(ambassador)
    console.log("password from backend:",ambassador.password)
    if (!ambassador) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Ambassador found:", ambassador.email);

    console.log("Stored hashed password:", ambassador.password);
    // 2️⃣ Check if password exists in DB
    if (!ambassador.password) {
      return res.status(500).json({
        success: false,
        message: "Account error: password missing. Please re-register.",
      });
    }

    // 3️⃣ Validate password
    const isMatch = await bcrypt.compare(password, ambassador.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4️⃣ Check approval status
    if (!ambassador.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Your application is under review. Admin approval required.",
      });
    }
    

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      {
        ambassadorId: ambassador._id,
        ambassadorEmail: ambassador.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ Store cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // true in production
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
