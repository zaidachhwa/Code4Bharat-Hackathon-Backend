import fs from "fs";
import path from "path";
import { Registration } from "../Models/registration.model.js";

// Path for fallback JSON file
const fallbackFile = path.join(process.cwd(), "fallback_registrations.json");

// Function that ALWAYS logs registration into JSON file
const saveToFallback = (data) => {
  try {
    let fileData = [];

    // Read existing file if available
    if (fs.existsSync(fallbackFile)) {
      const raw = fs.readFileSync(fallbackFile, "utf-8");
      fileData = raw ? JSON.parse(raw) : [];
    }

    // Append new record
    fileData.push({
      ...data,
      savedAt: new Date(),
    });

    // Write file back
    fs.writeFileSync(fallbackFile, JSON.stringify(fileData, null, 2));

    console.log("📁 Registration saved to fallback JSON file.");
  } catch (error) {
    console.error("❌ Error writing fallback JSON:", error);
  }
};

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

    // Basic validation
    if (!fullName || !email || !phone || !collegeYear || !domain) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // ALWAYS SAVE TO JSON FIRST (backup)
    saveToFallback(req.body);

    // Check duplicate in MongoDB
    let existing;
    try {
      existing = await Registration.findOne({ email });
    } catch (err) {
      console.error("⚠ MongoDB lookup failed — but JSON backup is saved.");
      return res.status(201).json({
        success: true,
        fallbackOnly: true,
        message:
          "Registration saved in JSON backup (MongoDB temporarily unavailable).",
      });
    }

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    // Try saving in MongoDB
    try {
      const newEntry = await Registration.create({
        fullName,
        email,
        phone,
        collegeYear,
        domain,
        github,
        linkedin,
        socialPresence,
      });

      return res.status(201).json({
        success: true,
        message: "Registration successful!",
        savedIn: "MongoDB + JSON",
        data: newEntry,
      });
    } catch (err) {
      console.error("⚠ MongoDB save failed — JSON backup already created.");
      return res.status(201).json({
        success: true,
        fallbackOnly: true,
        message:
          "Registration saved in JSON backup (MongoDB temporarily unavailable).",
      });
    }
  } catch (error) {
    console.error("❌ Unexpected server error:", error);

    return res.status(500).json({
      success: false,
      message: "Unexpected server error occurred.",
    });
  }
};

export default registration;
