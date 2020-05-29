'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
      const files = [{
        name: 'HAMBURGUER',
        path: 'public/images/1590170534751-como_fazer_hamburguer_caseiro.jpg',
        product_id: 1
      },
      {
        name: 'Pen-Drive',
        path: 'public/images/1590170077198-pen-drive.jpg',
        product_id: 2
      }];
      const fakeFiles = [1,2,3,4,5,6,7,8,9,10].map(f=> ({
        name: faker.commerce.productName(),
        path: `public/images/placeholder.png`,
        product_id: Math.ceil(Math.random() * 10)
      }));
    
      return queryInterface.bulkInsert('Files', [...files, ... fakeFiles] , {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Files', null, {});
   
  }
};
