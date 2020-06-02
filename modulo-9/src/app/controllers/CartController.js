const Cart = require('../../lib/cart');

const Products = require('../models/Products');
const db = require("../../../models");
const FilesModel = db.Files;
const {formatPrice, date} = require('../../lib/utils');
const LoadProductService = require('../services/LoadProductService');

module.exports = {
    async index(req, res) {
        try {
            const product = await LoadProductService.load('product', { 
                where: {id: 1},
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
                        model : FilesModel 
                    }
                ]
            });
            let { cart } = req.session;
            console.log(product);
            cart = Cart.init(cart).addOne(product);
            console.log(cart);

            return res.render('cart/index', { cart });

        } catch (error) {
            console.error(error);
        }
        
    },
    
}