'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(      
        'Members',
        'instrutor_id',
         {
           type: Sequelize.INTEGER, 
           foreignKey: true,
           references: {
              model: 'Instructors',
              key: 'id'
          }
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Members',
      'instrutor_id'
    )
  }
};
