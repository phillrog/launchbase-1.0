'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Files', [{
        name: 'HAMBURGUER',
        path: 'public/images/1590170534751-como_fazer_hamburguer_caseiro.jpg',
        product_id: 1
      },
      {
        name: 'Pen-Drive',
        path: 'public/images/1590170077198-pen-drive.jpg',
        product_id: 2
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Files', null, {});
   
  }
};
