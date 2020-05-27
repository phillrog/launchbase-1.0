const db = require("../../../models");
const Products = db.Products;
const Files = db.Files;
const Categories = db.Categories
const { date } = require('../../lib/utils');
const Intl = require("intl");
const Op = db.Sequelize.Op;
const Base = require('./Base');

Base.init("Products");

module.exports = {
    ...Base,
    search(params) {
        const {filter, category } = params;

        let where = {};
        let whereSubquery = "";
        if (filter){
            where = {
                [Op.or]: { 
                    name: {[Op.like]: `%${filter}%`},
                    description: {[Op.like]: `%${filter}%`},                           
                }
            };

            whereSubquery = `"Products"."name" like '%${filter}%' OR 
            "Instructors"."description" like '%${filter}%' `;

            whereSubquery = "WHERE " + whereSubquery;
        }

        if (category) { 
            where["category_id"] = category;
            whereSubquery += ` AND "Products"."category_id" = ${category}`
        }

        return Products.findAll({    
            where,        
            attibutes: [
                "id",
                "category_id", 
                "user_id",
                "name", 
                "description", 
                "old_price",
                "price", 
                "quantity",
                "status",
                "updated_at",
                [db.sequelize.literal(`(SELECT COUNT(*) FROM "Products" ${whereSubquery} )`), 'total']
            ],
            include : [
                {
                    required: false,
                    model : Files 
                },
                {
                    attibutes: [
                        "id",
                        "name"
                    ],
                    required: false,
                    model : Categories,
                    as: 'Cat'
                }
            ],
            as: "Products",
            order: ['updated_at'],
            group: [
                db.sequelize.col('Products.id'), 
                db.sequelize.col('Files.id'),
                db.sequelize.col('Cat.id')],
            subQuery:false  
        });
    },
}