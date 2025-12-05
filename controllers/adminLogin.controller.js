import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




const adminLogin = (req, res) => {
    const { email, password } = req.body;

    if(email === "test@gmail.com" && password === "test@gmail.com"){
        return res.status(200).json({
            success: true,
            message: "Admin logged in successfully",
        });
    }else{
        return res.status(401).json({
            success: false,
            message: "Invalid admin credentials",
        });
    }

    
}



export default adminLogin;