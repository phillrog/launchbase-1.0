'use strict';
const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    seller_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    buyer_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    total: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    status: {
      allowNull: false,
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
    tableName: 'Orders',
    underscored: true
  });
  Orders.associate = function(models) {

  };
  return Orders;
};