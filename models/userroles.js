'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRoles.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id'}, // dans model, on met le nom de la table, pas du model
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: { model: 'Roles', key: 'id'}, 
    }
  }, {
    sequelize,
    modelName: 'UserRoles',
  });
  return UserRoles;
};