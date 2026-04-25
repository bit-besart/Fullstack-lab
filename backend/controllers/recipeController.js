import Recipe from '../models/Recipe.js';

export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('createdBy', 'name email');
        res.status(200),json(recipes);
    } catch (error) {
        res.status(500).json({ massage: 'Faild to fetch the recipeas'});
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'name email');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe is not found'});            
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Failde to fetch recipe'});
    }
};


export const creatRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Failed to creat recipe', eroor: error.massage}); 
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe is not found'})
        }
        res.status(200).json(updateRecipe);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update recipe', eroor: error.message});
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if(!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe is not found'});
        }
        res.status(200).json({ message: 'Recipe is deleted now, Succsesfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the recipe'});
    }
};