'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const MemberTable = queryInterface.createTable('Members', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: true,
        type: Sequelize.TEXT,
      },      
      avatar_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      gender: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      birth: {
        allowNull: true,
        type: Sequelize.DATE
      },
      blood: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      weight: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      height: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,        
        field: 'created_at'
      },
      createdAt: {
        type: Sequelize.DATE,      
        defaultValue: Sequelize.NOW
      },    
      updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,      
          field: 'updated_at'
      }
    });
    
    return MemberTable;
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
