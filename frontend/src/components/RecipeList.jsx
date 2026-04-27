import RecipeItem from './RecipeItem';

function RecipeList({ recipes, onDeleteRecipe, onEditRecipe, onAddToMealPlan }) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe._id}
          recipe={recipe}
          onDeleteRecipe={onDeleteRecipe}
          onEditRecipe={onEditRecipe}
          onAddToMealPlan={onAddToMealPlan}
        />
      ))}
    </ul>
  );
}

export default RecipeList;