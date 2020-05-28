'use strict';

const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
      const categories = [1,2,3,4].map(f =>({
        
            name: faker.commerce.productName()
          
      }));
      return queryInterface.bulkInsert('Categories', categories, {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});  
  }
};
