'use strict';

const {hash} = require('bcryptjs');
const faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
      async function newPassword() {
        return  await hash('1234', 8);
      }

      let password = "";
      newPassword().then(p => {
        password = p;
      })

      const users = [{       
        name: "Phillipe Roger Souza",
        email: "phillrog@hotmail.com",
        password: password,
        cpf_cnpj: '94352268097',
        cep: '14270-000',
        address: "Rua Andressa Baruco",
      },{     
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password,
        cpf_cnpj: faker.random.number(99999999999),
        cep: faker.random.number(999999999),
        address: faker.address.streetName()
      }];

      return queryInterface.bulkInsert('Users', users , {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Users', null, {});
   
  }
};
