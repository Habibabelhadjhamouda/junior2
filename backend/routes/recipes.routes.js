const express = require("express")
const Router = express.Router()
const {
    getAllRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    getRecipesByCategory,
    getRecipeById
} = require("../Controller/recipes.controller")
const verifyToken = require("../middlleware/auth")

Router.get("/get", getAllRecipes)
Router.post("/add", addRecipe)
Router.delete("/delete/:id", deleteRecipe)
Router.put("/update/:id", updateRecipe)
Router.get("/category/:id", getRecipesByCategory)
Router.get("/:id", getRecipeById)

module.exports = Router 