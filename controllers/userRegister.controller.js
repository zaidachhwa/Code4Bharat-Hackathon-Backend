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

    const { email, username, couponCode } = userData;

    // Check if user email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Check if username exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username is taken",
      });
    }

    // If coupon code is empty, set null
    const cleanedData = {
      ...userData,
      couponCode: couponCode && couponCode.trim() !== "" ? couponCode.trim() : null,
    };

    // Save user to MongoDB
    const newUser = await User.create(cleanedData);
    console.log("✔ User stored successfully");

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: "🎉 Welcome to Code4Bharat Hackathon!",
      html: `
        <h2>Hey ${userData.fullName} 👋</h2>
        <p>🎉 Thank you for registering for <strong>Code4Bharat Hackathon</strong>!</p>
        
        ${
          cleanedData.couponCode
            ? `<p>🎁 You used a referral code: <strong>${cleanedData.couponCode}</strong></p>`
            : ""
        }

        <p>We’ll share updates soon — stay tuned!</p>
        <br/>
        <p>🚀 Regards,<br>Team Code4Bharat</p>
      `,
    });

    console.log("📧 Welcome Email Sent");

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default userRegister;
