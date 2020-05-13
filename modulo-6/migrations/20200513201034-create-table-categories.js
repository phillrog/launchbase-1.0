'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
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
    return queryInterface.dropTable('Categories');
  }
};