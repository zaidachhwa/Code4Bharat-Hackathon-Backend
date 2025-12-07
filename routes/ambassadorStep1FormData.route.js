import express from "express";
import upload from "../middlewares/upload.js";
import ambassadorStep1FormData from "../controllers/ambassadorStep1FormData.controller.js";
import getPromotionData from "../controllers/ambassadorPromotionData.controller.js";


const router = express.Router();

// Upload up to 10 images for Day 1
router.post(
  "/api/step1/day1/uploads",
  upload.array("day1Screenshots", 10),
  ambassadorStep1FormData
);


router.post(
  "/api/step1/day2/uploads",
  upload.array("screenshots", 10),
  ambassadorStep1FormData
);


router.get("/api/step1/get-promotion-data",getPromotionData)

export default router;
