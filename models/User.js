'use strict';

const bcrypt = require('bcrypt')
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'userId', as: 'products' });
      User.hasOne(models.Profile, { foreignKey: 'userId', as: 'profile' });
      User.belongsToMany(models.Role, { through: 'UserRoles', foreignKey: 'userId', as: 'roles' });
    }
  }
  
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};