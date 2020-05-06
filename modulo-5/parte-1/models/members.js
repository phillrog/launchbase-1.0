'use strict';

module.exports =  (sequelize, DataTypes) => {
    const Member = sequelize.define('Members', 
    {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            type: DataTypes.INTEGER,
          },
          name: {
            allowNull: true,
            type: DataTypes.TEXT,
          },      
          avatar_url: {
            allowNull: true,
            type: DataTypes.TEXT,
          },
          email: {
            allowNull: true,
            type: DataTypes.TEXT,
          },
          gender: {
            allowNull: true,
            type: DataTypes.TEXT
          },
          birth: {
            allowNull: true,
            type: DataTypes.DATE
          },
          blood: {
            allowNull: true,
            type: DataTypes.TEXT
          },
          weight: {
            allowNull: true,
            type: DataTypes.INTEGER
          },
          height: {
            allowNull: true,
            type: DataTypes.INTEGER
          },
          created_at: {
            allowNull: true,
            type: DataTypes.DATE,        
            field: 'created_at'
          },
          createdAt: {
            type: DataTypes.DATE,      
            defaultValue: DataTypes.NOW
          },    
          updatedAt: {
              allowNull: true,
              type: DataTypes.DATE,      
              field: 'updated_at'
          },
          instrutor_id: {
            type: DataTypes.INTEGER, 
            foreignKey: true,
            references: {
                model: 'Instructors',
                key: 'id'
            }
          }
    }, {});

    return Member;
}