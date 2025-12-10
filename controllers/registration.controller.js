import registrationModel from "../Models/registration.model.js";

const registration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      collegeYear,
      domain,
      github,
      linkedin,
      socialPresence,
    } = req.body;

    // 1️⃣ Basic manual validation (optional – frontend already validates)
    if (
      !fullName ||
      !email ||
      !phone ||
      !collegeYear ||
      !domain ||
      !github ||
      !linkedin
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    // 2️⃣ Optional: Check duplicate registration
    const existing = await registrationModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "User already registered with this email.",
      });
    }

    // 3️⃣ Create new registration
    const newEntry = await registrationModel.create({
      fullName,
      email,
      phone,
      collegeYear,
      domain,
      github,
      linkedin,
      socialPresence,
    });

    // 4️⃣ Respond to frontend
    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: newEntry,
    });
  } catch (error) {
    console.error("❌ Error saving registration:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting registration.",
    });
  }
};

export default registration;
