
const Member = './members';
const sequelize = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Instructor = sequelize.define('Instructors', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
        avatar_url: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        name: {
            allowNull: true,
            unique: true,
            type: DataTypes.TEXT,
        },
        birth: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        gender: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        services: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        created_at: {
            allowNull: true,
            type: DataTypes.DATE,        
            defaultValue: DataTypes.NOW
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },    
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {});
    
    
    return Instructor;
  }

