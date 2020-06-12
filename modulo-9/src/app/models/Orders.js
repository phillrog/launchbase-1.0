const db = require("../../../models");
const Orders = db.Orders;


const Base = require('./Base');

Base.init("Orders")

module.exports = {
    ...Base
}