

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import RecipeList from "./RecipeList"
import Profile from "./Profile.jsx"
import "./styles.css"

function MainPage({ recipes, deleteRecipe, fetchRecipes }) {
  const [query, setQuery] = useState("")
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const navigate = useNavigate()

  const handleSearch = () => {
    let filtered = recipes
    
  
    if (query) {
      const lowerQuery = query.toLowerCase()
      filtered = recipes.filter((recipe) => {
        const title = recipe.title?.toLowerCase() || ''
        const description = recipe.description?.toLowerCase() || ''
        const category = recipe.category?.toLowerCase() || ''
        
        return (
          title.includes(lowerQuery) ||
          description.includes(lowerQuery) ||
          category.includes(lowerQuery)
        )
      })
    }

 
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory)
    }

    setFilteredRecipes(filtered)
  }

  useEffect(() => {
    setFilteredRecipes(recipes)
  }, [recipes])

  useEffect(() => {
    handleSearch()
  }, [query, selectedCategory]) 

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
   
      const token = localStorage.getItem('token')
      const response = await axios.get("http://localhost:4000/api/categories", {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log("Categories fetched:", response.data) 
      setCategories(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="recipe-app">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1>Recipe Book</h1>
          </div>

          <div className="navbar-links">
            <ul>
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a onClick={() => navigate("/add")} className="nav-link">
                  Add Recipe
                </a>
              </li>
            </ul>
          </div>

          <div className="navbar-search">
            <div className="search-container">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes..."
                className="search-input"
              />
              <button type="button" onClick={handleSearch} className="search-button">
                Search
              </button>
            </div>
          </div>

          <div className="profile-container">
            <Profile toggleMenu={toggleProfileMenu} showMenu={showProfileMenu} handleLogout={handleLogout} />
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="category-section">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="All Categories">All Categories</option>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>Loading categories...</option>
          )}
        </select>
        </div>

        <div className="recipes-container">
          <h2 className="section-title">Your Recipes</h2>
          <RecipeList recipes={filteredRecipes} handleDelete={deleteRecipe} />
        </div>
      </div>
    </div>
  )
}

export default MainPage
