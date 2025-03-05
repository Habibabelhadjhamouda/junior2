const { Recipe, User } = require("../models/index")

module.exports = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.findAll({
                include: [{
                    model: User,
                    attributes: ['name'] 
                }]
            })
            res.status(200).send(recipes)
        } catch (error) {
            console.error("Error geting recipes:", error)
            res.status(500).send({ message: "Error geting recipes" })
        }
    },

    getRecipesByCategory: async (req, res) => {
        try {
            const { id } = req.params
            const recipes = await Recipe.findAll({
                where: { CategoryId: id },
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            })
            res.status(200).send(recipes)
        } catch (error) {
            console.error("Error getingrecipes by category:", error)
            res.status(500).send({ message: "Error geting recipes by category" })
        }
    },

    addRecipe: async (req, res) => {
        try {
            const { title,description, ingredients, instructions, cookingTime, PrepTime, servings, image } = req.body
            const UserId = req.user 

            if (!title || !description || !ingredients || !instructions || !cookingTime || !PrepTime|| !servings) {
                return res.status(400).send({ message: "All fields are required except image" })
            }
            const newRecipe = await Recipe.create({ title,description, ingredients, instructions, cookingTime, PrepTime, servings,   image: image || null,UserId }
            )
            res.status(201).send(newRecipe)
        } catch (error) {
            console.error("Error adding recipe:", error)
            res.status(500).send({ message: "Error adding recipe" })
        }
    },

    deleteRecipe: async (req, res) => {
        try {
            const { id } = req.params
            // const UserId = req.user 
            // console.log(userId)
           
            const recipe = await Recipe.findOne({
                where: { 
                    id                }
            })

            if (!recipe) {
                return res.status(404).send({ message: "Recipe not found or unauthorized" })
            }

            await recipe.destroy()
            res.status(200).send({ message: "Recipe deleted successfully" })
        } catch (error) {
            console.error("Error deleting recipe:", error)
            res.status(500).send({ message: "Error deleting recipe" })
        }
    },

    updateRecipe: async (req, res) => {
      
            const { title, description, ingredients, instructions, cookingTime, prepTime, servings, image, isFavorite } = req.body;
// const userId = req.body.UserId;
const recipeId = req.params.id || req.body.id; 

if (!recipeId) {
  return res.status(400).json({ error: "UserId or RecipeId is missing" });
}

try {
  const recipe = await Recipe.findOne({
    where: { id: recipeId}
  });

  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found or unauthorized" });
  }

  await recipe.update({
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    prepTime,
    servings,
    image,
  });

  res.status(200).json({ message: "Recipe updated successfully", recipe });

} catch (error) {
  console.error("Error updating recipe:", error);
  res.status(500).json({ error: "Internal server error" });
}

},

    getRecipeById: async (req, res) => {
        try {
            const { id } = req.params
            const recipe = await Recipe.findOne({
                where: { id },
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            })
            
            if (!recipe) {
                return res.status(404).send({ message: "Recipe not found" })
            }
            
            res.status(200).send(recipe)
        } catch (error) {
            console.error("Error getting recipe:", error)
            res.status(500).send({ message: "Error getting recipe" })
        }
    },

    // toggleFavorite: async (req, res) => {
    //     try {
    //         const { id } = req.params
    //         const UserId = req.user

    //         const recipe = await Recipe.findOne({
    //             where: { id }
    //         })

    //         if (!recipe) {
    //             return res.status(404).send({ message: "Recipe not found" })
    //         }

    //         recipe.isFavorite = !recipe.isFavorite
    //         await recipe.save()

    //         res.status(200).send(recipe)
    //     } catch (error) {
    //         console.error("Error toggling favorite:", error)
    //         res.status(500).send({ message: "Error toggling favorite" })
    //     }
    // },

    // getFavorites: async (req, res) => {
    //     try {
    //         const UserId = req.user
    //         const favorites = await Recipe.findAll({
    //             where: { 
    //                 UserId,
    //                 isFavorite: true 
    //             },
    //             include: [{
    //                 model: User,
    //                 attributes: ['name']
    //             }]
    //         })
    //         res.status(200).send(favorites)
    //     } catch (error) {
    //         console.error("Error getting favorites:", error)
    //         res.status(500).send({ message: "Error getting favorites" })
    //     }
    // }
} 