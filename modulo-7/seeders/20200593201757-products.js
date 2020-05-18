'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      // return queryInterface.bulkInsert('Products', [{
      //   category_id: 2,        
      //   name: "Hamburguer",
      //   description: "X-Mega Tudo Hamburguer",        
      //   price: 18.90,        
      // },
      // {
      //   category_id: 1,        
      //   name: "Pen-drive",
      //   description: "Kingston 6GB",        
      //   price: 68.90,        
      // }], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Products', null, {});   
  }
};
