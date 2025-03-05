import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:4000/api/recipe/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                navigate('/main');
            }
        };
        fetchRecipe();
    }, [id, navigate]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-detail">
            <div className="recipe-header">
                <h1>{recipe.title}</h1>
                <div className="recipe-section">
                    
                <h2>Description</h2>
                <pre>{recipe.description}</pre>
            </div>
            
                <img src={recipe.image } alt={recipe.title} />
            </div>
            
            <div className="recipe-info">
                <div className="info-item">
                    <span>Cooking Time:</span> {recipe.cookingTime}mins
                </div>
                <div className="info-item">
                    <span>PrepTime:</span> {recipe.PrepTime}
                </div>
                <div className="info-item">
                    <span>Servings:</span> {recipe.servings}
                </div>
            </div>

            <div className="recipe-section">
                <h2>Ingredients</h2>
                <pre>{recipe.ingredients}</pre>
            </div>

            <div className="recipe-section">
                <h2>Instructions</h2>
                <pre>{recipe.instructions}</pre>
            </div>
        </div>
    );
}

export default RecipeDetail; 