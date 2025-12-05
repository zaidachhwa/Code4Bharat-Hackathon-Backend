import express from "express";
import upload from "../middlewares/upload.js";
import ambassadorRegister from "../controllers/ambassadorRegister.controller.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "studentIdCard", maxCount: 1 },
  ]),
  ambassadorRegister
);


export default router;
