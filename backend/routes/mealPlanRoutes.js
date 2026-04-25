import express from 'express';
import { getAllMealPlans, createMealPlan } from '../controllers/mealPlanController.js';

const router = express.Router();

router.get('/', getAllMealPlans);
router.post('/', createMealPlan);

export default router;