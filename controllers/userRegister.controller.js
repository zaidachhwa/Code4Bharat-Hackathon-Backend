import User from "../Models/user.model.js";
import sendEmail from "../utils/sendEmail.js";
import axios from "axios";

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

    const { email, username, couponCode, fullName, phone } = userData;

    // 1️⃣ Check duplicates
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    if (await User.findOne({ phone })) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already registered" });
    }


    if (await User.findOne({ username })) {
      return res
        .status(400)
        .json({ success: false, message: "Username is taken" });
    }

    // 2️⃣ Save user to MongoDB
    const newUser = await User.create({
      ...userData,
      couponCode: couponCode?.trim() || null,
    });

    console.log("✔ User stored in MongoDB");

    // ✅ SEND RESPONSE IMMEDIATELY
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });

    // ===============================
    // 🔻 BACKGROUND TASKS (NON-BLOCKING)
    // ===============================

    // 3️⃣ Send user to Fermion
    axios
      .post(
        `${process.env.FERMION_API_URL}/api/public/create-new-user`,
        {
          data: [
            {
              data: {
                userId: newUser._id.toString(),
                profileDefaults: {
                  name: fullName || username,
                  username,
                  email,
                  password: userData.password,
                  phoneNumber: phone || undefined,
                },
                shouldSendWelcomeEmail: true,
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "FERMION-API-KEY": process.env.FERMION_API_KEY,
          },
        }
      )
      .then(() => console.log("✔ Fermion user created"))
      .catch((err) =>
        console.error("❌ Fermion error:", err.response?.data || err.message)
      );

    // 4️⃣ Send welcome email (NO await)
    sendEmail({
      to: email,
      subject: "🎉 Welcome to Code4Bharat Hackathon!",
      html: `
        <h2>Hey ${fullName} 🥰🤩</h2>
        <p>Thank you for registering for Code4Bharat Hackathon.</p>
      `,
    }).catch((err) => console.error("❌ Email Error:", err));

    return; // ⛔ stop execution

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default userRegister;
