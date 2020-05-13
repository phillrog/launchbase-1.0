'use strict';
module.exports = (DataTypes, DataTypes) => {
  const Categories = DataTypes.define('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
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
    }
  }, {});
  Categories.associate = function(models) {
    // associations can be defined here
  };
  return Categories;
};