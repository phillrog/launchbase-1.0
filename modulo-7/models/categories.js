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
    created_at: {
      type: DataTypes.DATE,      
      defaultValue: DataTypes.NOW
    },    
    updated_at: {
        allowNull: true,
        type: DataTypes.DATE,      
        defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'Categories',
    underscored: true
  });
  Categories.associate = function(models) {

  };
  return Categories;
};