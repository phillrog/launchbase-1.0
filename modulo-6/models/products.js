'use strict';

const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    category_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    old_price: {
      allowNull: true,
      type: DataTypes.DECIMAL
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    quantity: {
      allowNull: true,
      type: DataTypes.DECIMAL
    },
    status:{
      defaultValue: 1,
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,      
      defaultValue: DataTypes.NOW
    },    
    updated_at: {
        allowNull: true,
        type: DataTypes.DATE,      
        field: 'updated_at'
    }
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};