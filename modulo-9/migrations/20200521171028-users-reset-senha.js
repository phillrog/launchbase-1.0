'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn('Users','reset_token', {
        allowNull: true,
        type: Sequelize.TEXT
      },);
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.removeColumn('Users', 'reset_token');
    
  }
};
