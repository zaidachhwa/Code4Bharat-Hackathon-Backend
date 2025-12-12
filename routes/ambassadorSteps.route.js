import express from "express";
import ambassadorSteps from "../controllers/ambassadorSteps.controller.js";



const router = express.Router();



router.get("/api/ambassador/steps", ambassadorSteps);





export default router;