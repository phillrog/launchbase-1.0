'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Files', [{
        name: 'John Doe',
        path: 'https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_hamburguer17.jpg?quality=70&strip=info&resize=680,453 680w, https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_hamburguer17.jpg?quality=70&strip=all&resize=420,280 420w, https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_hamburguer17.jpg?quality=70&strip=all&resize=360,240 360w, ',
        product_id: 1
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('People', null, {});
   
  }
};
