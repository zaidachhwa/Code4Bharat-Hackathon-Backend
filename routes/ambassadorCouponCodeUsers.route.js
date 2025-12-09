import express from "express";
import ambassadorCouponCodeUsers from "../controllers/ambassadorCouponCodeUsers.controller.js";



const router = express.Router();



router.get("/api/ambassador-coupen-code-users/:ambassador", ambassadorCouponCodeUsers);



export default router;