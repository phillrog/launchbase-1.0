'use strict';
const DataTypes = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        email: {
            allowNull: false,
            type: DataTypes.TEXT,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        cpf_cnpj: {
            allowNull: false,
            type: DataTypes.TEXT,
            unique: true
        },
        cep: {
            type: DataTypes.TEXT
        },
        address: {
            type: DataTypes.TEXT
        },
        created_at: {
            type: DataTypes.DATE,      
            defaultValue: DataTypes.NOW
        },    
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE,      
            defaultValue: DataTypes.NOW
        },
        reset_token : {
            allowNull: true,
            type: DataTypes.TEXT
        },
        reset_token_expires : {
            allowNull: true,
            type: DataTypes.TEXT
        }
    }, 
{
    tableName: 'Users',
    underscored: true
    });
    Users.associate = function(models) {

    };
    return Users;
};