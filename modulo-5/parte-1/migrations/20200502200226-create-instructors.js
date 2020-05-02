'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const InstructorTable = queryInterface.createTable('Instructors', {
       id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      avatar_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      name: {
        allowNull: true,
        unique: true,
        type: Sequelize.TEXT,
      },
      birth: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      gender: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      services: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    return InstructorTable;
  },

  down: queryInterface => queryInterface.dropTable('Instructors')
};
