const db = require("../../../models");
const Products = db.Products;
const { date } = require('../../lib/utils');
const Intl = require("intl");

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
            where: {id}
        })
        return data;
    }
}