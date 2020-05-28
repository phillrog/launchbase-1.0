'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Categories', [
      {
        name: faker.commerce.productName
      },
      {
        name: faker.commerce.productName
      },
      {
        name: faker.commerce.productName
      },
      {
        name: faker.commerce.productName
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});  
  }
};
