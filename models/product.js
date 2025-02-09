'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    }
  }
  
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom du produit est requis" },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "Le prix doit être un nombre" },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Le stock doit être un entier" },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id'}, // dans model, on met le nom de la table, pas du model
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};