import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditRecipe({ categories = [] }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookingTime: '',
        servings: '',
        image: '',
        CategoryId: '',
        isFavorite:''
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:4000/api/recipe/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                
                const data = response.data;
                setRecipe({
                    title: data.title || '',
                    description: data.description || '',
                    ingredients: data.ingredients || '',
                    instructions: data.instructions || '',
                    prepTime: data.prepTime || '',
                    cookingTime: data.cookingTime || '',
                    servings: data.servings || '',
                    image: data.image || '',
                    CategoryId: data.CategoryId || '',
                    isFavorite:data.isFavorite || ''
                });
            } catch (error) {
                console.error('Error fetching recipe:', error);
                navigate('/main');
            }
        };
        fetchRecipe();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/recipe/update/${id}`, recipe, {
                // headers: { Authorization: `Bearer ${token}` }
            });
            console.log("recippppppppppppppp",recipe)
            navigate('/main');
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <div className="container">
            <form className="custom-form" onSubmit={handleSubmit}>
                <h2>Update Recipe</h2>

                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Recipe Title"
                        value={recipe.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Recipe Description"
                        value={recipe.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="ingredients"
                        className="form-control"
                        placeholder="Ingredients"
                        value={recipe.ingredients}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="instructions"
                        className="form-control"
                        placeholder="Instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="prepTime"
                        className="form-control"
                        placeholder="Prep Time (mins)"
                        value={recipe.prepTime}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="cookingTime"
                        className="form-control"
                        placeholder="Cooking Time (minutes)"
                        value={recipe.cookingTime}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="servings"
                        className="form-control"
                        placeholder="Servings"
                        value={recipe.servings}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="image"
                        className="form-control"
                        placeholder="Image URL"
                        value={recipe.image}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <select
                        name="CategoryId"
                        className="form-control"
                        value={recipe.CategoryId}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" >Update Recipe</button>
            </form>
        </div>
    );
}

export default EditRecipe;
