'use strict';

const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
  const ProductsWD = sequelize.define('products_wit_deleted', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
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
      defaultValue: sequelize.fn('now'), 
    },    
    updated_at: {
        allowNull: true,
        type: DataTypes.DATE, 
        defaultValue: sequelize.fn('now'),   
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE, 
      defaultValue: sequelize.fn('now'),   
    },
  
  },  {
    tableName: 'products_wit_deleted',
    underscored: true
  });
  ProductsWD.associate = models => {
   
  };
  return ProductsWD;
};