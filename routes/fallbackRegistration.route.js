import express from "express"
import  fallback_registration  from "../controllers/fallbackRegistration.controller.js";


const router = express.Router();



router.get("/fallback-registration",fallback_registration)



export default router