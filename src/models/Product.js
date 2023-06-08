const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Product = sequelize.define("product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.FLOAT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  //categoryId
});

module.exports = Product;
