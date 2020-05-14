'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      const Products = queryInterface.createTable('Products', 
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          type: Sequelize.INTEGER
        },
        category_id: {
          allowNull: false,
          unique: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          allowNull: true,
          unique: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        old_price: {
          allowNull: true,
          type: Sequelize.DECIMAL
        },
        price: {
          allowNull: false,
          type: Sequelize.DECIMAL
        },
        quantity: {
          allowNull: true,
          type: Sequelize.DECIMAL
        },
        status:{
          defaultValue: 1,
          type: Sequelize.INTEGER
        },
        createdAt: {
          type: Sequelize.DATE,      
          defaultValue: Sequelize.NOW
        },    
        updatedAt: {
            allowNull: true,
            type: Sequelize.DATE,      
            defaultValue: Sequelize.NOW
        }
    });

    return Products;
  }
  ,

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
