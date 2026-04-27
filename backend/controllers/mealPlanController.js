import MealPlan from '../models/MealPlan.js';

export const getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find()
      .populate('recipeId', 'title')
      .populate('userId', 'name');

    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the meal plans' });
  }
};

export const createMealPlan = async (req, res) => {
  try {
    const newMealPlan = new MealPlan(req.body);
    const savedMealPlan = await newMealPlan.save();
    res.status(201).json(savedMealPlan);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create the meal plan', error: error.message });
  }
};

export const deleteMealPlan = async (req, res) => {
  try {
    const deletedMealPlan = await MealPlan.findByIdAndDelete(req.params.id);

    if (!deletedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete meal plan' });
  }
};