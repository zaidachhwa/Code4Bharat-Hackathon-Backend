import express from "express";
import jwtAuth from "../controllers/jwtAuth.controller.js";


const router  = express.Router();



router.get("/api/jwtauth/checking", jwtAuth);





export default router;