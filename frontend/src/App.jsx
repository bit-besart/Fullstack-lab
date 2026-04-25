import { useEffect, useState } from 'react';
import './App.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  return (
    <div className="app">
      <h1>Vegan Recipe Planner</h1>
      <br></br>
      <p>Simple meal planning app for vegan recipes.</p>

      <RecipeForm
        onRecipeAdded={handleRecipeAdded}
        onRecipeUpdated={handleRecipeUpdated}
        editingRecipe={editingRecipe}
      />

      <input
        className="search-input"
        type="text"
        placeholder="Search by title or meal type"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <RecipeList
          recipes={filteredRecipes}
          onDeleteRecipe={handleDeleteRecipe}
          onEditRecipe={handleEditRecipe}
        />
      )}
    </div>
  );
}

export default App;