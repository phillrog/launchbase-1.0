const db = require("../../../models");
const Categories = db.Categories;


const Base = require('./Base');

Base.init("Categories")

module.exports = {
    ...Base
}