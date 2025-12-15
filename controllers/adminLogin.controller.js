import jwt from "jsonwebtoken";

const adminLogin = (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials (as requested)
  if (email === "admin@gmail.com" && password === "password") {

    // 🔐 Create JWT for admin
    const adminToken = jwt.sign(
      {
        role: "admin",
        email: email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🍪 Store token in browser (different name from ambassador)
    res.cookie("adminToken", adminToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid admin credentials",
  });
};

export default adminLogin;
