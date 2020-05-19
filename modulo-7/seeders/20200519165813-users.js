'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [{       
        name: "Phillipe",
        email: "phillrog@hotmail.com",
        password: "1234",
        cpf_cnpj: '94352268097',
        cep: '14270-000',
        address: "Rua Andressa Baruco",
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
