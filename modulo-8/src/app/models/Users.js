const db = require("../../../models");
const Users = db.Users;
const Op = db.Sequelize.Op;
const {hash} = require('bcryptjs'); 

const Base = require('./Base');

Base.init("Users")

module.exports = {
    ...Base
}