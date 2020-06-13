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
      unique: false
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
    tableName: 'Files',
    underscored: true
  });
  Files.associate = function(models) {
    Files.belongsTo(models.Products, { unique: false, 
      foreignKey : {name: "product_id", allowNull: true , unique: false }});

  };
  return Files;
};