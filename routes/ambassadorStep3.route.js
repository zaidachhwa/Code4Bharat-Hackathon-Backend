import express from 'express';
import ambassadorStep3 from '../controllers/ambassadorStep3.controller.js';


const router = express.Router();


router.get('/api/ambassador/coupen-code', ambassadorStep3);


export default router;