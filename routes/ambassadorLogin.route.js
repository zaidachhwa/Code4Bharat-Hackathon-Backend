import express from "express";
import ambassadorLogin from "../controllers/ambassadorLogin.controller.js";

const router = express.Router();



router.post("/login", ambassadorLogin);






export default router;




