'use strict';
const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define('Files', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      unique: true
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
  Files.associate = function(models) {
    // associations can be defined here
  };
  return Files;
};