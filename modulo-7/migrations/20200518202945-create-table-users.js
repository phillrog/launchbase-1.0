'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Users = queryInterface.createTable('Users', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      cpf_cnpj: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true
      },
      cep: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,      
        defaultValue: Sequelize.NOW
      },    
      updated_at: {
          allowNull: true,
          type: Sequelize.DATE,      
          defaultValue: Sequelize.NOW
      }
    });

    return Users;
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Users');
  }
};
