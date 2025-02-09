'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Profile.init({
    bio: {
      type: DataTypes.STRING,      
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING, 
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id'}, // dans model, on met le nom de la table, pas du model
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};