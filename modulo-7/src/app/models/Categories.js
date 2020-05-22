const db = require("../../../models");
const Categories = db.Categories;

module.exports = {
    allAsync() {
        return Categories.findAll({
            order: [
                'name'
            ]
        });
    }
}