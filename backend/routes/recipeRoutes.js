import express from 'express';
import {
    getAllRecipes,
    getRecipeById,
    creatRecipe,
    updateRecipe,
    deleteRecipe
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', createdRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router; 