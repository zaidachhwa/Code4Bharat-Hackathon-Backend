import express from "express";
import upload from "../middlewares/upload.js";
import getPromotionData from "../controllers/ambassadorPromotionData.controller.js";
// import ambassadorStep1Day1Data from "../controllers/ambassadorStep1Day1Data.controller.js";
import ambassadorStep1Day2Data from "../controllers/ambassadorStep1Day2Data.controller.js";
import { ambassadorStep1Day1Data, admin } from "../controllers/ambassadorStep1Day1Data.controller.js";




const router = express.Router();

// Upload up to 10 images for Day 1
// router.post("/api/step1/day1/uploads", upload.array("day1Screenshots", 10), ambassadorStep1Day1Data.ambassadorStep1Day1Data);

// routes/admin.js
router.get("/uploads/:ambassadorId", admin);

router.post("/api/step1/day1/uploads", upload.array("day1Screenshots", 10), ambassadorStep1Day1Data );


router.post("/api/step1/day2/uploads", upload.array("screenshots", 10), ambassadorStep1Day2Data);


router.get("/api/step1/get-promotion-data",getPromotionData)





export default router;
