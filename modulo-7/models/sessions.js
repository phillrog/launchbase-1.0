'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    sid:{ 
      type:  DataTypes.STRING,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER
    },
    expires: {
      type: DataTypes.DATE
    },
    data: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'Session'
  });
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};