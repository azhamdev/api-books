'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Category, { foreignKey: 'category' });
      Book.belongsTo(models.User, { foreignKey: 'user' });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    user: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    author: DataTypes.STRING,
    image: DataTypes.TEXT,
    published: DataTypes.DATE,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};