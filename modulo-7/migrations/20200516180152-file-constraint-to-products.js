'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Files', ["product_id"],{
      type: Sequelize.INTEGER,
      name: 'product_id_fk_files',
      references: { 
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Files', 'product_id_fk_files');
  }
};
