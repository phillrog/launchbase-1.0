const db = require("../../../models");
const Categories = db.Categories;

module.exports = {
    async allAsync() {
        return await Categories.findAll({
            order: [
                'name'
            ]
        });
    }
}