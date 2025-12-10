import registration from "../controllers/registration.controller.js";
import express from "express";


const router = express.Router()


router.post("/api/registration", registration);




export default registration;

