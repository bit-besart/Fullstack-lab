import RecipeItem from './RecipeItem';

function RecipeList({ recipes, onDeleteRecipe, onEditRecipe }) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe._id}
          recipe={recipe}
          onDeleteRecipe={onDeleteRecipe}
          onEditRecipe={onEditRecipe}
        />
      ))}
    </ul>
  );
}

export default RecipeList;