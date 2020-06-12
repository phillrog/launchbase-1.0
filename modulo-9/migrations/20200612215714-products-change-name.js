'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    
    ALTER TABLE "Products" RENAME TO "products_wit_deleted";
    ALTER TABLE "products_without_deleted" RENAME TO "Products";

    `);
  },

  down: (queryInterface, Sequelize) => {
   
  }
};
