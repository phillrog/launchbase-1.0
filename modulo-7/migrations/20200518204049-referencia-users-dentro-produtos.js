'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addConstraint('Products', ['user_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_users_id_product', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      });    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Products','FK_users_id_product');
  }
};
