import fs from "fs";
import path from "path";


export const getFallbackRegistration = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "fallback_registration.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(rawData);

    res.status(200).json({
      success: true,
      data: json,
    });
  } catch (err) {
    console.error("fallback read error:", err.message);
    res.status(500).json({
      success: false,
      message: "Unable to load fallback registration",
      error: err.message,
    });
  }
};






export default getFallbackRegistration
