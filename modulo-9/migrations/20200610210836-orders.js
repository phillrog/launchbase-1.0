'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('orders', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      buyer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT
      }, 
      created_at: {
        type: Sequelize.DATE,      
        defaultValue: Sequelize.NOW
      },    
      updated_at: {
          allowNull: true,
          type: Sequelize.DATE,      
          defaultValue: Sequelize.NOW
      }
    });
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('orders');
    
  }
};
