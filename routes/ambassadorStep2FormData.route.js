import express from "express";
import upload from "../middlewares/upload.js";
import ambassadorStep2FormData from "../controllers/ambassadorStep2FormData.controller.js";
import ambassadorGetSeminarData from "../controllers/ambassadorGetSeminarData.controller.js";


const router = express.Router();



router.post("/api/seminar/upload-proof", upload.array("proofFiles", 10), ambassadorStep2FormData);


router.get("/api/seminar/get-seminar-data",  ambassadorGetSeminarData);





export default router;
