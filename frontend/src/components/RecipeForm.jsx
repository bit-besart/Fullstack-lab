import { useEffect, useState } from 'react';

function RecipeForm({ onRecipeAdded, onRecipeUpdated, editingRecipe }) {
  const [formData, setFormData] = useState({
    title: '',
    mealType: '',
    caloriesPerServing: '',
    proteinGrams: '',
    proteinSource: '',
    ingredients: '',
    instructions: '',
    createdBy: '680af7d8f1b2c3d4e5f67890'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editingRecipe) {
      setFormData({
        _id: editingRecipe._id,
        title: editingRecipe.title,
        mealType: editingRecipe.mealType,
        caloriesPerServing: editingRecipe.caloriesPerServing,
        proteinGrams: editingRecipe.proteinGrams,
        proteinSource: editingRecipe.proteinSource,
        ingredients: editingRecipe.ingredients.join(', '),
        instructions: editingRecipe.instructions,
        createdBy: editingRecipe.createdBy
      });
    }
  }, [editingRecipe]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const recipeToSend = {
      ...formData,
      caloriesPerServing: Number(formData.caloriesPerServing),
      proteinGrams: Number(formData.proteinGrams),
      ingredients: formData.ingredients.split(',').map((item) => item.trim())
    };

    try {
      if (editingRecipe) {
        await onRecipeUpdated(recipeToSend);
      } else {
        const res = await fetch('/api/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recipeToSend)
        });

        if (!res.ok) {
          throw new Error('Failed to create recipe');
        }

        const newRecipe = await res.json();
        onRecipeAdded(newRecipe);
      }

      setFormData({
        title: '',
        mealType: '',
        caloriesPerServing: '',
        proteinGrams: '',
        proteinSource: '',
        ingredients: '',
        instructions: '',
        createdBy: '680af7d8f1b2c3d4e5f67890'
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}</h2>

      <input
        type="text"
        name="title"
        placeholder="Recipe title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="mealType"
        placeholder="Meal type"
        value={formData.mealType}
        onChange={handleChange}
      />

      <input
        type="number"
        name="caloriesPerServing"
        placeholder="Calories per serving"
        value={formData.caloriesPerServing}
        onChange={handleChange}
      />

      <input
        type="number"
        name="proteinGrams"
        placeholder="Protein grams"
        value={formData.proteinGrams}
        onChange={handleChange}
      />

      <input
        type="text"
        name="proteinSource"
        placeholder="Protein source"
        value={formData.proteinSource}
        onChange={handleChange}
      />

      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients, separated by commas"
        value={formData.ingredients}
        onChange={handleChange}
      />

      <textarea
        name="instructions"
        placeholder="Instructions"
        value={formData.instructions}
        onChange={handleChange}
      />

      <button type="submit">
        {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default RecipeForm;