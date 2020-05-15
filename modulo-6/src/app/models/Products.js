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
            price, 
            quantity,
            status
        } = data;
 
        return Products.create({
                category_id, 
                user_id: 1, 
                name, 
                description, 
                old_price, 
                price, 
                quantity,
                status
            });
    },
}