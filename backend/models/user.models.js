module.exports = (connection, DataTypes) => {
    const User = connection.define(
      "User",
      {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          isEmail: true, 
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
    
    );
    return User;
  };