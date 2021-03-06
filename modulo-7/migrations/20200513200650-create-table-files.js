'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      path: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        unique: true
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
    return queryInterface.dropTable('Files');
  }
};