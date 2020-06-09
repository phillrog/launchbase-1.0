'use strict';
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
      const products = [{
        category_id: Math.ceil(Math.random() * 2),        
        user_id: 1,
        name: "Hamburguer",
        description: "X-Mega Tudo Hamburguer",        
        price: 18.90,  
        quantity: 3     
      },
      {
        user_id: 1,
        category_id: 2,        
        name: "Pen-drive",
        description: "Kingston 6GB",        
        price: 68.90,  
        quantity: 2      
      }];
      const fakeProducts = [1,2,3,4,5,6,7,8,9,10].map(f=> ({
        user_id: Math.ceil(Math.random() * 2),
        category_id: Math.ceil(Math.random() * 4),        
        name: faker.commerce.productName(),
        description: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,        
        price: Math.floor(Math.random() * (1000000 - 100) + 100) / 100, 
        old_price: Math.floor(Math.random() * (1000000 - 100) + 100) / 100, 
        quantity: faker.random.number(99), 
        status: Math.round(Math.random() * 2),
        
      }));
    
      return queryInterface.bulkInsert('Products', [...products, ... fakeProducts]
      , {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Products', null, {});   
  }
};
