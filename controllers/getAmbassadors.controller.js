import express from "express";
import AmbassadorModel from "../Models/ambassador.model.js";
import mongoose from "mongoose";





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



export default getAmbassadors;