import mongoose from 'mongoose';

const mealPlanShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        requierd: true
    },
    plannedDate: {
        type: String,
        required: true
    },
    mealType: {
        type: String,
        required: true
    }
});

export default mongoose.model('MealPlan', mealPlanSchema);