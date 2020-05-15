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
    createdAt: {
      type: DataTypes.DATE,      
      defaultValue: sequelize.fn('now'), 
    },    
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE, 
        defaultValue: sequelize.fn('now'),   
    }
  }, {});
  Products.associate = models => {
    Products.belongsTo(models.Categories, {foreignKey: 'category_id'});
  };
  return Products;
};