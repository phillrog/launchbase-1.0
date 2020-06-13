'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query(`
      CREATE TRIGGER SET_TIMESTAMP_ORDER 
      BEFORE UPDATE ON "Orders"
      FOR EACH ROW 
      EXECUTE PROCEDURE trigger_set_tmestamp();
      
      `);
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.query(`
        DROP TRIGGER SET_TIMESTAMP_ORDER;
      `);
    }
};
