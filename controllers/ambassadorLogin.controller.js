import express from "express"
import Ambassador from "../Models/ambassador.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();



const ambassadorLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log("login credential of ambassador:", email, password);

    try {
        const ambassador = await Ambassador.findOne({ email });
        if (ambassador) {

            console.log("Ambassador found:", ambassador._id, ambassador.email);

            // Compare password
            const match = await bcrypt.compare(password, ambassador.password);
            if (!match) {
                return res.status(400).json({ message: "Check your email or password!" });
            }

            if (match) {
                // Generate JWT token
                const token = jwt.sign({ ambassadorId: ambassador._id, ambassadorEmail: ambassador.email }, process.env.JWT_SECRET);

                res.cookie("token", token, {
                    httpOnly: true,      // not accessible by JS
                    secure: false,       // set true if using HTTPS
                    sameSite: 'lax',      // allows cross-origin on localhost
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

            }


            res.status(200).json({
                success: true,
                message: "Ambassador logged in successfully",
                ambassador,
            });
        }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }



}




export default ambassadorLogin;