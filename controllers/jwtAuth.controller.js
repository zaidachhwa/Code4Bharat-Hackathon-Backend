import jwt from "jsonwebtoken";

const jwtAuth = (req, res) => {
  const token = req.cookies?.token;

  // ❌ No token found
  if (!token) {
    return res.json({
      success: false,
      message: "No token found",
      isAuthenticated: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✔ Valid token
    return res.json({
      success: true,
      message: "Token verified",
      isAuthenticated: true,
      ambassadorId: decoded.ambassadorId,
    });

  } catch (err) {
    // ❌ Invalid / expired token
    return res.json({
      success: false,
      message: "Invalid token",
      isAuthenticated: false,
    });
  }
};

export default jwtAuth;
