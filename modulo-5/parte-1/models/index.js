'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.js');
const db = {};
console.log(env)
let sequelize;
if (env === 'development') {
  sequelize = new Sequelize(config);
} else {
  const confDev = {
    username: "postgres",
    password: "1234",
    database: "gymmanager",
    host: "localhost",
    dialect: 'postgres',
    port: 15432
  };

  sequelize = new Sequelize(confDev);
}
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;
