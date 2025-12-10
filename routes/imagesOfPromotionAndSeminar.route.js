import express from "express";
import imagesOfPromotionAndSeminar from "../controllers/imagesOfPromotionAndSeminar.controller.js";


const router = express.Router();



router.get("/api/images/get/:ambassadorId", imagesOfPromotionAndSeminar);




export default router;