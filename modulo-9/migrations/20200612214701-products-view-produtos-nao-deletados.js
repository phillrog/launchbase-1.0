'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    
    CREATE VIEW products_without_deleted AS 
      SELECT * FROM "Products" WHERE deleted_at IS NULL;
    
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP VIEW products_without_deleted;
    `);
  }
};
