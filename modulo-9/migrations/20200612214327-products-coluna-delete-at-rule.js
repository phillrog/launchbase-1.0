'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    
    CREATE OR REPLACE RULE delete_product AS 
    ON DELETE  TO "Products" DO INSTEAD
    UPDATE "Products"
    SET deleted_at = now()
    WHERE "Products"."id" = old.id;
    
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP RULE delete_product;
    `);
  }
};
