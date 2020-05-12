'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(      
        'Members',
        'instructor_id',
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
      'instructor_id'
    )
  }
};
