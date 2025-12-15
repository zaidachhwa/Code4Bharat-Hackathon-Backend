import express from "express";
import {adminAuth,jwtAuth} from "../controllers/jwtAuth.controller.js";


const router  = express.Router();



router.get("/api/jwtauth/checking", jwtAuth);

router.get("/api/admin/auth", adminAuth);





export default router;