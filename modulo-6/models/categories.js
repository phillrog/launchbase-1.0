'use strict';
const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE,      
      defaultValue: DataTypes.NOW
    },    
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,      
        defaultValue: DataTypes.NOW
    }
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
  };
  return Categories;
};