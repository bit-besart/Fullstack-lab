import { useState } from 'react';

function RecipeItem({ recipe, onDeleteRecipe, onEditRecipe, onAddToMealPlan }) {
  const [showRecipe, setShowRecipe] = useState(false);

  return (
    <li className="recipe-item">
      <div className="recipe-content">
        <strong>{recipe.title}</strong> — {recipe.mealType}

        <div className="recipe-actions">
          <button onClick={() => setShowRecipe(!showRecipe)}>
            {showRecipe ? 'Hide Recipe' : 'Show Recipe'}
          </button>
          <button onClick={() => onEditRecipe(recipe)}>Edit</button>
          <button onClick={() => onDeleteRecipe(recipe._id)}>Delete</button>
          <button onClick={() => onAddToMealPlan(recipe)}>Add to Meal Plan</button>
        </div>

        {showRecipe && (
          <div className="recipe-details">
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Steps:</strong> {recipe.instructions}</p>
            <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>
          </div>
        )}
      </div>
    </li>
  );
}

export default RecipeItem;