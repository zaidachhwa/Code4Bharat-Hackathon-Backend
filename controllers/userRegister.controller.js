import User from "../Models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

const userRegister = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const userData = req.body.data;

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "No registration data provided",
      });
    }

    // Check if user already exists
    const emailExists = await User.findOne({ email: userData.email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const usernameExists = await User.findOne({ username: userData.username });
    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username is taken",
      });
    }

    // Save user
    const newUser = await User.create(userData);
    console.log("✔ User Stored In DB");

    // Send welcome email
    await sendEmail({
      to: userData.email,
      subject: "🎉 Welcome to Code4Bharat Hackathon!",
      html: `
        <h2>Hey ${userData.fullName} 👋</h2>
        <p>🎉 Thank you for registering for the <strong>Code4Bharat Hackathon</strong>!</p>
        <p>We’re excited to have you onboard — stay tuned for updates.</p>
        <br/>
        <p>🚀 Best Regards,<br>Team Code4Bharat</p>
      `,
    });

    console.log("📧 Welcome Email Sent!");

    return res.status(201).json({
      success: true,
      message: "User registered & email sent successfully",
      data: newUser,
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default userRegister;
