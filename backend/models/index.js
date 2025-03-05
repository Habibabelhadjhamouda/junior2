const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize("recipes", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
connection
  .authenticate()
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    throw err;
  });


  const db={}
  db.Recipe = require("./recipe.model")(connection, DataTypes)
  db.Category = require("./category.model")(connection, DataTypes)
  db.User = require("./user.models")(connection, DataTypes)

  db.User.hasMany(db.Recipe)
  db.Recipe.belongsTo(db.User)
  db.Category.hasMany(db.Recipe)
  db.Recipe.belongsTo(db.Category)


  // connection
  // .sync({ force: true })
  // .then(() => console.log("tables are created"))
  // .catch((err) => {
  //   throw err;
  // });
  module.exports=db
