import mongoose from 'mongoose';

const recipeShema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        mealType: {
            type: String,
            required: true,
            enum: ['breakfast', 'lunch', 'dinner', 'snack']
        },
        caloriesPerServing: {
            type: Number,
            required: true,
            min: 1
        },
        proteinGrams: {
            type: Number,
            required: true,
            min: 0
        },

        proteinSource: {
            type: String,
            required: true,
            enum: ['beans', 'lentils', 'tofu', 'tempeh', 'chickpeas', 'seitan', 'nuts',]
        },
        ingredients: {
            type: [String],
            required: true
        },
        instructions: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    });
export default mongoose.model('Recipe', recipeSchema);