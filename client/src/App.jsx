import { useEffect, useState } from "react";
import "./App.css";
import "./styles/Recipe.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRecipe from "./components/AddRecipe.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Register from "./components/Register.jsx";
import MainPage from "./components/MainPage.jsx";
import Update from "./components/Update.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import Profile from "./components/Profile.jsx";


function App() {
  const [recipes, setRecipes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchRecipes = async (categoryId = "all") => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = categoryId === "all"
        ? "http://localhost:4000/api/recipe/get"
        : `http://localhost:4000/api/recipe/category/${categoryId}`;
      
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:4000/api/category/get", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token",token)
    if (token) {
      setIsAuthenticated(true);
      fetchRecipes();
      fetchCategories();
    }
  }, []);

  const deleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/recipe/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleCategoryChange = (categoryId) => {
    fetchRecipes(categoryId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/main" 
          element={
            <MainPage 
              recipes={recipes} 
              deleteRecipe={deleteRecipe} 
              fetchRecipes={fetchRecipes} 
              handleCategoryChange={handleCategoryChange} 
              categories={categories} 
            />
          } 
        />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/add" 
          element={
            <AddRecipe 
              fetchRecipes={fetchRecipes} 
              categories={categories} 
            />
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <Update 
              categories={categories} 
            />
          } 
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/Profile" element={<Profile />} />
 
      </Routes>
    </Router>
  );
}

export default App;
