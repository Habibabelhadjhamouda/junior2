module.exports = (connection, DataTypes) => {
  const Category = connection.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING
      }
    }
  );
  return Category;
};