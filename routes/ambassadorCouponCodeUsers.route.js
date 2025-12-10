import express from "express";
import ambassadorCouponCodeUsers from "../controllers/ambassadorCouponCodeUsers.controller.js";
import ambassadorCouponCodeUser from "../controllers/ambassadorCouponCodeUser.controller.js";



const router = express.Router();



router.get("/api/ambassador-coupen-code-users/:ambassador", ambassadorCouponCodeUsers);


router.get("/api/ambassador-coupen-code-user", ambassadorCouponCodeUser);


export default router;