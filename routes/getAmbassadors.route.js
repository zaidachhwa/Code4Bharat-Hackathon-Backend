import express from "express";
import getAmbassadors from "../controllers/getAmbassadors.controller.js";


const router = express.Router();


router.get("/api/ambassadors/data/get",getAmbassadors );



export default router;