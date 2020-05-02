var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres', 'postgres', '1234', { 
    host: 'postgres',
    dialect: 'postgres'
});

var User = sequelize.define('instructor', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});