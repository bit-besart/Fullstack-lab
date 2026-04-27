import { useEffect, useState } from 'react';
import './App.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mealPlansLoading, setMealPlansLoading] = useState(true);
  const [error, setError] = useState('');
  const [mealPlansError, setMealPlansError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.mealType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('/api/recipes');

        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await res.json();
        setRecipes(data);
        setError('');
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchRecipes();

    const intervalId = setInterval(fetchRecipes, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function fetchMealPlans() {
      try {
        const res = await fetch('/api/mealplans');

        if (!res.ok) {
          throw new Error('Failed to fetch meal plans');
        }

        const data = await res.json();
        setMealPlans(data);
        setMealPlansError('');
        setMealPlansLoading(false);
      } catch (err) {
        setMealPlansError(err.message);
        setMealPlansLoading(false);
      }
    }

    fetchMealPlans();

    const intervalId = setInterval(fetchMealPlans, 5000);

    return () => clearInterval(intervalId);
  }, []);

  function handleRecipeAdded(newRecipe) {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  }

  function handleEditRecipe(recipe) {
    setEditingRecipe(recipe);
  }

  async function handleRecipeUpdated(updatedRecipe) {
    try {
      const res = await fetch(`/api/recipes/${updatedRecipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecipe)
      });

      if (!res.ok) {
        throw new Error('Failed to update recipe');
      }

      const savedRecipe = await res.json();

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === savedRecipe._id ? savedRecipe : recipe
        )
      );

      setEditingRecipe(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteRecipe(id) {
    const confirmed = window.confirm('Delete recipe: Are you sure?');

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete recipe');
      }

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAddToMealPlan(recipe) {
    try {
      const newMealPlan = {
        userId: '69ee8898d2fdbcee0ba80c81',
        recipeId: recipe._id,
        plannedDate: new Date().toISOString().split('T')[0],
        mealType: recipe.mealType
      };

      const res = await fetch('/api/mealplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMealPlan)
      });

      if (!res.ok) {
        throw new Error('Failed to add meal plan');
      }

      const savedMealPlan = await res.json();
      setMealPlans((prev) => [...prev, savedMealPlan]);
    } catch (err) {
      setMealPlansError(err.message);
    }
  }
  async function handleDeleteMealPlan(id) {
    const confirmed = window.confirm('Delete meal plan: Are you sure?');

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/mealplans/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete meal plan');
      }

      setMealPlans((prevMealPlans) =>
        prevMealPlans.filter((mealPlan) => mealPlan._id !== id)
      );
    } catch (err) {
      setMealPlansError(err.message);
    }
  }
  return (
    <div className="app">
      <div className="app-header">
        <h1>Vegan Recipe Planner</h1>
        <br />
        <p>Delicious vegan recipes!!</p>
      </div>

      <div className="main-layout">
        <div className="left-side">
          <RecipeForm
            onRecipeAdded={handleRecipeAdded}
            onRecipeUpdated={handleRecipeUpdated}
            editingRecipe={editingRecipe}
          />

          <div className="meal-plans-section">
            <h2>Meal Plans</h2>

            {mealPlansLoading && <p>Loading meal plans...</p>}
            {mealPlansError && <p>{mealPlansError}</p>}

            {!mealPlansLoading && !mealPlansError && (
              <div className="meal-plans-list">
                {mealPlans.map((mealPlan) => (
                  <div className="meal-plan-card" key={mealPlan._id}>
                    <h3>{mealPlan.recipeId?.title || 'Recipe'}</h3>
                    <p>Planned by: {mealPlan.userId?.name || 'User'}</p>
                    <p>Date: {mealPlan.plannedDate}</p>
                    <p>Meal type: {mealPlan.mealType}</p>
                    <button onClick={() => handleDeleteMealPlan(mealPlan._id)}>
                      Delete Meal Plan
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="right-side">
          <div className="search-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="Search by title or meal type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading && <p>Loading recipes...</p>}
          {error && <p>{error}</p>}

          {!loading && !error && (
            <RecipeList
              recipes={filteredRecipes}
              onDeleteRecipe={handleDeleteRecipe}
              onEditRecipe={handleEditRecipe}
              onAddToMealPlan={handleAddToMealPlan}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;