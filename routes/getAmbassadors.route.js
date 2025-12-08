import express from "express";
import Ambassadors from "../controllers/getAmbassadors.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();


router.get("/api/ambassadors/data/get",Ambassadors.getAmbassadors );
router.get("/api/ambassadors/data/:id",Ambassadors.getAmbassadorsById );
router.post("/api/ambassadors/send-photos",upload.array("files",10), Ambassadors.sendPhotos);
router.patch("/api/ambassadors/approve/:id", Ambassadors.getApprove);


export default router;