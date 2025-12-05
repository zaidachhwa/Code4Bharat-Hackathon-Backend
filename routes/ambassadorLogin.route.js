import express from "express";
import ambassadorLogin from "../controllers/ambassadorLogin.controller.js";

const router = express.Router();



router.post("/api/ambassador/login", ambassadorLogin);






export default router;




