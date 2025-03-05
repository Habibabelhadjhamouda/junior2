import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload } from "lucide-react"

function AddRecipe({ fetchRecipes, categories }) {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        description:'',
        ingredients: '',
        instructions: '',
        PrepTime:'',
        cookingTime: '',
        servings: '',
        image: '',
        CategoryId: ''
    });
    const [imageFile, setImageFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "myjunior_clodinary") 
        // formData.append('cloud_name', "drjp6iyha");

        try {
            setUploading(true)
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/drjp6iyha/image/upload`,
                formData
            )
            return response.data.secure_url
        } catch (error) {
            console.error("Error uploading image:", error)
            return null
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            let imageUrl = recipe.image
            if (imageFile) {
                imageUrl = await uploadImage(imageFile)
            }

            await axios.post("http://localhost:4000/api/recipe/add", 
                { ...recipe, image: imageUrl },
                { headers: { Authorization: `Bearer ${token}` }}
            )
            fetchRecipes();
            navigate("/main");
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    return (
        <div className="container">
            <form className="custom-form" onSubmit={handleSubmit}>
                <h2>Add New Recipe</h2>
                
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Recipe Title"
                        value={recipe.title}
                        onChange={(e) => setRecipe({...recipe, title: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Recipe Description"
                        value={recipe.description}
                        onChange={(e) => setRecipe({...recipe,description: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="Ingredients (one per line)"
                        value={recipe.ingredients}
                        onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="Cooking Instructions"
                        value={recipe.instructions}
                        onChange={(e) => setRecipe({...recipe, instructions: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="PrepTime (mins)"
                        value={recipe.PrepTime}
                        onChange={(e) => setRecipe({...recipe, PrepTime: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Cooking Time (mins)"
                        value={recipe.cookingTime}
                        onChange={(e) => setRecipe({...recipe, cookingTime: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Number of Servings"
                        value={recipe.servings}
                        onChange={(e) => setRecipe({...recipe, servings: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label className="upload-label">
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="hidden"
                            accept="image/*"
                        />
                        <Upload size={24} />
                        <span>Upload Image</span>
                    </label>
                    {uploading && <p>Uploading...</p>}
                    {imageFile && <p>Selected: {imageFile.name}</p>}
                </div>

                <div className="form-group">
                    <select
                        className="form-control"
                        value={recipe.CategoryId}
                        onChange={(e) => setRecipe({...recipe, CategoryId: e.target.value})}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Add Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipe; 