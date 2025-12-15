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

const adminAuth = (req, res) => {
  console.log("reached at adminAuth")
  const adminToken = req.cookies?.adminToken;

  // ❌ No admin token
  if (!adminToken) {
    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      message: "Admin token not found",
    });
  }

  try {
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    // Optional safety check
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        isAuthenticated: false,
        message: "Not an admin token",
      });
    }

    // ✔ Admin authenticated
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      admin: {
        email: decoded.email,
        role: decoded.role,
      },
    });

  } catch (err) {
    return res.status(401).json({
      success: false,
      isAuthenticated: false,
      message: "Invalid or expired admin token",
    });
  }
};

export {adminAuth,jwtAuth};
