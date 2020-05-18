const db = require("../../../models");
const Products = db.Products;
const Files = db.Files;
const Categories = db.Categories
const { date } = require('../../lib/utils');
const Intl = require("intl");
const Op = db.Sequelize.Op;

module.exports = {
    create(data) {
            
        const {
            category_id, 
            user_id, 
            name, 
            description, 
            old_price, 
            
            quantity,
            status
        } = data;
        let price = data.price.replace(/\D/g, '');

        return Products.create({
                category_id, 
                user_id: user_id || 1, 
                name, 
                description, 
                old_price: old_price || price, 
                price, 
                quantity,
                status: status || 1 
            });
    },

    find(id) {
        const data = Products.findOne({            
            where: {id},
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
                "updated_at"
            ],
            include : [
                {
                    model : Files 
                }
            ]
        })

        return data;
    },
    update(data) {
            
        const {
            id,
            category_id, 
            user_id, 
            name, 
            description, 
            old_price, 
            price,
            quantity,
            status
        } = data;

        return Products.update({
                category_id, 
                user_id: user_id || 1, 
                name, 
                description, 
                old_price: old_price || price, 
                price, 
                quantity,
                status: status || 1 
            },{
            where: {
                id
            }});
    },
    delete(id) {
        return Products.destroy({
            where: {
                id
            }
        })
    },
    all(){
        return Products.findAll({            
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
                "updated_at"
            ],
            include : [
                {
                    model : Files 
                }
            ],
            order: ['updated_at']
        });
    },
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
    }
}