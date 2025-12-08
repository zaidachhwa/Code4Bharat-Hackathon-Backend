import express from 'express';
import ambassadorCurrentStep from '../controllers/ambassadorCurrentStep.controller.js';


const router = express.Router();



router.get('/api/ambassador/current-step', ambassadorCurrentStep);



export default router;