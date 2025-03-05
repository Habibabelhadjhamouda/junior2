module.exports = (connection, DataTypes) => {
    const Recipe = connection.define(
      "Recipe",
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
       description : {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        ingredients: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        instructions: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        cookingTime: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        PrepTime : {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        servings: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isFavorite: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      }
    );
    return Recipe;
}; 