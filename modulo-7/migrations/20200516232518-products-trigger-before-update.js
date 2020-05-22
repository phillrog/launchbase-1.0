'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    CREATE FUNCTION trigger_set_tmestamp()
    RETURNS TRIGGER AS $$ 
    BEGIN
      NEW.updated_at = Now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    
    CREATE TRIGGER SET_TIMESTAMP 
    BEFORE UPDATE ON "Products"
    FOR EACH ROW 
    EXECUTE PROCEDURE trigger_set_tmestamp();
    
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP FUNCTION trigger_set_tmestamp;
      DROP TRIGGER SET_TIMESTAMP;
    `);
  }
};
