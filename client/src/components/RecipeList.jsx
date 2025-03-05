import { useNavigate } from "react-router-dom"
import { Edit, Trash2, Eye } from "lucide-react"
import "./styles.css"

function RecipeList({ recipes, handleDelete }) {
  console.log("resiiiii",recipes)
  const navigate = useNavigate()

  if (!recipes || recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found. Try adding a new recipe!</p>
      </div>
    )
  }

  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <img
            src={recipe.image || "/placeholder.svg?height=200&width=400"}
            alt={recipe.title}
            className="recipe-image"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            style={{cursor: 'pointer'}}
          />
          <div className="recipe-content">
            <h3 className="recipe-title">{recipe.title}</h3>
            <p className="recipe-description">
              {recipe.description
                ? recipe.description.length > 100
                  ? `${recipe.description.substring(0, 100)}...`
                  : recipe.description
                : "No description available"}
            </p>
            <div className="recipe-meta">
              <span className="recipe-category">{recipe.category || "Uncategorized"}</span>
              <div className="recipe-actions">
                <button
                  className="recipe-button"
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  aria-label="View recipe details"
                >
                  <Eye size={18} />
                </button>
                <button
                  className="recipe-button"
                  onClick={() => navigate(`/edit/${recipe.id}`)}
                  aria-label="Edit recipe"
                >
                  <Edit size={18} />
                </button>
                <button className="recipe-button" onClick={() => handleDelete(recipe.id)} aria-label="Delete recipe">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeList

