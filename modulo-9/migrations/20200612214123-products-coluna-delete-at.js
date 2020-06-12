'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products','deleted_at', {
      allowNull: true,
      type: Sequelize.DATE,      
      defaultValue: Sequelize.NOW
    },);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products','deleted_at');
  }
};
