'use strict';

const {hash} = require('bcryptjs');
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
      const password = hash('1234', 8);
      return queryInterface.bulkInsert('Users', [{       
        name: "Phillipe Roger Souza",
        email: "phillrog@hotmail.com",
        password: password,
        cpf_cnpj: '94352268097',
        cep: '14270-000',
        address: "Rua Andressa Baruco",
      },
      {      
        name: faker.name.findName,
        email: faker.internet.email,
        password: password,
        cpf_cnpj: faker.random.number(99999999999999),
        cep: faker.random.number(999999999),
        address: faker.address.streetName(),
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Users', null, {});
   
  }
};
