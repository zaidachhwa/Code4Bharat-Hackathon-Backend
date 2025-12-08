import express from "express";
import AmbassadorModel from "../Models/ambassador.model.js";

const getAmbassadors = async(req,res) => {
    // res.send("Get Ambassadors Controller is working☑️");

    try {
        
        const ambassadors = await AmbassadorModel.find();
        if (!ambassadors) {
            return res.status(404).json({
                success: false,
                message: "No ambassadors found",
            });
        }else{
            return res.status(200).json({
                success: true,
                message: "Ambassadors fetched successfully",
                ambassadors,
            });
        }
        
    } catch (error) {
        console.log("❌ Server Error:", error);
    }
    
}

const getAmbassadorsById = async(req,res) => {
    // res.send("Get Ambassadors Controller is working☑️");

    try {
        // console.log(req.params.id);
        
        const ambassadors = await AmbassadorModel.findById(req.params.id);
        if (!ambassadors) {
            return res.status(404).json({
                success: false,
                message: "No ambassadors found",
            });
        }else{
            return res.status(200).json({
                success: true,
                message: "Ambassadors fetched successfully",
                ambassadors,
            });
        }
        
    } catch (error) {
        console.log("❌ Server Error:", error);
    }
    
}

const getApprove = async(req,res) => {
     try {
    const { id } = req.params;

    const updated = await AmbassadorModel.findByIdAndUpdate(
      id,
      { isApproved: true, rejected: false },
      { new: true }
    );

    res.json({
      success: true,
      message: "Ambassador approved",
      ambassador: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const sendPhotos = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    // Create URLs
    const fileUrls = files.map((file) => `/uploads/photos/${file.filename}`);

    // Save URLs in database for all ambassadors
    await AmbassadorModel.updateMany({}, {
      $push: { photos: { $each: fileUrls } }
    });

    res.status(200).json({
      success: true,
      message: "Promotions sent to all ambassadors",
      files: fileUrls,
    });

  } catch (error) {
    console.error("Promotion Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default {getAmbassadors, getAmbassadorsById , getApprove, sendPhotos};