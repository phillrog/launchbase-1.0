const Products = require('../models/Products');
const db = require("../../../models");
const FilesModel = db.Files;
const {formatPrice, date} = require('../../lib/utils');
const LoadProductService = require('../services/LoadProductService');

module.exports = {
    async index(req, res) {
        const allProducts = await LoadProductService.load('products',{            
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
            ],
            order: ['updated_at']
        });

        return res.render("home/index.njk", {products: allProducts});
    },
    
}