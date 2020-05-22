'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Files', [{
        name: 'Pen-Drive',
        path: 'public/images/1589690237952-pen-drive.jpg',
        product_id: 1
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('People', null, {});
   
  }
};
